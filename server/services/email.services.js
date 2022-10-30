const { CourierClient } = require("@trycourier/courier");

exports.sendEmail = (title, body, email) => {
    const courier = CourierClient({ authorizationToken: process.env.AUTHORIZATION_TOKEN });
    return courier.send({
        message: {
            content: {
                title,
                body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis incidunt ipsum consequuntur nulla doloribus itaque maiores pariatur aut tempore magnam, mollitia perspiciatis optio explicabo eligendi repudiandae aperiam voluptate dolores corporis!",
            },

            to: {
                email,
            },
        },
    });
};
