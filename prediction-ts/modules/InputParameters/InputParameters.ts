export class InputParameters {
    public inputImage: string = null;
    public configPath: string = null;

    public static buildClOptions() {
      return [
        { name: 'inputImage', alias: 'i', type: String },
        { name: 'configPath', alias: 'c', type: String },
      ];
    }
}