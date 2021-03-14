const sshpk = require("sshpk");

export default async function renewClient(req, res) {
  let pubKey = sshpk.parseKey(process.env.SSH_PUBKEY);
  let privKey = sshpk.parsePrivateKey(process.env.SSH_PRIVKEY);

  const certificate = sshpk.parseCertificate(req.body.crt, "openssh");
  if (!certificate.isSignedByKey(pubKey, privKey)) {
    return res.status(401).send("Incorrect Signing");
  }
  const options = { lifetime: 604800 };
  const newCrt = sshpk.createCertificate(
    certificate.subjects,
    certificate.subjectKey,
    certificate.issuer,
    privKey,
    options
  );
  newCrt.signatures.openssh.exts = certificate.getExtensions();
  newCrt.signWith(privKey);
  return res.end(JSON.stringify({ crt: newCrt.toString("openssh") }));
}
