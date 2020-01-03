const { expect } = require("chai");
const sinon = require("sinon");
require("@buttercup/app-env/native");
const { getSharedAppEnv } = require("@buttercup/app-env");

Object.assign(global, {
    expect,
    sinon
});

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);
