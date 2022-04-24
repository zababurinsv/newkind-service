import path from "path";
let __dirname = path.dirname(process.argv[1]);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");
import express from 'express'
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
import notFound from '../utils/notFound.html.mjs'
import corsOptions from '../security/corsOptions.mjs'
import shouldCompress from '../utils/compress.mjs'
import service from './routes/newkind-service/index.mjs'
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

app.use(`${pkg.targets.service.publicUrl}`, service);

app.options(`/`, await cors(corsOptions))
app.get(`/`, async (req, res) => {
    res.status(404).send(await notFound(pkg.targets.dev.publicUrl));
})

// app.options(`/tests/:source`, await cors(corsOptions))
// app.get(`/tests/:source`, async (req, res) => {
//     console.log(`${pkg.config.service}/tests/:source`,req.params.source)
//     res.status(200).sendFile(`${req.params.source}`, { root: path.join(__dirname, `../service/${pkg.config.service}/tests`) });
// })

app.use((req, res, next) => {
    console.log(`main__sss${req.path}`);
    next();
});

// app.use(express.static(path.join(__dirname,`../service/${pkg.config.service}`)));
// app.use('/tests',express.static(path.join(__dirname,`../service/${pkg.config.service}/tests`)));
app.use(queue.getErrorMiddleware())

export default app
