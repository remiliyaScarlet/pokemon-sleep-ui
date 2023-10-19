import {createTransport} from 'nodemailer';


type SendEmailOpts = {
  server: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
};

export const sendEmail = async ({server, ...opts}: SendEmailOpts) => {
  const transporter = createTransport(server);

  await transporter.sendMail(opts);
};
