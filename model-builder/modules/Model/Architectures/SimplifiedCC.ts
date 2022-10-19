import { ModelArchitecture } from "../ModelArchitecture";

import { Sequential, sequential, layers, train } from '@tensorflow/tfjs';
import { LayerSettings } from "../../InputParameters";

export class SimplifiedCC implements ModelArchitecture {
    
    setLayerSettings(layerSettings: LayerSettings) {
    }

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

    static getDefault(): ModelArchitecture {
        return new SimplifiedCC();
    }



}