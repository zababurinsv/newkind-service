import app from './server.mjs'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const port = (process.env.PORT)
    ? process.env.PORT
    : pkg.config.port_back
app.listen(port ,() => {
    console.log('pid: ', process.pid)
    console.log('listening on http://localhost:'+ port);
});


/** Alternative
 * import { readFile } from 'fs/promises';
      const json = JSON.parse(
        await readFile(
        new URL('./some-file.json', import.meta.url)
      )
    );
 */