const { jwtDecode } = require("jwt-decode")

const jwtDecoder = (token) => {
    const result = jwtDecode(token);
    return result
}

module.exports = { jwtDecoder }


