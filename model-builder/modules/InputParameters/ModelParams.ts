import { readFileSync } from 'fs';
import { LayerSettings } from './LayerSettings';

export class ModelParams {

    public training: {
        epochs: number;
        validationSplit: number;
        batchSize: number
    }

    public architecture: {
        input: {
            size: [number, number],
            channels: number,
            scalar_transformation: number
        }
        architectureName: string,
        layerSettings: LayerSettings
    }

    public static loadFromFile(filePath): ModelParams {
        const loaded: ModelParams = JSON.parse(readFileSync(filePath).toString());
        return loaded;
    }
}