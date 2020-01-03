const { getSharedAppEnv } = require("@buttercup/app-env");

function getDecryptFn() {
    return getSharedAppEnv().getProperty("crypto/v1/decryptText");
}

function getEncryptFn() {
    return getSharedAppEnv().getProperty("crypto/v1/encryptText");
}

module.exports = {
    getDecryptFn,
    getEncryptFn
};
