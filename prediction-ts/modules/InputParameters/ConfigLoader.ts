import { readFileSync } from 'fs';
import { ConfigModel } from './ConfigModel';

export class ConfigLoader {
    static loadConfig(configPath: string) {
        try {
            const config: ConfigModel = JSON.parse(readFileSync(configPath).toString());
            return config;
        } catch(err) {
            throw new ConfigLoaderException(
                'Unable to load config',
                err
            );
        }
    }
}

class ConfigLoaderException {
    message: string
    details: any

    constructor(message: string, details: any) {
        this.message = message,
        this.details = details
    }
}