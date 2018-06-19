const { createSession } = require("iocane");
const { getSignature } = require("@buttercup/signing");

/**
 * The credentials type key
 * @private
 * @type {String}
 */
const CREDENTIALS_ATTR = "@@bcup-role";

/**
 * The signature of encrypted credentials
 * @private
 * @type {string}
 */
const SIGNING_KEY = getSignature() + "creds.v2.";

/**
 * The old signing signature
 * @private
 * @type {string}
 */
const SIGNING_KEY_OLD = getSignature() + "creds.";

/**
 * Sign encrypted content
 * @see SIGNING_KEY
 * @private
 * @param {String} content The encrypted text
 * @returns {String} The signed key
 */
function signEncryptedContent(content) {
    return `${SIGNING_KEY}${content}`;
}

/**
 * Remove the signature from encrypted content
 * @private
 * @param {String} content The encrypted text
 * @returns {String} The unsigned encrypted key
 * @throws {Error} Throws if no SIGNING_KEY is detected
 * @see SIGNING_KEY
 */
function unsignEncryptedContent(content) {
    const newIndex = content.indexOf(SIGNING_KEY);
    const oldIndex = content.indexOf(SIGNING_KEY_OLD);
    if (newIndex === -1 && oldIndex === -1) {
        throw new Error("Invalid credentials content (unknown signature)");
    }
    return newIndex >= 0
        ? content.substr(SIGNING_KEY.length)
        : content.substr(SIGNING_KEY_OLD.length);
}

/**
 * Credentials instance
 */
class Credentials {
    /**
     * Create a new instance from an insecure string
     * @param {String} content The insecure string representation
     * @memberof Credentials
     * @returns {Credentials} A new instance
     * @static
     */
    static fromInsecureString(content) {
        const data = JSON.parse(content);
        return new Credentials(data);
    }

    /**
     * Create a new instance from a password
     * @param {String} password The password
     * @returns {Credentials} A new instance
     * @memberof Credentials
     * @static
     */
    static fromPassword(password) {
        return new Credentials({ type: "password", password });
    }

    /**
     * Create a new instance from a secure string
     * @param {String} content Encrypted content
     * @param {String} password The password for decryption
     * @returns {Promise.<Credentials>} A promise that resolves with the new instance
     * @static
     * @memberof Credentials
     */
    static fromSecureString(content, password) {
        return createSession()
            .decrypt(unsignEncryptedContent(content), password)
            .then(decryptedContent => JSON.parse(decryptedContent))
            .then(
                credentialsData =>
                    Array.isArray(credentialsData)
                        ? new Credentials(
                              Object.assign({}, credentialsData[1], { type: credentialsData[0] })
                          )
                        : new Credentials(credentialsData)
            );
    }

    /**
     * Check if an item is a Credentials instance
     * @param {Object} target The target to check
     * @returns {Boolean} True if a credentials instance
     * @memberof Credentials
     * @static
     */
    static isCredentials(target) {
        return (
            typeof target === "object" &&
            target !== null &&
            target[CREDENTIALS_ATTR] === "credentials"
        );
    }

    /**
     * Check if a string is a secure string
     * @param {String} str The string to check
     * @returns {Boolean} True if the string is a secure string
     * @static
     * @memberof Credentials
     */
    static isSecureString(str) {
        try {
            unsignEncryptedContent(str);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Constructor for the Credentials class
     * @param {String|Object} typeOrData The type (string), or an object representing
     *  the Credentials data
     */
    constructor(typeOrData) {
        this[CREDENTIALS_ATTR] = "credentials";
        this.data =
            typeof typeOrData === "string"
                ? { type: typeOrData }
                : Object.assign(
                      {
                          type: ""
                      },
                      typeOrData
                  );
    }

    /**
     * The password
     * @type {String|undefined}
     * @memberof Credentials
     */
    get password() {
        return this.data.password;
    }

    /**
     * The credentials type
     * @type {String}
     * @memberof Credentials
     * @readonly
     */
    get type() {
        return this.data.type;
    }

    /**
     * The username
     * @type {String|undefined}
     * @memberof Credentials
     */
    get username() {
        return this.data.username;
    }

    set password(newPassword) {
        this.data.password = newPassword;
    }

    set username(newUsername) {
        this.data.username = newUsername;
    }

    /**
     * Get a value from the credentials
     * @param {String} property The property to fetch
     * @returns {*|undefined} Returns the value if found, or undefined
     * @memberof Credentials
     */
    getValue(property) {
        return this.data[property];
    }

    /**
     * Get a value, or fail if it doesn't exist or isn't set
     * @throws {Error} Throws if the value is undefined
     * @param {String} property The property to fetch
     * @returns {*} The value (not undefined)
     * @memberof Credentials
     * @instance
     */
    getValueOrFail(property) {
        const value = this.getValue(property);
        if (typeof value === "undefined") {
            throw new Error(`Failed retrieving required credentials property: ${property}`);
        }
        return value;
    }

    /**
     * Set a value for a property
     * @param {String} property The property to set
     * @param {*} value The value to set for the property
     * @returns {Credentials} Returns self, for chaining
     * @memberof Credentials
     */
    setValue(property, value) {
        this.data[property] = value;
        return this;
    }

    /**
     * Convert the credentials to an insecure string
     * @returns {String} The string-encoded credentials
     * @memberof Credentials
     */
    toInsecureString() {
        return JSON.stringify(this.data);
    }

    /**
     * Convert the credentials to an encrypted string, for storage
     * @param {string} masterPassword The password for encrypting
     * @returns {Promise} A promise that resolves with the encrypted credentials
     * @see signEncryptedContent
     * @throws {Error} Rejects when masterPassword is not a string
     * @memberof Credentials
     */
    toSecureString(masterPassword) {
        if (typeof masterPassword !== "string") {
            return Promise.reject(new Error("Master password must be a string"));
        }
        return createSession()
            .encrypt(this.toInsecureString(), masterPassword)
            .then(signEncryptedContent);
    }
}

module.exports = Credentials;
