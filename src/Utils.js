"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getERC165InterfaceID = void 0;
var abi_1 = require("@ethersproject/abi");
function getERC165InterfaceID(abi) {
    var interfaceId = abi
        .filter(function (it) { return it.type === 'function' && it.name != null; })
        .map(function (it) {
        var iface = new abi_1.Interface([it]);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return iface.getSighash(it.name);
    })
        .map(function (x) { return parseInt(x, 16); })
        .reduce(function (x, y) { return x ^ y; });
    interfaceId = interfaceId > 0 ? interfaceId : 0xFFFFFFFF + interfaceId + 1;
    return '0x' + interfaceId.toString(16).padStart(8, '0');
}
exports.getERC165InterfaceID = getERC165InterfaceID;
