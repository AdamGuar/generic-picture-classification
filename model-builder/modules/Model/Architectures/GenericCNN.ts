import { ModelArchitecture } from "../ModelArchitecture";
import { LayerSettings } from "../../InputParameters";

import { Sequential, sequential, layers, train } from '@tensorflow/tfjs';

export class GenericCNN implements ModelArchitecture {

    private layerSettings: LayerSettings;

    setLayerSettings(layerSettings: LayerSettings): void {
        this.layerSettings = layerSettings;
    }

    buildModel(): Sequential {

        const cnn = sequential();

        cnn.add(layers.conv2d({
            inputShape: this.layerSettings.firstLayer.inputShape,
            kernelSize: this.layerSettings.kernelSize,
            filters: this.layerSettings.firstLayer.filters,
            strides: this.layerSettings.firstLayer.strides,
            activation: this.layerSettings.firstLayer.activation,
            kernelInitializer: this.layerSettings.firstLayer.kernelInitializer
        }));
        cnn.add(layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

        this.layerSettings.middleLayers.forEach(layer=>{
            cnn.add(layers.conv2d({
                kernelSize: this.layerSettings.kernelSize,
                filters: layer.filters,
                strides: layer.strides,
                activation: layer.activation,
                kernelInitializer: layer.kernelInitializer
            }));
            cnn.add(layers.maxPooling2d({ poolSize: layer.pooling_poolSize, strides: layer.pooling_strides }));
        });

        cnn.add(layers.flatten());
        cnn.add(layers.dense({
            units: this.layerSettings.kernelSize,
            kernelInitializer: this.layerSettings.dense.kernelInitializer,
            activation: this.layerSettings.dense.activation
        }));

        cnn.compile({
            optimizer: this.layerSettings.compile.optimizer,
            loss: this.layerSettings.compile.loss,
            metrics: this.layerSettings.compile.metrics
        });

        return cnn;
    }

    static getDefault(): ModelArchitecture {
        return new GenericCNN();
    }


}