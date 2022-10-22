export class PredictionModel {
    label: string
    score: number

    constructor(label: string, score: number) {
        this.label = label;
        this.score = score;
    }
}