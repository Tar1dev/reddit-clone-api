const jwt = require("jsonwebtoken");

exports.newJWT = (claims) => {
    const token = jwt.sign({
            ...claims
        },
        Bun.env.JWT_SECRET,
        {
            expiresIn: Bun.env.JWT_EXPIRE,
        });
    return token;
}