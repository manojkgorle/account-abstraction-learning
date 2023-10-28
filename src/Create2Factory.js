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
exports.Create2Factory = void 0;
// from: https://github.com/Arachnid/deterministic-deployment-proxy
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var Create2Factory = /** @class */ (function () {
    function Create2Factory(provider, signer) {
        if (signer === void 0) { signer = provider.getSigner(); }
        this.provider = provider;
        this.signer = signer;
        this.factoryDeployed = false;
    }
    /**
     * deploy a contract using our deterministic deployer.
     * The deployer is deployed (unless it is already deployed)
     * NOTE: this transaction will fail if already deployed. use getDeployedAddress to check it first.
     * @param initCode delpoyment code. can be a hex string or factory.getDeploymentTransaction(..)
     * @param salt specific salt for deployment
     * @param gasLimit gas limit or 'estimate' to use estimateGas. by default, calculate gas based on data size.
     */
    Create2Factory.prototype.deploy = function (initCode, salt, gasLimit) {
        if (salt === void 0) { salt = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var addr, deployTx, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deployFactory()];
                    case 1:
                        _a.sent();
                        if (typeof initCode !== 'string') {
                            // eslint-disable-next-line @typescript-eslint/no-base-to-string
                            initCode = initCode.data.toString();
                        }
                        addr = Create2Factory.getDeployedAddress(initCode, salt);
                        return [4 /*yield*/, this.provider.getCode(addr).then(function (code) { return code.length; })];
                    case 2:
                        if ((_a.sent()) > 2) {
                            return [2 /*return*/, addr];
                        }
                        deployTx = {
                            to: Create2Factory.contractAddress,
                            data: this.getDeployTransactionCallData(initCode, salt)
                        };
                        if (!(gasLimit === 'estimate')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.signer.estimateGas(deployTx)];
                    case 3:
                        gasLimit = _a.sent();
                        _a.label = 4;
                    case 4:
                        // manual estimation (its bit larger: we don't know actual deployed code size)
                        if (gasLimit === undefined) {
                            gasLimit = (0, utils_1.arrayify)(initCode)
                                .map(function (x) { return x === 0 ? 4 : 16; })
                                .reduce(function (sum, x) { return sum + x; }) +
                                200 * initCode.length / 2 + // actual is usually somewhat smaller (only deposited code, not entire constructor)
                                6 * Math.ceil(initCode.length / 64) + // hash price. very minor compared to deposit costs
                                32000 +
                                21000;
                            // deployer requires some extra gas
                            gasLimit = Math.floor(gasLimit * 64 / 63);
                        }
                        return [4 /*yield*/, this.signer.sendTransaction(__assign(__assign({}, deployTx), { gasLimit: gasLimit }))];
                    case 5:
                        ret = _a.sent();
                        return [4 /*yield*/, ret.wait()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.provider.getCode(addr).then(function (code) { return code.length; })];
                    case 7:
                        if ((_a.sent()) === 2) {
                            throw new Error('failed to deploy');
                        }
                        return [2 /*return*/, addr];
                }
            });
        });
    };
    Create2Factory.prototype.getDeployTransactionCallData = function (initCode, salt) {
        if (salt === void 0) { salt = 0; }
        var saltBytes32 = (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(salt), 32);
        return (0, utils_1.hexConcat)([
            saltBytes32,
            initCode
        ]);
    };
    /**
     * return the deployed address of this code.
     * (the deployed address to be used by deploy()
     * @param initCode
     * @param salt
     */
    Create2Factory.getDeployedAddress = function (initCode, salt) {
        var saltBytes32 = (0, utils_1.hexZeroPad)((0, utils_1.hexlify)(salt), 32);
        return '0x' + (0, utils_1.keccak256)((0, utils_1.hexConcat)([
            '0xff',
            Create2Factory.contractAddress,
            saltBytes32,
            (0, utils_1.keccak256)(initCode)
        ])).slice(-40);
    };
    // deploy the factory, if not already deployed.
    Create2Factory.prototype.deployFactory = function (signer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._isFactoryDeployed()];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (signer !== null && signer !== void 0 ? signer : this.signer).sendTransaction({
                                to: Create2Factory.factoryDeployer,
                                value: ethers_1.BigNumber.from(Create2Factory.factoryDeploymentFee)
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.provider.sendTransaction(Create2Factory.factoryTx)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._isFactoryDeployed()];
                    case 4:
                        if (!(_a.sent())) {
                            throw new Error('fatal: failed to deploy deterministic deployer');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Create2Factory.prototype._isFactoryDeployed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deployed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.factoryDeployed) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.provider.getCode(Create2Factory.contractAddress)];
                    case 1:
                        deployed = _a.sent();
                        if (deployed.length > 2) {
                            this.factoryDeployed = true;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.factoryDeployed];
                }
            });
        });
    };
    // from: https://github.com/Arachnid/deterministic-deployment-proxy
    Create2Factory.contractAddress = '0x4e59b44847b379578588920ca78fbf26c0b4956c';
    Create2Factory.factoryTx = '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222';
    Create2Factory.factoryDeployer = '0x3fab184622dc19b6109349b94811493bf2a45362';
    Create2Factory.deploymentGasPrice = 100e9;
    Create2Factory.deploymentGasLimit = 100000;
    Create2Factory.factoryDeploymentFee = (Create2Factory.deploymentGasPrice * Create2Factory.deploymentGasLimit).toString();
    return Create2Factory;
}());
exports.Create2Factory = Create2Factory;
