const { expect } = require("chai");
const sinon = require("sinon");
const { configure } = require("iocane");

Object.assign(global, {
    expect,
    sinon
});

configure().setDerivationRounds(10);
