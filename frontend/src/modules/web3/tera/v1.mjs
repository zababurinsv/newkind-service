let DappStaticCall = () => {}
let GetCurrentInfo = () => {}
let GetNodeList = () => {}
let GetAccountList = () => {}
let GetBlockList = () => {}
let GetTransactionList = () => {}
let GetDappList = () => {}
let GetAccountListByKey = () => {}
let GetTransaction = () => {}
let GetHistoryTransactions = () => {}
let SendHexTx = () => {}
let GetSupply = () => {}
let GetWork = () => {}
let SubmitWork = () => {}
export default {
    DappStaticCall: DappStaticCall,
    GetCurrentInfo: GetCurrentInfo,
    GetNodeList: GetNodeList,
    GetAccountList: GetAccountList,
    GetBlockList: GetBlockList,
    GetTransactionList: GetTransactionList,
    GetDappList: GetDappList,
    GetAccountListByKey: GetAccountListByKey,
    GetTransaction: GetTransaction,
    GetHistoryTransactions: GetHistoryTransactions,
    SendHexTx: SendHexTx,
    GetSupply: GetSupply,
    Mining: {
        GetWork: GetWork,
        SubmitWork: SubmitWork
    }
}