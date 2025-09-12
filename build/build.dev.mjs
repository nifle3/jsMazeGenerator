import * as esbuild from 'esbuild';
import { createPrototypeWithSettings } from './settings.mjs';

var settings = createPrototypeWithSettings({
    "sourcemap": true
    ,
});

var context = await esbuild.context(settings);

await context.watch();

var {port, host} = await context.serve({
    servedir: "./"
});

console.log(`Listen on ${host}:${port}`);