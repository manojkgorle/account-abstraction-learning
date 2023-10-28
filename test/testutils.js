"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.userOpsWithoutAgg = exports.isDeployed = exports.deployEntryPoint = exports.checkForBannedOps = exports.objdump = exports.checkForGeth = exports.decodeRevertReason = exports.rethrow = exports.getAccountAddress = exports.getAggregatedAccountInitCode = exports.getAccountInitCode = exports.calcGasUsage = exports.callDataCost = exports.createAddress = exports.createAccountOwner = exports.getTokenBalance = exports.getBalance = exports.fund = exports.tonumber = exports.tostr = exports.FIVE_ETH = exports.TWO_ETH = exports.ONE_ETH = exports.HashZero = exports.AddressZero = void 0;
var hardhat_1 = require("hardhat");
var utils_1 = require("ethers/lib/utils");
var ethers_1 = require("ethers");
var typechain_1 = require("../typechain");
var chai_1 = require("chai");
var Create2Factory_1 = require("../src/Create2Factory");
var debugTx_1 = require("./debugTx");
exports.AddressZero = hardhat_1.ethers.constants.AddressZero;
exports.HashZero = hardhat_1.ethers.constants.HashZero;
exports.ONE_ETH = (0, utils_1.parseEther)('1');
exports.TWO_ETH = (0, utils_1.parseEther)('2');
exports.FIVE_ETH = (0, utils_1.parseEther)('5');
var tostr = function (x) { return x != null ? x.toString() : 'null'; };
exports.tostr = tostr;
function tonumber(x) {
    try {
        return parseFloat(x.toString());
    }
    catch (e) {
        console.log('=== failed to parseFloat:', x, (e).message);
        return NaN;
    }
}
exports.tonumber = tonumber;
// just throw 1eth from account[0] to the given address (or contract instance)
function fund(contractOrAddress, amountEth) {
    if (amountEth === void 0) { amountEth = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof contractOrAddress === 'string') {
                        address = contractOrAddress;
                    }
                    else {
                        address = contractOrAddress.address;
                    }
                    return [4 /*yield*/, hardhat_1.ethers.provider.getSigner().sendTransaction({ to: address, value: (0, utils_1.parseEther)(amountEth) })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fund = fund;
function getBalance(address) {
    return __awaiter(this, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.provider.getBalance(address)];
                case 1:
                    balance = _a.sent();
                    return [2 /*return*/, parseInt(balance.toString())];
            }
        });
    });
}
exports.getBalance = getBalance;
function getTokenBalance(token, address) {
    return __awaiter(this, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, token.balanceOf(address)];
                case 1:
                    balance = _a.sent();
                    return [2 /*return*/, parseInt(balance.toString())];
            }
        });
    });
}
exports.getTokenBalance = getTokenBalance;
var counter = 0;
// create non-random account, so gas calculations are deterministic
function createAccountOwner() {
    var privateKey = (0, utils_1.keccak256)(Buffer.from((0, utils_1.arrayify)(ethers_1.BigNumber.from(++counter))));
    return new hardhat_1.ethers.Wallet(privateKey, hardhat_1.ethers.provider);
    // return new ethers.Wallet('0x'.padEnd(66, privkeyBase), ethers.provider);
}
exports.createAccountOwner = createAccountOwner;
function createAddress() {
    return createAccountOwner().address;
}
exports.createAddress = createAddress;
function callDataCost(data) {
    return hardhat_1.ethers.utils.arrayify(data)
        .map(function (x) { return x === 0 ? 4 : 16; })
        .reduce(function (sum, x) { return sum + x; });
}
exports.callDataCost = callDataCost;
function calcGasUsage(rcpt, entryPoint, beneficiaryAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var actualGas, logs, _a, actualGasCost, actualGasUsed, tx, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, rcpt.gasUsed];
                case 1:
                    actualGas = _c.sent();
                    return [4 /*yield*/, entryPoint.queryFilter(entryPoint.filters.UserOperationEvent(), rcpt.blockHash)];
                case 2:
                    logs = _c.sent();
                    _a = logs[0].args, actualGasCost = _a.actualGasCost, actualGasUsed = _a.actualGasUsed;
                    console.log('\t== actual gasUsed (from tx receipt)=', actualGas.toString());
                    console.log('\t== calculated gasUsed (paid to beneficiary)=', actualGasUsed);
                    return [4 /*yield*/, hardhat_1.ethers.provider.getTransaction(rcpt.transactionHash)];
                case 3:
                    tx = _c.sent();
                    console.log('\t== gasDiff', actualGas.toNumber() - actualGasUsed.toNumber() - callDataCost(tx.data));
                    if (!(beneficiaryAddress != null)) return [3 /*break*/, 5];
                    _b = chai_1.expect;
                    return [4 /*yield*/, getBalance(beneficiaryAddress)];
                case 4:
                    _b.apply(void 0, [_c.sent()]).to.eq(actualGasCost.toNumber());
                    _c.label = 5;
                case 5: return [2 /*return*/, { actualGasCost: actualGasCost }];
            }
        });
    });
}
exports.calcGasUsage = calcGasUsage;
// helper function to create the initCode to deploy the account, using our account factory.
function getAccountInitCode(owner, factory, salt) {
    if (salt === void 0) { salt = 0; }
    return (0, utils_1.hexConcat)([
        factory.address,
        factory.interface.encodeFunctionData('createAccount', [owner, salt])
    ]);
}
exports.getAccountInitCode = getAccountInitCode;
function getAggregatedAccountInitCode(entryPoint, factory, salt) {
    if (salt === void 0) { salt = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var owner;
        return __generator(this, function (_a) {
            owner = exports.AddressZero;
            return [2 /*return*/, (0, utils_1.hexConcat)([
                    factory.address,
                    factory.interface.encodeFunctionData('createAccount', [owner, salt])
                ])];
        });
    });
}
exports.getAggregatedAccountInitCode = getAggregatedAccountInitCode;
// given the parameters as AccountDeployer, return the resulting "counterfactual address" that it would create.
function getAccountAddress(owner, factory, salt) {
    if (salt === void 0) { salt = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factory.getAddress(owner, salt)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAccountAddress = getAccountAddress;
var panicCodes = {
    // from https://docs.soliditylang.org/en/v0.8.0/control-structures.html
    0x01: 'assert(false)',
    0x11: 'arithmetic overflow/underflow',
    0x12: 'divide by zero',
    0x21: 'invalid enum value',
    0x22: 'storage byte array that is incorrectly encoded',
    0x31: '.pop() on an empty array.',
    0x32: 'array sout-of-bounds or negative index',
    0x41: 'memory overflow',
    0x51: 'zero-initialized variable of internal function type'
};
// rethrow "cleaned up" exception.
// - stack trace goes back to method (or catch) line, not inner provider
// - attempt to parse revert data (needed for geth)
// use with ".catch(rethrow())", so that current source file/line is meaningful.
function rethrow() {
    var callerStack = new Error().stack.replace(/Error.*\n.*at.*\n/, '').replace(/.*at.* \(internal[\s\S]*/, '');
    if (arguments[0] != null) {
        throw new Error('must use .catch(rethrow()), and NOT .catch(rethrow)');
    }
    return function (e) {
        var _a;
        var solstack = e.stack.match(/((?:.* at .*\.sol.*\n)+)/);
        var stack = (solstack != null ? solstack[1] : '') + callerStack;
        // const regex = new RegExp('error=.*"data":"(.*?)"').compile()
        var found = /error=.*?"data":"(.*?)"/.exec(e.message);
        var message;
        if (found != null) {
            var data = found[1];
            message = (_a = decodeRevertReason(data)) !== null && _a !== void 0 ? _a : e.message + ' - ' + data.slice(0, 100);
        }
        else {
            message = e.message;
        }
        var err = new Error(message);
        err.stack = 'Error: ' + message + '\n' + stack;
        throw err;
    };
}
exports.rethrow = rethrow;
function decodeRevertReason(data, nullIfNoMatch) {
    var _a;
    if (nullIfNoMatch === void 0) { nullIfNoMatch = true; }
    var methodSig = data.slice(0, 10);
    var dataParams = '0x' + data.slice(10);
    if (methodSig === '0x08c379a0') {
        var err = hardhat_1.ethers.utils.defaultAbiCoder.decode(['string'], dataParams)[0];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return "Error(".concat(err, ")");
    }
    else if (methodSig === '0x00fa072b') {
        var _b = hardhat_1.ethers.utils.defaultAbiCoder.decode(['uint256', 'address', 'string'], dataParams), opindex = _b[0], paymaster = _b[1], msg = _b[2];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return "FailedOp(".concat(opindex, ", ").concat(paymaster !== exports.AddressZero ? paymaster : 'none', ", ").concat(msg, ")");
    }
    else if (methodSig === '0x4e487b71') {
        var code = hardhat_1.ethers.utils.defaultAbiCoder.decode(['uint256'], dataParams)[0];
        return "Panic(".concat((_a = panicCodes[code]) !== null && _a !== void 0 ? _a : code, " + ')");
    }
    if (!nullIfNoMatch) {
        return data;
    }
    return null;
}
exports.decodeRevertReason = decodeRevertReason;
var currentNode = '';
// basic geth support
// - by default, has a single account. our code needs more.
function checkForGeth() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, i, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = hardhat_1.ethers.provider._hardhatProvider;
                    return [4 /*yield*/, provider.request({ method: 'web3_clientVersion' })];
                case 1:
                    currentNode = _a.sent();
                    console.log('node version:', currentNode);
                    if (!(currentNode.match(/geth/i) != null)) return [3 /*break*/, 7];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < 2)) return [3 /*break*/, 7];
                    return [4 /*yield*/, provider.request({ method: 'personal_newAccount', params: ['pass'] }).catch(rethrow)];
                case 3:
                    acc = _a.sent();
                    return [4 /*yield*/, provider.request({ method: 'personal_unlockAccount', params: [acc, 'pass'] }).catch(rethrow)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, fund(acc, '10')];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.checkForGeth = checkForGeth;
// remove "array" members, convert values to strings.
// so Result obj like
// { '0': "a", '1': 20, first: "a", second: 20 }
// becomes:
// { first: "a", second: "20" }
function objdump(obj) {
    return Object.keys(obj)
        .filter(function (key) { return key.match(/^[\d_]/) == null; })
        .reduce(function (set, key) {
        var _a;
        return (__assign(__assign({}, set), (_a = {}, _a[key] = decodeRevertReason(obj[key].toString(), false), _a)));
    }, {});
}
exports.objdump = objdump;
function checkForBannedOps(txHash, checkPaymaster) {
    return __awaiter(this, void 0, void 0, function () {
        var tx, logs, blockHash, validateAccountOps, validatePaymasterOps, ops, paymasterOps, bannedOpCodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, debugTx_1.debugTransaction)(txHash)];
                case 1:
                    tx = _a.sent();
                    logs = tx.structLogs;
                    blockHash = logs.map(function (op, index) { return ({ op: op.op, index: index }); }).filter(function (op) { return op.op === 'NUMBER'; });
                    (0, chai_1.expect)(blockHash.length).to.equal(2, 'expected exactly 2 call to NUMBER (Just before and after validateUserOperation)');
                    validateAccountOps = logs.slice(0, blockHash[0].index - 1);
                    validatePaymasterOps = logs.slice(blockHash[0].index + 1);
                    ops = validateAccountOps.filter(function (log) { return log.depth > 1; }).map(function (log) { return log.op; });
                    paymasterOps = validatePaymasterOps.filter(function (log) { return log.depth > 1; }).map(function (log) { return log.op; });
                    (0, chai_1.expect)(ops).to.include('POP', 'not a valid ops list: ' + JSON.stringify(ops)); // sanity
                    bannedOpCodes = new Set(['GAS', 'BASEFEE', 'GASPRICE', 'NUMBER']);
                    (0, chai_1.expect)(ops.filter(function (op, index) {
                        // don't ban "GAS" op followed by "*CALL"
                        if (op === 'GAS' && (ops[index + 1].match(/CALL/) != null)) {
                            return false;
                        }
                        return bannedOpCodes.has(op);
                    })).to.eql([]);
                    if (checkPaymaster) {
                        (0, chai_1.expect)(paymasterOps).to.include('POP', 'not a valid ops list: ' + JSON.stringify(paymasterOps)); // sanity
                        (0, chai_1.expect)(paymasterOps).to.not.include('BASEFEE');
                        (0, chai_1.expect)(paymasterOps).to.not.include('GASPRICE');
                        (0, chai_1.expect)(paymasterOps).to.not.include('NUMBER');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkForBannedOps = checkForBannedOps;
function deployEntryPoint(provider) {
    if (provider === void 0) { provider = hardhat_1.ethers.provider; }
    return __awaiter(this, void 0, void 0, function () {
        var create2factory, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    create2factory = new Create2Factory_1.Create2Factory(provider);
                    return [4 /*yield*/, create2factory.deploy(typechain_1.EntryPoint__factory.bytecode, 0, process.env.COVERAGE != null ? 20e6 : 8e6)];
                case 1:
                    addr = _a.sent();
                    return [2 /*return*/, typechain_1.EntryPoint__factory.connect(addr, provider.getSigner())];
            }
        });
    });
}
exports.deployEntryPoint = deployEntryPoint;
function isDeployed(addr) {
    return __awaiter(this, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.provider.getCode(addr)];
                case 1:
                    code = _a.sent();
                    return [2 /*return*/, code.length > 2];
            }
        });
    });
}
exports.isDeployed = isDeployed;
// internal helper function: create a UserOpsPerAggregator structure, with no aggregator or signature
function userOpsWithoutAgg(userOps) {
    return [{
            userOps: userOps,
            aggregator: exports.AddressZero,
            signature: '0x'
        }];
}
exports.userOpsWithoutAgg = userOpsWithoutAgg;
// Deploys an implementation and a proxy pointing to this implementation
function createAccount(ethersSigner, accountOwner, entryPoint, _factory) {
    return __awaiter(this, void 0, void 0, function () {
        var accountFactory, _a, implementation, accountAddress, proxy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(_factory !== null && _factory !== void 0)) return [3 /*break*/, 1];
                    _a = _factory;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, new typechain_1.SimpleAccountFactory__factory(ethersSigner).deploy(entryPoint)];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    accountFactory = _a;
                    return [4 /*yield*/, accountFactory.accountImplementation()];
                case 4:
                    implementation = _b.sent();
                    return [4 /*yield*/, accountFactory.createAccount(accountOwner, 0)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, accountFactory.getAddress(accountOwner, 0)];
                case 6:
                    accountAddress = _b.sent();
                    proxy = typechain_1.SimpleAccount__factory.connect(accountAddress, ethersSigner);
                    return [2 /*return*/, {
                            implementation: implementation,
                            accountFactory: accountFactory,
                            proxy: proxy
                        }];
            }
        });
    });
}
exports.createAccount = createAccount;
