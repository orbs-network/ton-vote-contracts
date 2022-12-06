export default {
    "nodeArguments": [
        "--async-stack-traces"
    ],
    "files": [
        "e2e/**/*.test.*"
    ],
    "extensions": [
        "ts"
    ],
    "require": [
        "ts-node/register/transpile-only"
    ]
};