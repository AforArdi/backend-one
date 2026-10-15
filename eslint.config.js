import js from "@eslint/js";

import tseslint from "typescript-eslint";

import { createRequire } from 'module';



var require = createRequire(import.meta.url);

var module = { exports: {} };



export default tseslint.config(

    js.configs.recommended,

    ...tseslint.configs.recommended,

);
