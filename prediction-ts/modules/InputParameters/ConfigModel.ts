export class ConfigModel {
    tensorParams: {
        size: [number, number],
        channels: number,
        scalar: number
    }
    modelPath: string
    labelsPath: string
    labelsMapping: string[]
}