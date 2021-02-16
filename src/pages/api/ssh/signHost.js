const sshpk = require("sshpk");
const auth = require("../../../api/lib/auth");

export default async function signHost(req, res) {
  let privKey = sshpk.parsePrivateKey(process.env.SSH_PRIVKEY);
  const caCert = sshpk.parseCertificate(process.env.CACERT, "pem");
  if (!auth.authToken(req.headers["api_key"])) {
    return res.status(401).send("Incorrect Auth");
  }
  const hostKey = sshpk.parseKey(req.body.pubkey);
  const hostName = req.body.hostname;
  const hostCert = sshpk.createCertificate(
    sshpk.identityForHost(`${hostName}.local`),
    hostKey,
    caCert.subjects[0],
    privKey
  );
  hostCert.signWith(privKey);
  return res.end(JSON.stringify({ crt: hostCert.toString("openssh") }));
}
