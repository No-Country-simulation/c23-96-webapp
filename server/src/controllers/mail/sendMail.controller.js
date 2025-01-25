const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async sendEmail(to, subject, text) {
    try {
      const response = await resend.emails.send({
        from: process.env.EMAIL,
        to,
        subject,
        text,
      });
      console.log("Correo enviado:", response);
      return response;
    } catch (error) {
      console.error("Error enviando correo:", error);
      throw error;
    }
  },
};
