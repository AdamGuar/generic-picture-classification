export class InputParameters {
    public dataSetPath: string = null;
    public trainingSetPercent: number = 0;
    public normalizedOut: string = null;

    public static buildClOptions() {
      return [
        { name: 'dataSetPath', alias: 'd', type: String },
        { name: 'trainingSetPercent', alias: 'r', type: Number },
        { name: 'normalizedOut', alias: 'o', type: String }
      ];
    }
}