import { readFileSync } from 'fs';

export class FittingsParams {
    public epochs: number;
    public validationSplit: number;
    public batchSize: number

    public static loadFromFile(filePath): FittingsParams {
        const loaded: FittingsParams = JSON.parse(readFileSync(filePath).toString());
        return loaded;
    }
}