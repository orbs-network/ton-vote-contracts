declare module 'docker-compose-mocha' {
    // https://www.npmjs.com/package/docker-compose-mocha
    type HookFunction = (fn: (...args: any[]) => any) => void;

    export function dockerComposeTool(
        before: HookFunction,
        after: HookFunction,
        pathToCompose: string,
        options?: {
            startOnlyTheseServices?: string[];
            shouldPullImages?: boolean; // pull images only if this is true (and the default is true), otherwise it will assume they are already pulled
            brutallyKill?: boolean; // destroy the containers and not gently stop them. Usually, for test containers this is enough and improves shutdown considerably
            envName?: string; // use this environment name instead of inventing a new one
            cleanUp?: boolean; // (default true) full cleanup on before function
            containerCleanUp?: boolean; // (default true) containers cleanup on after function
        }
    ): any;

    export function getAddressForService(
        envName: string,
        pathToCompose: string,
        serviceName: string,
        originalPort: number
    ): Promise<string>;

    export function getLogsForService(
        envName: string,
        pathToCompose: string,
        serviceName: string
    ): Promise<string>;
}
