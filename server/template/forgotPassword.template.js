const forgotPasswordTemplate = (token) => {
    return `
        <h1>Forgot Password Email</h1>
        <button><a href=${process.env.CLIENT_BASE_URL}forgot-password/${token}>Click</a></button>
    
    `;
};

module.exports = forgotPasswordTemplate;
