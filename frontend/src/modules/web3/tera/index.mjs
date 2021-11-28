import tera from './web3-tera.mjs'
import v1 from './v1.mjs'
import v2 from './v2.mjs'
import wallet from './wallet.mjs'
import axios from 'axios'

export default {
    tera: tera,
    api: {
        v1: v1,
        v2: v2,
        wallet: wallet
    }
}