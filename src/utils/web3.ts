import _ from "lodash"
import Web3 from "web3"
import {utf8ToHex} from 'web3-utils'
export const getWeb3Instance = () => {
    const windowObj = window as any;
    const { ethereum, web3 } = windowObj
    if (ethereum && ethereum.isMetaMask) {
        return new Web3(ethereum)
    }
    if (web3) {
        return new Web3(web3.currentProvider)
    }
    else return null
}
const web3 = getWeb3Instance();

export const isMetaMaskInstalled = () => {
    const isInstallMetaMask = _.get(window, 'ethereum.isMetaMask', false)
    return isInstallMetaMask
}

export const isLoginWithAcc = async (): Promise<boolean | string> => {
    let result: string | boolean = false;
    await web3?.eth.getAccounts((err, account) => {
        if (err != null) console.error('An error occurred:', err)
        else if (account.length === 0) { }
        else result = account[0]
    })
    return result
};

export const signMessage = async(message: string, address: string) => {
    let signature = ''
    await web3?.eth.personal.sign(utf8ToHex(message),address,'').then(
        (value) => signature = value 
    )
    return signature
}