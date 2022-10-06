class DataSetModel {
    trainData: SetModel
    testData: SetModel

    constructor(){
        this.testData = new SetModel();
        this.trainData = new SetModel();
    };
};

class SetModel {
    categories: {
        categoryName: string,
        images: any[]
    }[] = []
    labels: { labelName: string, labelId: number }[] = []
}

class TensorModel {
    images: any[] = []
    labels: any[] = []
}

export { DataSetModel, SetModel, TensorModel }