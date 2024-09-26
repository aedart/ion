// import tseslint from "typescript-eslint";

export default [
    {
        ignores: [
            ".build/*",
            "packages/*/dist/*",
            "packages/xyz/",
            "shared/*",
            "tests/*",

            "shim.d.ts",
            "aliases.js",
            "tmp.js"
        ]
    },
    //...tseslint.configs.recommended,
];