import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");
import express from 'express'
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import notFound from './notFound.html.mjs'
const app = express()
app.use(express.json())

let corsOptions = {
    origin: function (origin, callback) {
        if (pkg.config.list.white.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
}

app.use(await compression({ filter: shouldCompress }))
app.use(await cors({ credentials: true }));
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());

app.options(`${pkg.config.service}`, await cors(corsOptions))
app.get(`${pkg.config.service}`, async (req, res) => {
    res.status(200).sendFile('index.html', { root: path.join(__dirname, '../service') });
})

app.use('/newkind-service',express.static(path.join(__dirname, '../service')));
app.use(express.static(path.join(__dirname, '../service')));

app.options(`/*`, await cors(corsOptions))
app.get(`/*`, async (req, res) => {
    res.status(404).send(await notFound());
})

app.use(queue.getErrorMiddleware())

export default app
