// If you see a good way to avoid "any" here, please open a pull request
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor = abstract new (...args: any[]) => any;
