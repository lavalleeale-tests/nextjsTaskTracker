const forge = require("node-forge");
const auth = require("../../../api/lib/auth");
const { pki } = forge;

export default async function sign(req, res) {
  if (!auth.authToken(req.headers["api_key"])) {
    return res.status(401).send("Incorrect Auth");
  }
  const caCert = pki.certificateFromPem(process.env.CACERT);
  const key = pki.privateKeyFromPem(process.env.WEB_PRIVKEY);
  const keys = pki.rsa.generateKeyPair(2048);
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
  cert.setIssuer(caCert.subject.attributes);
  cert.serialNumber = (new Date().getTime() / 1000).toString();
  const attrs = [
    {
      name: "commonName",
      value: `${req.body.hostname}.local`,
    },
    {
      name: "countryName",
      value: "US",
    },
    {
      shortName: "ST",
      value: "Washington",
    },
    {
      name: "localityName",
      value: "Olympia",
    },
    {
      name: "organizationName",
      value: "Alex Testing Inc",
    },
    {
      shortName: "OU",
      value: "Alex CA",
    },
  ];
  cert.setSubject(attrs);
  cert.sign(key, forge.md.sha256.create());
  const pem = pki.certificateToPem(cert);
  return res.end(
    JSON.stringify({ crt: pem, key: pki.privateKeyToPem(keys.privateKey) })
  );
}
