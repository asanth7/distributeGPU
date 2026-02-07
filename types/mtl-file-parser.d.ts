declare module 'mtl-file-parser' {
    export default class MtlFileParser {
        constructor(fileContents: string);
        parse(): any;
    }
}
