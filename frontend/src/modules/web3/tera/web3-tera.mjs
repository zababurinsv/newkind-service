/*
 * @project: TERA
 * @version: Development (beta)
 * @license: MIT (not for evil)
 * @copyright: Yuriy Ivanov (Vtools) 2017-2020 [progr76@gmail.com]
 * Web: https://terafoundation.org
 * Twitter: https://twitter.com/terafoundation
 * Telegram:  https://t.me/terafoundation
*/


let web3 = {
    CreateAccount:function (Item,F) {
        return web3.SendMessage({cmd:"sendcreate", Item:Item}, F);
    },
    listener: {
        OnLogin:function (F) {
            web3.tera._OnLogin = F;
        },
        OnInfo:function (F) {
            web3.tera._OnInfo = F;
        },
        OnEvent:function (F) {
            web3.tera._OnEvent = F;
        },
        GetPubKey:function (F) {
            return SendMessage({cmd:"GetPubKey"}, F);
        },
    },
    tera: {
        Login:function (SmartNum,UrlPath,Forse) {
            if(!$("idTeraWallet")) {
                return web3.InjectHTML(UrlPath, SmartNum, Forse);
            }

            return SendMessage({cmd:"login", smart:SmartNum, Forse:Forse});
        },
        Logout:function () {
            SetVisibleBlock("idTeraWallet", 0);
            return SendMessage({cmd:"logout"});
        },
        Send:function (Tx) {
            SetVisibleBlock("idTeraWallet", 1);
            return SendMessage({cmd:"send", Item:Tx});
        },
        SendCall:function (Item,F) {
            return SendMessage({cmd:"sendcall", Item:Item}, F);
        },
        StaticCall:function (Item,F) {
            return SendMessage({cmd:"staticcall", Item:Item}, F);
        },
        GetAccountList:function (Params,F) {
            var Data = {cmd:"DappAccountList", Params:Params};
            return SendMessage(Data, F);
        },
        GetSmartList:function (Params,F) {
            var Data = {cmd:"DappSmartList", Params:Params};
            return SendMessage(Data, F);
        },
        GetBlockList:function (Params,F) {
            var Data = {cmd:"DappBlockList", Params:Params};
            return SendMessage(Data, F);
        },
        GetTransactionList:function (Params,F) {
            var Data = {cmd:"DappTransactionList", Params:Params};
            return SendMessage(Data, F);
        },
        GetBlockFile:function (Params,F) {
            var Data = {cmd:"DappBlockFile", Params:Params};
            return SendMessage(Data, F);
        },
        ComputeSecret:function (Params,F) {
            return SendMessage({cmd:"ComputeSecret", Params:Params}, F);
        },
        _CounterId:0,
        _MapId:{},
    },
    SetVisibleBlock: (name,b) => {
        let id = $(name);
        if(id) {
            id.style.display = b ? 'block' : "none";
        }
    },
    SendMessage: (Data, F) => {
        if(F) {
            web3.tera._CounterId++;
            web3.tera._MapId[web3.tera._CounterId] = F;
            Data.id = web3.tera._CounterId;
        }
        let win = window.frames.terawallet;
        if(!win) {
            return 0;
        } else {
            console.log('ssssssssss postMessage sssssssssss', Data)
            win.postMessage(Data, "*");
            return 1;
        }
    },
    InjectHTML: (UrlPath,SmartNum,Forse) => {
        return new Promise(resolve => {
            if(!UrlPath) {
                UrlPath = "https://terawallet.org/web3-wallet.html";
            }
            let idTeraWallet = document.querySelector('#idTeraWallet')
            if(idTeraWallet) {
                console.log("Was created tera-HTML tags");
                resolve(false)
            } else {
                let body = document.body
                console.log(body)
                if(!body) {
                    console.error("Not find tag <BODY>");
                    resolve(false)
                } else {
                    let iframe = document.createElement('iframe');
                    iframe.name = 'terawallet';
                    iframe.sandbox = "allow-scripts allow-popups allow-same-origin";
                    iframe.src = UrlPath;
                    iframe.style = "display: none; width:45vw; height: 33vw; padding: 0; margin: 10px;  " + "border: 1px solid gray; border-radius:5px; box-shadow: 0 0 5px rgb(0 0 0); " + "position:absolute; top:50px; left: calc(50% - 160px);";
                    iframe.id = "idTeraWallet";
                    body.appendChild(iframe);
                    iframe.onload = function () {
                        if(SmartNum) {
                            web3.tera.SendMessage({cmd:"login", smart:SmartNum, Forse:Forse});
                            resolve(iframe)
                        } else {
                            resolve(iframe)
                        }
                    };
                }
            }
        })
    }
}

export default web3

