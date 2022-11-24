const forgotPasswordTemplate = (token) => {
    console.log(token);
    return `
    <!DOCTYPE html>
    <html>
       <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Email Verify</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"></head>
       <body>
            <h1>Forgot Password Email</h1>
            <button><a href=${process.env.CLIENT_BASE_URL}/forgot-password/${token}>Click</a></button>
       </body>
    </html>
        
    
    `;
};

module.exports = forgotPasswordTemplate;
