import { defineConfig } from "tsup";

export default defineConfig((_options) => {
    return {
        entry: ["./browser.ts"],
        format: ["iife"],
        // minify: !options.watch,
        outExtension: () => ({ js: `.js` }),
        dts: true,
        splitting: false,
        bundle: true,
        treeshake: false,
        clean: true
    };
});
