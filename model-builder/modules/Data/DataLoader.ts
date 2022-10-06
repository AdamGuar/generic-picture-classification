import { DataSetModel, SetModel, TensorModel } from './Model/DataSet'
import fs from 'fs';
import path from 'path';

import tf from '@tensorflow/tfjs-node-gpu';

export class DataLoader {
    private train: SetModel = new SetModel();
    private test: SetModel = new SetModel();

    private trainTensor: TensorModel = new TensorModel();
    private testTensor: TensorModel = new TensorModel();

    loadData(params: { trainPath: string, testPath: string }): void {
        const trainDir = fs.readdirSync(params.trainPath);

        trainDir.forEach((category, index) => {
            const categoryDir = fs.readdirSync(path.join(params.trainPath, category));
            const categoryObj = { categoryName: category, images: [] };

            categoryDir.forEach(fileInCategory => {
                categoryObj.images.push(fileInCategory);
                const buffer = fs.readFileSync(path.join(params.trainPath, category, fileInCategory));
                const imageTensor = tf.node.decodeImage(buffer)
                    .resizeNearestNeighbor([96, 96])
                    .toFloat()
                    .div(tf.scalar(255.0))
                    .expandDims();
                this.trainTensor.images.push(imageTensor);
            });

            this.train.categories.push(categoryObj);

            this.train.labels.push({
                labelName: category,
                labelId: index
            })
        });

        const testDir = fs.readdirSync(params.testPath);
        testDir.forEach((category, index) => {
            const categoryDir = fs.readdirSync(path.join(params.testPath, category));
            const categoryObj = { categoryName: category, images: [] };

            categoryDir.forEach(fileInCategory => {
                categoryObj.images.push(fileInCategory);
            });

            this.test.categories.push(categoryObj);

            this.test.labels.push({
                labelName: category,
                labelId: index
            })
        });

    }

    getTrainingSet(): SetModel {
        return this.train;
    };

    getTestSet(): SetModel {
        return this.test;
    }
}