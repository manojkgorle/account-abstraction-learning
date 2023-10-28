import '../test/aa.init'
import { BigNumber, Event, Wallet,providers } from 'ethers'
import {ethers} from 'hardhat'
import {
  
  SimpleAccountFactory__factory,
  
  EntryPoint__factory,
 
} from '../typechain'
import {
  AddressZero,
  createAccountOwner,
  fund,
  checkForGeth,
  rethrow,
  tostr,
  getAccountInitCode,
  calcGasUsage,
  ONE_ETH,
  TWO_ETH,
  deployEntryPoint,
  getBalance,
  createAddress,
  getAccountAddress,
  HashZero,
  createAccount,
  getAggregatedAccountInitCode,
  decodeRevertReason
} from '../test/testutils'
import { DefaultsForUserOp, fillAndSign, fillUserOp, fillUserOpDefaults, getUserOpHash, simulateValidation } from '../test/UserOp'
import { UserOperation } from '../test/UserOperation'
import { PopulatedTransaction } from 'ethers/lib/ethers'

// fetch true or false from backend along with the private key, if false then create Account, if true then use the already deployed address
import {testExternalUser} from './StorageJsonDecrypted/account1.json'
import {buildBearFactory} from "./UsableJson/factory.json"
// the above import is used to get testdata and run process, till the api is ready
//@todo prepare and integrate api
let sender:string = testExternalUser.publicKey // user 
let signingKey: string = testExternalUser.privateKey //user privateKey
let salt = buildBearFactory.salt
let initCode
let isIntiated = testExternalUser.isIntiated

let ethersSigner = ethers.provider.getSigner() // our address
let entryPointAddress = buildBearFactory.entrypoint
// dont know if simpleAccountFactory can sign or not
let entryPointContract = EntryPoint__factory.connect(entryPointAddress,ethersSigner)
let simpleAccountFactory = SimpleAccountFactory__factory.connect(entryPointAddress,ethersSigner)
function getInitCode(){
    if (isIntiated){
      return "0x"
    }else{
      getAccountInitCode(sender,simpleAccountFactory,salt)
    }
}

// let [userInitCode,userEOA] = getInitCode()
let userOp:Partial<UserOperation> = {}

const defaultOp = fillUserOpDefaults(userOp,DefaultsForUserOp)
const filledOp = fillAndSign({
  initCode: getInitCode(),
  verificationGasLimit: 2e6
},ethersSigner,entryPointContract)
//@todo populate transaction is a ethers method to prepare a transaction but not sending the transaction, we can obtain the calldata from the populate transaction method
console.log(filledOp)