# Buttercup Credentials
> Encrypted credentials handler for Buttercup

[![Build Status](https://travis-ci.org/buttercup/credentials.svg?branch=master)](https://travis-ci.org/buttercup/credentials)

## About
This library provides the `Credentials` implementation used throughout the Buttercup suite. Credentials is a toolkit to handle account/login data in a secure manner by providing easy encryption/decryption of user details.

## Installation
Simply run `npm install @buttercup/credentials --save` to install.

## Usage
Credentials can be created in a variety of ways:

```javascript
const Credentials = require("@buttercup/credentials");

// ---

const c1 = new Credentials();
c1.username = "bob";
c1.password = "test123";

const c2 = new Credentials({ type: "example", username: "alice", password: "123test" });

const c3 = Credentials.fromPassword("amazingPass");

Credentials
    .fromSecureString(encryptedString, "myPass")
    .then(creds => { /* ... */ });
```

For more details on what methods are available, check the [API documentation](API.md).

**Note**: The `type` field is used internally by Buttercup, but is not required for external usage.
