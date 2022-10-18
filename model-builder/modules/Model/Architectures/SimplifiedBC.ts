import { ModelArchitecture } from "../ModelArchitecture";

import { Sequential, sequential, layers, train } from '@tensorflow/tfjs';

export class SimplifiedBC implements ModelArchitecture {


    buildModel(): Sequential {
        //1
        const cnn = sequential();

        cnn.add(layers.conv2d({
            inputShape: [96, 96, 3],
            kernelSize: 5,
            filters: 8,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));
        cnn.add(layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

        // 2
        cnn.add(layers.conv2d({
            kernelSize: 5,
            filters: 16,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));
        cnn.add(layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

         // 3
        cnn.add(layers.conv2d({
            kernelSize: 5,
            filters: 32,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));
        cnn.add(layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

        cnn.add(layers.flatten());
        cnn.add(layers.dense({
            units: 5,
            kernelInitializer: 'varianceScaling',
            activation: 'softmax'
        }));

        cnn.compile({
            optimizer: train.adam(),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy'],
        });

        return cnn;
    }

    static getDefault(): ModelArchitecture {
        return new SimplifiedBC();
    }



}