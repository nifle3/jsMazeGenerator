var entryPoints = [
    "src/index.ts",
];

var prototype = {
    entryPoints : entryPoints,
    bundle: true,
    outdir: "./dist",
    target: "esnext",
};


export var createPrototypeWithSettings = (
    (settings) => {
        return { ...prototype, ...settings };
    }
);
