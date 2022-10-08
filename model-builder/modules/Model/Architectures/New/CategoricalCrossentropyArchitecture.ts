import { ModelArchitectureProvider } from "../../ModelArchitectureProvider";

import { Sequential, sequential, layers, train } from '@tensorflow/tfjs';

export class NewArchitecture implements ModelArchitectureProvider {

    private kernel_size: number[] = [3, 3];
    private pool_size: [number, number] | number = [2, 2];

    private first_filters: number = 64;
    private second_filters: number = 128;
    private third_filters: number = 512;

    private dropout_conv: number = 0.3;
    private dropout_dense: number = 0.3;

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

        cnn.add(layers.conv2d({
            kernelSize: 5,
            filters: 16,
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
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        });

        return cnn;
    }

    static getDefault(): NewArchitecture {
        return new NewArchitecture();
    }



}