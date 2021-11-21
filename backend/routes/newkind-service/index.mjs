import path from 'path'
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cors from 'cors'
import express from 'express'
let app = express.Router();
app.use(await cors({ credentials: true }));
import corsOptions from '../../corsOptions.mjs'
const pkg = require("../../../package.json");

app.options(`/`, await cors(corsOptions))
app.get(`/`, async (req, res) => {
    console.log()
    res.status(200).sendFile('index.html', { root: path.join(__dirname, '../service') });
})

app.options('/:source', await cors(corsOptions))
app.get('/:source', async (req, res) => {
    console.log('source',req.params.source)
    res.status(200).sendFile(`${req.params.source}`, { root: path.join(__dirname, '../service') });
})

app.options('/public/:source', await cors(corsOptions))
app.get('/public/:source', async (req, res) => {
    console.log('/public/:source',req.params.source)
    res.status(200).sendFile(`${req.params.source}`, { root: path.join(__dirname, '../service/public') });
})


app.use(`/newkind-service/public`,express.static(path.join(__dirname, '../../../service/public')));
app.use('/',express.static(path.join(__dirname, '../../../service')));
app.use(express.static(path.join(__dirname, '../../../service')));
export default app;