const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("simpleStorage", function () {
    let simpleStorageFactory, simpleStorage;

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async function () {
        const expectedValue = "0";
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("Should update the favorite number with store", async function () {
        const expectedValue = "7";
        await simpleStorage.store("7");
        const currentValue = await simpleStorage.retrieve();
        expect(currentValue.toString()).to.equal(expectedValue);
    });
});
