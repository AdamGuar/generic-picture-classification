export class LayerSettings {
    firstLayer: {
        inputShape: number[],
        kernelSize: number | number[],
        filters: number,
        strides: number | number[]
        activation: 'elu' | 'hardSigmoid' | 'linear' | 'relu' | 'relu6' | 'selu' | 'sigmoid' | 'softmax' | 'softplus' | 'softsign' | 'tanh' | 'swish' | 'mish',
        kernelInitializer: string
        pooling_poolSize: number | [ number, number ],
        pooling_strides: number | [ number, number ]
    }
    middleLayers: {
        kernelSize: number | number[],
        filters: number,
        strides: number | number[],
        activation: 'elu' | 'hardSigmoid' | 'linear' | 'relu' | 'relu6' | 'selu' | 'sigmoid' | 'softmax' | 'softplus' | 'softsign' | 'tanh' | 'swish' | 'mish',
        kernelInitializer: string,
        pooling_poolSize: number | [ number, number ],
        pooling_strides: number | [ number, number ]
    }[]
    dense: {
        units: number,
        kernelInitializer: string,
        activation: 'elu' | 'hardSigmoid' | 'linear' | 'relu' | 'relu6' | 'selu' | 'sigmoid' | 'softmax' | 'softplus' | 'softsign' | 'tanh' | 'swish' | 'mish',
    }
    compile: {
        optimizer: string,
        loss: string,
        metrics: string | string[]
    }
}