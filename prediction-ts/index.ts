#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { InputParameters, ConfigModel, ConfigLoader } from './modules/InputParameters';
import * as tf from '@tensorflow/tfjs-node';
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { PredictionModel } from './modules/Prediction'

async function main() {
    const inputParams: InputParameters = commandLineArgs(InputParameters.buildClOptions());
    const config: ConfigModel = ConfigLoader.loadConfig(inputParams.configPath);

    const predictions = await predict(inputParams.inputImage, config);

    console.log(predictions);

}

async function predict(imagePath: string, config: ConfigModel): Promise<PredictionModel[]>{
    const buffer = readFileSync(imagePath);

    const imageTensor = tf.node.decodeImage(buffer, config.tensorParams.channels)
        .resizeNearestNeighbor(config.tensorParams.size)
        .toFloat()
        .div(tf.scalar(config.tensorParams.scalar))
        .expandDims();

    const absolutePath = resolve(config.modelPath);
    const model = await tf.loadLayersModel(`file://${absolutePath}`);
    let predictions = (model.predict(imageTensor) as tf.Tensor).dataSync();
    const result: PredictionModel[] = [];
    predictions.forEach((prediction, index)=>{
        const label: string = config.labelsMapping[index] || "Other";
        result.push(new PredictionModel(label, prediction));
    });

    return result;
}

main();