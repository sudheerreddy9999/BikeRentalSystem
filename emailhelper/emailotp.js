const nodemailer = require('nodemailer');

async function sendOtpEmail(recipientEmail, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: 'bikerentalorder@gmail.com',
        pass: 'fflojvlnqtbhkque'
      }
    });

    const mailOptions = {
      from: 'bikerentalorder@gmail.com',
      to: recipientEmail,
      subject: 'Reset Password',
      html: `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bike Rental System</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Bike Rental System. Use the following OTP to Reset you password</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Bike Rental System</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        </div>
      </div>
    </div>
  `,


    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Example usage
const senderEmail = 'bikerentalorder@outlook.com';
const senderPassword = 'wtrtrrafjjyhxqzf';
const recipientEmail = 'reddyjlokesh@gmail.com';
const emailSubject = 'Subject of the email';
const emailBody = '';
 
module.exports= {
    sendOtpEmail
}
//sendEmail(senderEmail);