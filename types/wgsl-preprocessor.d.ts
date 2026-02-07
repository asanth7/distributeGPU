declare module 'wgsl-preprocessor/wgsl-preprocessor.js' {
    export function preprocess(code: string, defines: any): string;
    export function wgsl(strings: TemplateStringsArray, ...values: any[]): string;
}
