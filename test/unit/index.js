const { expect } = require("chai");
const sinon = require("sinon");
const iocane = require("iocane");

Object.assign(global, {
    expect,
    sinon
});

iocane.config.setDerivedKeyIterationRange(10, 20);
