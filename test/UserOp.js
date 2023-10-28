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
exports.simulateHandleOp = exports.simulateValidation = exports.fillAndSign = exports.fillUserOp = exports.fillUserOpDefaults = exports.signUserOp = exports.DefaultsForUserOp = exports.getUserOpHash = exports.packUserOp1 = exports.packUserOp = void 0;
var utils_1 = require("ethers/lib/utils");
var ethers_1 = require("ethers");
var testutils_1 = require("./testutils");
var ethereumjs_util_1 = require("ethereumjs-util");
var typechain_1 = require("../typechain");
var Create2Factory_1 = require("../src/Create2Factory");
var EntryPointSimulations_json_1 = require("../artifacts/contracts/core/EntryPointSimulations.sol/EntryPointSimulations.json");
var hardhat_1 = require("hardhat");
function packUserOp(op, forSignature) {
    if (forSignature === void 0) { forSignature = true; }
    if (forSignature) {
        return utils_1.defaultAbiCoder.encode(['address', 'uint256', 'bytes32', 'bytes32',
            'uint256', 'uint256', 'uint256', 'uint256', 'uint256',
            'bytes32'], [op.sender, op.nonce, (0, utils_1.keccak256)(op.initCode), (0, utils_1.keccak256)(op.callData),
            op.callGasLimit, op.verificationGasLimit, op.preVerificationGas, op.maxFeePerGas, op.maxPriorityFeePerGas,
            (0, utils_1.keccak256)(op.paymasterAndData)]);
    }
    else {
        // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
        return utils_1.defaultAbiCoder.encode(['address', 'uint256', 'bytes', 'bytes',
            'uint256', 'uint256', 'uint256', 'uint256', 'uint256',
            'bytes', 'bytes'], [op.sender, op.nonce, op.initCode, op.callData,
            op.callGasLimit, op.verificationGasLimit, op.preVerificationGas, op.maxFeePerGas, op.maxPriorityFeePerGas,
            op.paymasterAndData, op.signature]);
    }
}
exports.packUserOp = packUserOp;
function packUserOp1(op) {
    return utils_1.defaultAbiCoder.encode([
        'address',
        'uint256',
        'bytes32',
        'bytes32',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'bytes32' // paymasterAndData
    ], [
        op.sender,
        op.nonce,
        (0, utils_1.keccak256)(op.initCode),
        (0, utils_1.keccak256)(op.callData),
        op.callGasLimit,
        op.verificationGasLimit,
        op.preVerificationGas,
        op.maxFeePerGas,
        op.maxPriorityFeePerGas,
        (0, utils_1.keccak256)(op.paymasterAndData)
    ]);
}
exports.packUserOp1 = packUserOp1;
function getUserOpHash(op, entryPoint, chainId) {
    var userOpHash = (0, utils_1.keccak256)(packUserOp(op, true));
    var enc = utils_1.defaultAbiCoder.encode(['bytes32', 'address', 'uint256'], [userOpHash, entryPoint, chainId]);
    return (0, utils_1.keccak256)(enc);
}
exports.getUserOpHash = getUserOpHash;
exports.DefaultsForUserOp = {
    sender: testutils_1.AddressZero,
    nonce: 0,
    initCode: '0x',
    callData: '0x',
    callGasLimit: 0,
    verificationGasLimit: 150000,
    preVerificationGas: 21000,
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 1e9,
    paymasterAndData: '0x',
    signature: '0x'
};
function signUserOp(op, signer, entryPoint, chainId) {
    var message = getUserOpHash(op, entryPoint, chainId);
    var msg1 = Buffer.concat([
        Buffer.from('\x19Ethereum Signed Message:\n32', 'ascii'),
        Buffer.from((0, utils_1.arrayify)(message))
    ]);
    var sig = (0, ethereumjs_util_1.ecsign)((0, ethereumjs_util_1.keccak256)(msg1), Buffer.from((0, utils_1.arrayify)(signer.privateKey)));
    // that's equivalent of:  await signer.signMessage(message);
    // (but without "async"
    var signedMessage1 = (0, ethereumjs_util_1.toRpcSig)(sig.v, sig.r, sig.s);
    return __assign(__assign({}, op), { signature: signedMessage1 });
}
exports.signUserOp = signUserOp;
function fillUserOpDefaults(op, defaults) {
    if (defaults === void 0) { defaults = exports.DefaultsForUserOp; }
    var partial = __assign({}, op);
    // we want "item:undefined" to be used from defaults, and not override defaults, so we must explicitly
    // remove those so "merge" will succeed.
    for (var key in partial) {
        if (partial[key] == null) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete partial[key];
        }
    }
    var filled = __assign(__assign({}, defaults), partial);
    return filled;
}
exports.fillUserOpDefaults = fillUserOpDefaults;
// helper to fill structure:
// - default callGasLimit to estimate call from entryPoint to account (TODO: add overhead)
// if there is initCode:
//  - calculate sender by eth_call the deployment code
//  - default verificationGasLimit estimateGas of deployment code plus default 100000
// no initCode:
//  - update nonce from account.getNonce()
// entryPoint param is only required to fill in "sender address when specifying "initCode"
// nonce: assume contract as "getNonce()" function, and fill in.
// sender - only in case of construction: fill sender from initCode.
// callGasLimit: VERY crude estimation (by estimating call to account, and add rough entryPoint overhead
// verificationGasLimit: hard-code default at 100k. should add "create2" cost
function fillUserOp(op, entryPoint, getNonceFunction) {
    var _a;
    if (getNonceFunction === void 0) { getNonceFunction = 'getNonce'; }
    return __awaiter(this, void 0, void 0, function () {
        var op1, provider, initAddr, initCallData, ctr, salt, _b, initEstimate, c, _c, gasEtimated, block, op2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    op1 = __assign({}, op);
                    provider = entryPoint === null || entryPoint === void 0 ? void 0 : entryPoint.provider;
                    if (!(op.initCode != null)) return [3 /*break*/, 5];
                    initAddr = (0, utils_1.hexDataSlice)(op1.initCode, 0, 20);
                    initCallData = (0, utils_1.hexDataSlice)(op1.initCode, 20);
                    if (op1.nonce == null)
                        op1.nonce = 0;
                    if (!(op1.sender == null)) return [3 /*break*/, 3];
                    if (!(initAddr.toLowerCase() === Create2Factory_1.Create2Factory.contractAddress.toLowerCase())) return [3 /*break*/, 1];
                    ctr = (0, utils_1.hexDataSlice)(initCallData, 32);
                    salt = (0, utils_1.hexDataSlice)(initCallData, 0, 32);
                    op1.sender = Create2Factory_1.Create2Factory.getDeployedAddress(ctr, salt);
                    return [3 /*break*/, 3];
                case 1:
                    // console.log('\t== not our deployer. our=', Create2Factory.contractAddress, 'got', initAddr)
                    if (provider == null)
                        throw new Error('no entrypoint/provider');
                    _b = op1;
                    return [4 /*yield*/, entryPoint.callStatic.getSenderAddress(op1.initCode).catch(function (e) { return e.errorArgs.sender; })];
                case 2:
                    _b.sender = _d.sent();
                    _d.label = 3;
                case 3:
                    if (!(op1.verificationGasLimit == null)) return [3 /*break*/, 5];
                    if (provider == null)
                        throw new Error('no entrypoint/provider');
                    return [4 /*yield*/, provider.estimateGas({
                            from: entryPoint === null || entryPoint === void 0 ? void 0 : entryPoint.address,
                            to: initAddr,
                            data: initCallData,
                            gasLimit: 10e6
                        })];
                case 4:
                    initEstimate = _d.sent();
                    op1.verificationGasLimit = ethers_1.BigNumber.from(exports.DefaultsForUserOp.verificationGasLimit).add(initEstimate);
                    _d.label = 5;
                case 5:
                    if (!(op1.nonce == null)) return [3 /*break*/, 7];
                    if (provider == null)
                        throw new Error('must have entryPoint to autofill nonce');
                    c = new ethers_1.Contract(op.sender, ["function ".concat(getNonceFunction, "() view returns(uint256)")], provider);
                    _c = op1;
                    return [4 /*yield*/, c[getNonceFunction]().catch((0, testutils_1.rethrow)())];
                case 6:
                    _c.nonce = _d.sent();
                    _d.label = 7;
                case 7:
                    if (!(op1.callGasLimit == null && op.callData != null)) return [3 /*break*/, 9];
                    if (provider == null)
                        throw new Error('must have entryPoint for callGasLimit estimate');
                    return [4 /*yield*/, provider.estimateGas({
                            from: entryPoint === null || entryPoint === void 0 ? void 0 : entryPoint.address,
                            to: op1.sender,
                            data: op1.callData
                        })
                        // console.log('estim', op1.sender,'len=', op1.callData!.length, 'res=', gasEtimated)
                        // estimateGas assumes direct call from entryPoint. add wrapper cost.
                    ];
                case 8:
                    gasEtimated = _d.sent();
                    // console.log('estim', op1.sender,'len=', op1.callData!.length, 'res=', gasEtimated)
                    // estimateGas assumes direct call from entryPoint. add wrapper cost.
                    op1.callGasLimit = gasEtimated; // .add(55000)
                    _d.label = 9;
                case 9:
                    if (!(op1.maxFeePerGas == null)) return [3 /*break*/, 11];
                    if (provider == null)
                        throw new Error('must have entryPoint to autofill maxFeePerGas');
                    return [4 /*yield*/, provider.getBlock('latest')];
                case 10:
                    block = _d.sent();
                    op1.maxFeePerGas = block.baseFeePerGas.add((_a = op1.maxPriorityFeePerGas) !== null && _a !== void 0 ? _a : exports.DefaultsForUserOp.maxPriorityFeePerGas);
                    _d.label = 11;
                case 11:
                    // TODO: this is exactly what fillUserOp below should do - but it doesn't.
                    // adding this manually
                    if (op1.maxPriorityFeePerGas == null) {
                        op1.maxPriorityFeePerGas = exports.DefaultsForUserOp.maxPriorityFeePerGas;
                    }
                    op2 = fillUserOpDefaults(op1);
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    if (op2.preVerificationGas.toString() === '0') {
                        // TODO: we don't add overhead, which is ~21000 for a single TX, but much lower in a batch.
                        op2.preVerificationGas = (0, testutils_1.callDataCost)(packUserOp(op2, false));
                    }
                    return [2 /*return*/, op2];
            }
        });
    });
}
exports.fillUserOp = fillUserOp;
function fillAndSign(op, signer, entryPoint, getNonceFunction) {
    if (getNonceFunction === void 0) { getNonceFunction = 'getNonce'; }
    return __awaiter(this, void 0, void 0, function () {
        var provider, op2, chainId, message, signature, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = entryPoint === null || entryPoint === void 0 ? void 0 : entryPoint.provider;
                    return [4 /*yield*/, fillUserOp(op, entryPoint, getNonceFunction)];
                case 1:
                    op2 = _a.sent();
                    return [4 /*yield*/, provider.getNetwork().then(function (net) { return net.chainId; })];
                case 2:
                    chainId = _a.sent();
                    message = (0, utils_1.arrayify)(getUserOpHash(op2, entryPoint.address, chainId));
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 7]);
                    return [4 /*yield*/, signer.signMessage(message)];
                case 4:
                    signature = _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    return [4 /*yield*/, signer._legacySignMessage(message)];
                case 6:
                    // attempt to use 'eth_sign' instead of 'personal_sign' which is not supported by Foundry Anvil
                    signature = _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, __assign(__assign({}, op2), { signature: signature })];
            }
        });
    });
}
exports.fillAndSign = fillAndSign;
/**
 * This function relies on a "state override" functionality of the 'eth_call' RPC method
 * in order to provide the details of a simulated validation call to the bundler
 * @param userOp
 * @param entryPointAddress
 * @param txOverrides
 */
function simulateValidation(userOp, entryPointAddress, txOverrides) {
    return __awaiter(this, void 0, void 0, function () {
        var entryPointSimulations, data, tx, stateOverride, simulationResult, res, error_1, revertData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    entryPointSimulations = typechain_1.EntryPointSimulations__factory.createInterface();
                    data = entryPointSimulations.encodeFunctionData('simulateValidation', [userOp]);
                    tx = __assign({ to: entryPointAddress, data: data }, txOverrides);
                    stateOverride = (_a = {},
                        _a[entryPointAddress] = {
                            code: EntryPointSimulations_json_1.default.deployedBytecode
                        },
                        _a);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, hardhat_1.ethers.provider.send('eth_call', [tx, 'latest', stateOverride])];
                case 2:
                    simulationResult = _b.sent();
                    res = entryPointSimulations.decodeFunctionResult('simulateValidation', simulationResult);
                    // note: here collapsing the returned "tuple of one" into a single value - will break for returning actual tuples
                    return [2 /*return*/, res[0]];
                case 3:
                    error_1 = _b.sent();
                    revertData = error_1 === null || error_1 === void 0 ? void 0 : error_1.data;
                    if (revertData != null) {
                        // note: this line throws the revert reason instead of returning it
                        entryPointSimulations.decodeFunctionResult('simulateValidation', revertData);
                    }
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.simulateValidation = simulateValidation;
// TODO: this code is very much duplicated but "encodeFunctionData" is based on 20 overloads
//  TypeScript is not able to resolve overloads with variables: https://github.com/microsoft/TypeScript/issues/14107
function simulateHandleOp(userOp, target, targetCallData, entryPointAddress, txOverrides) {
    return __awaiter(this, void 0, void 0, function () {
        var entryPointSimulations, data, tx, stateOverride, simulationResult, res, error_2, revertData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    entryPointSimulations = typechain_1.EntryPointSimulations__factory.createInterface();
                    data = entryPointSimulations.encodeFunctionData('simulateHandleOp', [userOp, target, targetCallData]);
                    tx = __assign({ to: entryPointAddress, data: data }, txOverrides);
                    stateOverride = (_a = {},
                        _a[entryPointAddress] = {
                            code: EntryPointSimulations_json_1.default.deployedBytecode
                        },
                        _a);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, hardhat_1.ethers.provider.send('eth_call', [tx, 'latest', stateOverride])];
                case 2:
                    simulationResult = _b.sent();
                    res = entryPointSimulations.decodeFunctionResult('simulateHandleOp', simulationResult);
                    // note: here collapsing the returned "tuple of one" into a single value - will break for returning actual tuples
                    return [2 /*return*/, res[0]];
                case 3:
                    error_2 = _b.sent();
                    revertData = error_2 === null || error_2 === void 0 ? void 0 : error_2.data;
                    if (revertData != null) {
                        // note: this line throws the revert reason instead of returning it
                        entryPointSimulations.decodeFunctionResult('simulateHandleOp', revertData);
                    }
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.simulateHandleOp = simulateHandleOp;
