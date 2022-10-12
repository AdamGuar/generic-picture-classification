import path from 'path';

export class InputParameters {
    public fullDataSet: string = null;
    
    public trainingSet: string = null;
    public testSet: string = null;

    public enhancedLogging: boolean = false;
    public interactiveMode: boolean = true;

    public modelParams: string = null;
    public modelOut: string = './outModel/model'

    public static buildClOptions() {
      return [
        { name: 'fullDataSet', alias: 'd', type: String },
        { name: 'trainingSet', alias: 'l', type: Number },
        { name: 'testSet', alias: 't', type: String },
        { name: 'enhancedLogging', alias: 'g', type: Boolean, defaultOption: false },
        { name: 'interactiveMode', alias: 'i', type: Boolean, defaultOption: false },
        { name: 'modelParams', alias: 'm', type: String, defaultOption: './modelParams/modelParams.json' },

        { name: 'modelOut', alias: 'o', type: String, defaultOption: './outModel/model' },
      ];
    }

    public static getTrainingSetPath(options: InputParameters): string {
        if (options.trainingSet) {
            return options.trainingSet
        } else {
            return path.join(options.fullDataSet, 'train');
        }
    };

    public static getTestSetPath(options: InputParameters): string {
        if (options.trainingSet) {
            return options.trainingSet
        } else {
            return path.join(options.fullDataSet, 'test');
        }
    }
}