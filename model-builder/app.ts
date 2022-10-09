import commandLineArgs from 'command-line-args'
import ts from '@tensorflow/tfjs';
import waitForUserInput from 'wait-for-user-input';

import { DataLoader, StatsModel } from './modules/Data'
import { ModelArchitectureProvider, CategoricalCrossentropyArchitecture, SimplifiedCC } from './modules/Model';
import { InputParameters, FittingsParams } from './modules/InputParameters';
import { AppExceptionHandler } from './modules/Exception'



async function main() {

    const options: InputParameters = commandLineArgs(InputParameters.buildClOptions());

    const dataLoader: DataLoader = new DataLoader();

    dataLoader.loadData({
        trainPath: InputParameters.getTrainingSetPath(options),
        testPath: InputParameters.getTestSetPath(options),
    });


    if (options.enhancedLogging) {
        const trainingSet: StatsModel = dataLoader.getTrainingStats();
        const testingSet: StatsModel = dataLoader.getTestStats();
        logStats(trainingSet, testingSet);
    }


    console.log(`Getting model architecure...`);
    const modelitectureProvider: ModelArchitectureProvider = SimplifiedCC.getDefault();

    const model: ts.Sequential = modelitectureProvider.buildModel();
    console.log(`Model architecture ready, Selected architecture: ${JSON.stringify(typeof (modelitectureProvider))}`);

    if (options.enhancedLogging) model.summary();

    const trainingTensor = dataLoader.getTrainingTensorFlattened();

    if (options.interactiveMode) await waitForUserInput('Click any key to start fitting the model');

    const fittingParams = FittingsParams.loadFromFile(options.fittingParams);

    console.log(`Model will be trained using following parameters: Epochs: ${fittingParams.epochs}, BatchSize: ${fittingParams.batchSize}, ValidationSplit: ${fittingParams.validationSplit}}`)


    await model.fit(trainingTensor.images, trainingTensor.labels, {
        epochs: fittingParams.epochs,
        batchSize: fittingParams.batchSize,
        validationSplit: fittingParams.validationSplit
    });

    console.log('Fitting done. Evaluating model with test tensor');
    const testTensor = dataLoader.getTestTensorFlattened();
    const evalOutput = model.evaluate(testTensor.images, testTensor.labels);

    console.log(
        `\nEvaluation result:\n` +
        `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
        `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

    await model.save(`file://${options.modelOut}`);
    console.log(`Saved model to path: ${options.modelOut}`);
}

function logStats(trainingSet: StatsModel, testingSet: StatsModel): void {
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
}

try {
    main();
} catch (err) {
    AppExceptionHandler.hadnleAppException(err);
}