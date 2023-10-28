"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../test/aa.init");
var hardhat_1 = require("hardhat");
var typechain_1 = require("../typechain");
var testutils_1 = require("../test/testutils");
var UserOp_1 = require("../test/UserOp");
// fetch true or false from backend along with the private key, if false then create Account, if true then use the already deployed address
var account1_json_1 = require("./StorageJsonDecrypted/account1.json");
var factory_json_1 = require("./UsableJson/factory.json");
// the above import is used to get testdata and run process, till the api is ready
//@todo prepare and integrate api
var sender = account1_json_1.testExternalUser.publicKey; // user 
var signingKey = account1_json_1.testExternalUser.privateKey; //user privateKey
var salt = factory_json_1.buildBearFactory.salt;
var initCode;
var isIntiated = account1_json_1.testExternalUser.isIntiated;
var ethersSigner = hardhat_1.ethers.provider.getSigner(); // our address
var entryPointAddress = factory_json_1.buildBearFactory.entrypoint;
// dont know if simpleAccountFactory can sign or not
var entryPointContract = typechain_1.EntryPoint__factory.connect(entryPointAddress, ethersSigner);
var simpleAccountFactory = typechain_1.SimpleAccountFactory__factory.connect(entryPointAddress, ethersSigner);
function getInitCode() {
    if (isIntiated) {
        return "0x";
    }
    else {
        (0, testutils_1.getAccountInitCode)(sender, simpleAccountFactory, salt);
    }
}
// let [userInitCode,userEOA] = getInitCode()
var userOp = {};
var defaultOp = (0, UserOp_1.fillUserOpDefaults)(userOp, UserOp_1.DefaultsForUserOp);
var filledOp = (0, UserOp_1.fillAndSign)({
    initCode: getInitCode(),
    verificationGasLimit: 2e6
}, ethersSigner, entryPointContract);
//@todo populate transaction is a ethers method to prepare a transaction but not sending the transaction, we can obtain the calldata from the populate transaction method
console.log(filledOp);
