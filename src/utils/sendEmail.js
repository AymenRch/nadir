import emailjs from "@emailjs/browser";

export const sendCertificateEmail = (data) => {

  return emailjs.send(
    "service_q97w0fu",
    "template_c9qj4w4",
    {
      to_email: data.email,
      to_name: data.name,
      name: data.name,
      profession: data.profession,
      workTitle: data.workTitle,
      date: new Date().toLocaleDateString(),
    },
    "6fGDPMzvOOsPTNwdb"
  );
};