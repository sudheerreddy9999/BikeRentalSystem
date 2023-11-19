const nodemailer = require('nodemailer');

async function sendEmailforapproval(recipientEmail,orderid) {
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
      subject: 'Bike Booking Approval',
      html: `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bike Rental System</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Bike Rental System.</p>
        <p>your order id ${orderid}</p>
        <p> your order is approved please collect the bike and enjoy your ride </P>
        <p style="font-size:0.9em;">Regards,<br />Bike Rental System</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        </div>
      </div>
    </div>
  `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

 
module.exports= {
    sendEmailforapproval
}
//sendEmail(senderEmail);