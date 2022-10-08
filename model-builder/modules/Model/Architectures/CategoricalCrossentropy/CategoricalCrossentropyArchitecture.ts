import { ModelArchitectureProvider } from "../../ModelArchitectureProvider";

import { Sequential, sequential, layers, train } from '@tensorflow/tfjs';

export class CategoricalCrossentropyArchitecture implements ModelArchitectureProvider {

    private kernel_size: number[] = [3, 3];
    private pool_size: [number, number] | number = [2, 2];

    private first_filters: number = 32;
    private second_filters: number = 62;
    private third_filters: number = 128;

    private dropout_conv: number = 0.3;
    private dropout_dense: number = 0.3;

    private setProperties(params: {
        kernel_size: number[],
        pool_size: [number, number] | number,
        first_filters: number,
        second_filters: number,
        third_filters: number,
        dropout_conv: number,
        dropout_dense: number,
    }) {
        this.kernel_size = params?.kernel_size || this.kernel_size;
        this.pool_size = params?.pool_size || this.pool_size;
        this.first_filters = params?.first_filters || this.first_filters;
        this.second_filters = params?.second_filters || this.second_filters;
        this.third_filters = params?.third_filters || this.third_filters;
        this.dropout_conv = params?.dropout_conv || this.dropout_conv;
        this.dropout_dense = params?.dropout_dense || this.dropout_dense;
    }

    buildModel(): Sequential {
        const model = sequential();
        model.add(layers.conv2d({
            inputShape: [96, 96, 1],
            filters: this.first_filters,
            kernelSize: this.kernel_size,
            activation: 'relu',
        }));
        model.add(layers.conv2d({
            filters: this.first_filters,
            kernelSize: this.kernel_size,
            activation: 'relu',
        }));
        model.add(layers.maxPooling2d({ poolSize: this.pool_size }));
        model.add(layers.dropout({ rate: this.dropout_conv }));

        model.add(layers.flatten());

        model.add(layers.dense({ units: 256, activation: 'relu' }));
        model.add(layers.dropout({ rate: this.dropout_dense }));
        model.add(layers.dense({ units: 5, activation: 'softmax' }));

        const optimizer = train.adam(0.0001);
        model.compile({
            optimizer: optimizer,
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        });

        return model;
    }

    static getDefault(): CategoricalCrossentropyArchitecture {
        return new CategoricalCrossentropyArchitecture();
    }

    static getWithParameters(params: {
        kernel_size: number[],
        pool_size: [number, number] | number,
        first_filters: number,
        second_filters: number,
        third_filters: number,
        dropout_conv: number,
        dropout_dense: number,
    }): CategoricalCrossentropyArchitecture {
        const architecture = new CategoricalCrossentropyArchitecture();
        architecture.setProperties(params);

        return architecture;
    }

}