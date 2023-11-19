const nodemailer = require('nodemailer');

async function sendEmail(recipientEmail,bike_number,user_name,price,bookingdate) {
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
      subject: 'Bike Booking confirmation',
      html: `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bike Rental System</a>
        </div>
        <p style="font-size:1.1em">Hi,${user_name}</p>
        <p>Thank you for choosing Bike Rental System.</p>
        <p>your booked bike number ${bike_number}</p>
        <p>booking date: ${bookingdate}</p>
        <p> rental price for booked bike: ${price}</P>
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
    sendEmail
}
//sendEmail(senderEmail);