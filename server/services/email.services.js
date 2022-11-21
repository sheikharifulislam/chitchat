const { CourierClient } = require("@trycourier/courier");

exports.sendEmail = (title, body, email) => {
    const courier = CourierClient({ authorizationToken: process.env.EMAIL_AUTHORIZATION_TOKEN });
    return courier.send({
        message: {
            content: {
                title,
                body: `Please Click The Link ${process.env.CLIENT_BASE_URL}verify/?token=${body} `,
            },

            to: {
                email,
            },
        },
    });
};
