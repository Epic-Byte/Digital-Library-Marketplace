// //
// // this script executes when you run 'yarn test'

const hre = require("hardhat");

const { ethers } = hre;
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Library 🤖", function () {
  let library;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  const ipfsLink =
    "https://ipfs.io/ipfs/QmQXVwPnww7Ua1aQt2pLdcdDt2dZKtQqTYHR4EX4U7ErJE";

  beforeEach(async function () {
    // create the smart contract object to test from
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    const Library = await ethers.getContractFactory("Library");
    library = await Library.deploy();
  });

  describe("Upload", function () {
    it("private upload", async function () {
      await library.PrivateUpload("Sam Book", ipfsLink, "My Personal Photo");
      const ownerPrivateLib = await library.viewPrivateLib();
      expect(ownerPrivateLib[0].Link).to.equal(ipfsLink);
    });

    it("public upload", async function () {
      await library.publicUpload(
        "Sam Public Book",
        ipfsLink,
        "My Public Personal Photo"
      );
      const publicLib = await library.publicLib(0);
      expect(publicLib.name).to.equal("Sam Public Book");
    });
  });

  describe("Share", function () {
    it("share files to multiple addresses", async function () {
      // upload private file
      await library.PrivateUpload("Sam Book", ipfsLink, "My Personal Photo");

      const addressList = [addr2.address, addr3.address];
      const shared = await library.share(addressList, 1);

      expect(shared.from).to.equal(owner.address);
    });

    it("Revert for address zero", async function () {
      // upload private file
      await library.PrivateUpload("Sam Book", ipfsLink, "My Personal Photo");

      const addressList = ["0x", "0x"];
      await expect(library.share(addressList, 1)).to.be.reverted;
    });
  });

  describe("View Library", function () {
    it("private view", async function () {
      await library.PrivateUpload("Sam Book", ipfsLink, "My Personal Photo");
      const ownerPrivateLib = await library.viewPrivateLib();
      expect(ownerPrivateLib[0].Link).to.equal(ipfsLink);
    });
  });

});
