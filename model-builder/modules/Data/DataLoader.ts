import { FlattenedTensor, StatsModel, TensorModel } from './DataModel/DataSet'
import fs from 'fs';
import path from 'path';

import { node, scalar, concat, oneHot, tensor1d } from '@tensorflow/tfjs-node-gpu';

export class DataLoader {

    private trainStats: StatsModel = new StatsModel();
    private testStats: StatsModel = new StatsModel();

    private trainTensor: TensorModel = new TensorModel();
    private testTensor: TensorModel = new TensorModel();

    loadData(params: { trainPath: string, testPath: string }): void {

        this.trainStats = this.loadStats(params.trainPath);
        this.testStats = this.loadStats(params.testPath)

        if(!this.areLabelsLengthValid) {
            throw {
                message: 'Validation error on data loading',
                detail: 'Labels taken from training directory not equal to labels from test directory'
            }
        }

        this.trainTensor = this.loadTensorData(params.trainPath);
        this.testTensor = this.loadTensorData(params.testPath);
    }

    private areLabelsLengthValid(): boolean {
        return this.trainStats.labels === this.testStats.labels;
    }

    private loadStats(dataPath: string): StatsModel {
        const data: StatsModel = new StatsModel();
        const categoriesList = fs.readdirSync(dataPath);

        categoriesList.forEach((category, index) => {
            const categoryDir = fs.readdirSync(path.join(dataPath, category));
            const categoryObj = { categoryName: category, images: []};

            categoryDir.forEach(fileInCategory => {
                categoryObj.images.push(fileInCategory);
            });

            const label = { labelName: category, labelId: index };
            data.categories.push(categoryObj);
            data.labels.push(label);
        });

        return data;
    }

    private loadTensorData(dataPath: string): TensorModel {
        const data: TensorModel = new TensorModel();
        const categoriesList = fs.readdirSync(dataPath);

        categoriesList.forEach((category, index) => {
            const categoryDir = fs.readdirSync(path.join(dataPath, category));
            categoryDir.forEach(fileInCategory => {
                const buffer = fs.readFileSync(path.join(dataPath, category, fileInCategory));
                const imageTensor = node.decodeImage(buffer)
                    .resizeNearestNeighbor([96, 96])
                    .toFloat()
                    .div(scalar(255.0))
                    .expandDims();
                data.images.push(imageTensor);
                data.labels.push(index);
            });
        });

        return data;
    }

    private flattenTensor(tensor: TensorModel): FlattenedTensor {
        return {
            images: concat(tensor.images),
            labels: oneHot(tensor1d(tensor.labels, 'int32'), 5).toFloat()
        }
    }

    getTrainingTensorFlattened(): FlattenedTensor {
        return this.flattenTensor(this.trainTensor);
    };

    getTestTensorFlattened(): FlattenedTensor {
        return this.flattenTensor(this.testTensor);
    }

    getTrainingStats(): StatsModel {
        return this.trainStats;
    };

    getTestStats(): StatsModel {
        return this.testStats;
    }
}