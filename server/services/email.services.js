const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
        user: "sheikharifulislam700@gmail.com",
        pass: "riskmqkycuudipxm",
    },
});

exports.sendEmail = (to, subject, body) => {
    try {
        const mailOptions = {
            from: "sheikharifulislam700@gmail.com",
            to,
            subject,
            html: body,
        };

        return transport.sendMail(mailOptions);
    } catch (error) {
        console.log(error.message);
    }
};
