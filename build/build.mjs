import * as esbuild from 'esbuild';
import { createPrototypeWithSettings } from './settings.mjs';

var settings = createPrototypeWithSettings({
    "minify": true
    ,
});

await esbuild.build(settings);
