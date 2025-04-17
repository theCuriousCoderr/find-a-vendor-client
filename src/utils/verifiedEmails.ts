function saveEmailVerifyStatus(email: string, verifyStatus: string) {
  const verifiedEmails = localStorage.getItem("verifiedEmails");
  const parsedVerifiedEmails = JSON.parse(verifiedEmails ?? `{}`) as Record<
    string,
    string
  >;
  const newVerifiedEmails = { ...parsedVerifiedEmails, [email]: verifyStatus };
  localStorage.setItem("verifiedEmails", JSON.stringify(newVerifiedEmails));
}

function getEmailVerifyStatus(email: string) {
  const verifiedEmails = localStorage.getItem("verifiedEmails");
  const parsedVerifiedEmails = JSON.parse(verifiedEmails ?? `{}`) as Record<
    string,
    string
  >;
  const emailStatus = parsedVerifiedEmails[email] ?? null;
  return emailStatus;
}

const verifiedEmail = {
  saveStatus: (email: string, verifyStatus: string) =>
    saveEmailVerifyStatus(email, verifyStatus),
  getStatus: (email: string) => getEmailVerifyStatus(email),
};

export default verifiedEmail;
