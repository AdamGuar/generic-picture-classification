import { DataLoader, StatsModel, TensorModel } from './modules/Data'
import path from 'path'

import ts from '@tensorflow/tfjs';

import { ModelArchitectureProvider, CategoricalCrossentropyArchitecture } from './modules/Model';


async function main() {
    const dataLoader: DataLoader = new DataLoader();

    dataLoader.loadData({
        trainPath: path.join('../data-sets/normalized-small/flowers', 'train'),
        testPath: path.join('../data-sets/normalized-small/flowers', 'test'),
    });

    const trainingSet: StatsModel = dataLoader.getTrainingStats();
    const testingSet: StatsModel = dataLoader.getTestStats();
    console.log(`TRAIN DATA:`);
    console.log(`Number of categories: ${trainingSet.categories.length}`);

    trainingSet.categories.forEach(category => {
        console.log(`Category name: ${category.categoryName}, Number of images: ${category.images.length}`);
    });

    console.log(`Labels: ${JSON.stringify(trainingSet.labels)}`);

    console.log(`TEST DATA:`);
    console.log(`Number of categories: ${testingSet.categories.length}`);

    testingSet.categories.forEach(category => {
        console.log(`Category name: ${category.categoryName}, Number of images: ${category.images.length}`);
    });

    console.log(`Labels: ${JSON.stringify(testingSet.labels)}`);

    console.log(`Getting model architecure...`);

    const modelitectureProvider: ModelArchitectureProvider = CategoricalCrossentropyArchitecture.getDefault();

    const model: ts.Sequential = modelitectureProvider.buildModel();
    console.log(`Model architecture ready!`)
    model.summary();

    const validationSplit = 0.15;

    console.log('Model fitting with training tensor...');
    const trainingTensor = dataLoader.getTrainingTensor();

   // try {
        await model.fit(trainingTensor.images, trainingTensor.labels, {
            epochs: 2,
            batchSize: 2,
            validationSplit
        });

        console.log('Fitting done. Evaluating model with test tensor');
        const testTensor = dataLoader.getTestTensor();
        const evalOutput = model.evaluate(testTensor.images, testTensor.labels);

        console.log(
            `\nEvaluation result:\n` +
            `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
            `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

        await model.save(`file://./outModel/model`);
        console.log(`Saved model to path: ./outModel/model`);
  /*  } catch (error) {
        console.log(`Unable to train model, reason: ${error}}`);
    }
    */
}

main();