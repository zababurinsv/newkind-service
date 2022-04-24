import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
import express from 'express'
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import notFound from './utils/notFound.html.mjs'
import corsOptions from './security/corsOptions.mjs'
import shouldCompress from './utils/compress.mjs'
const app = express()
app.use(await express.json())
app.use(await compression({ filter: shouldCompress }))
app.use(await cors({ credentials: true }));

const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});

app.use(queue.getMiddleware());

app.use((req, res, next) => {
    console.log(`main__${req.path}`);
    next();
});

app.options('/import', cors(corsOptions))
app.get('/import', async (req, res) => {
    res.sendFile('import.html', { root: __dirname });
})

app.use(express.static(`${__dirname}${pkg.palette.zb.scope}/`));
app.use(express.static(`${__dirname}${pkg.palette.zb.scope}/${pkg.palette.zb.active}`));
app.use(express.static(`${__dirname}${pkg.palette.zb.scope}/${pkg.palette.zb.active}/static`));

app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}${pkg.palette.zb.scope}/${pkg.palette.zb.active}`});
})

app.options('/index.html', cors(corsOptions))
app.get('/index.html', async (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}${pkg.palette.zb.scope}/${pkg.palette.zb.active}`})
})

app.options(`/*`, await cors(corsOptions))
app.get(`/*`, async (req, res) => {
    res.status(404).send(await notFound(pkg.config.service));
})

app.use(queue.getErrorMiddleware())

const port = (process.env.PORT)
    ? process.env.PORT
    : pkg.palette.zb.port
app.listen(port ,() => {
    console.log('pid: ', process.pid)
    console.log('listening on http://localhost:'+ port);
});
