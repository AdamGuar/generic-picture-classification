# model-builder

Application used for building TensorFlow AI models for image categorization purpose

## App structure

```
# <- Lines with this marker are author comments
|
|
│   app.ts              # app main file
│   package-lock.json
│   package.json
│   tsconfig.json
|       
├───modelParams        # example model parameters that are used for building the model
│       modelParams.json    
│       
├───modules            # application parts
│   ├───Data           # application part responsible for loading Data Sets
│   │   │   DataLoader.ts   # class responsible for loading Data Set
│   │   │   index.ts
│   │   │   
│   │   └───DataModel
│   │           DataSet.ts  # data set model class
│   │           
│   ├───Exception
│   │       AppExceptionHandler.ts  # main application exception handler
│   │       index.ts
│   │       
│   ├───InputParameters # all input parameters that user provides to the application
│   │       index.ts    
│   │       InputParameters.ts # CLI input parameters
│   │       LayerSettings.ts   # Definition of layer settings
│   │       ModelParams.ts     # Definition of model params, this contains training parameters + layers settings
│   │       
│   └───Model
│       │   index.ts
│       │   ModelArchitecture.ts # interface which describes ModelArchitecture and expose methods used by the model
│       │   
│       └───Architectures # impemnetnations of ModelArchitecture interface
│               GenericCNN.ts
│               SimplifiedBC.ts
│               SimplifiedCC.ts
│                        
└───outModel # folder for tensorflow model outputs, it contains few example models build with modelBuilder
    ├───aliens
    │       model.json
    │       weights.bin
    │       
    └───aliens2
            model.json
            weights.bin
```

## How to run it

```
node bin/app.js -d ../data-sets/aliens-humans-2 -g -m ./modelParams/modelParams.json -o ./outModel/aliens2
```

where:
* -d - points to data set used to train model. Data set needs to fit following pattern. You can use data-set-splitter tool to match this pattern:
```
/data-set
    /train
        /imageCategory1
            1imageFromCategory1.jpg/png
            2imageFromCategory1.jpg/png
        /imageCategory2
            1imageFromCategory2.jpg/png
            2imageFromCategory2.jpg/png
    /test
        /imageCategory1
            1imageFromCategory1.jpg/png
            2imageFromCategory1.jpg/png
        /imageCategory2
            1imageFromCategory2.jpg/png
            2imageFromCategory2.jpg/png
```
* -g - sets extensive logging flag to true
* -m - points to json file which defines model parameters
* -o - folder where to save model when process ends

## Model Params - example

```
{
    "training": {
        "epochs": 5,
        "validationSplit": 0.15,
        "batchSize": 4
    },
    "architecture": {
        "input": {
            "size": [300,300],
            "channels": 3,
            "scalar_transformation": 255.0,
            "label_count": 2
        },
        "architectureName": "GenericCNN",
        "layerSettings": {
            "kernelSize": 2,
            "firstLayer": {
                "inputShape": [300, 300, 3],
                "kernelSize": 5,
                "filters": 8,
                "strides": 1,
                "activation": "relu",
                "kernelInitializer": "varianceScaling",
                "pooling_poolSize": [2,2],
                "pooling_strides": [2,2]
            },
            "middleLayers": [
                {
                    "kernelSize": 5,
                    "filters": 16,
                    "strides": 1,
                    "activation": "relu",
                    "kernelInitializer": "varianceScaling",
                    "pooling_poolSize": [2,2],
                    "pooling_strides": [2,2]
                },
                {
                    "kernelSize": 5,
                    "filters": 32,
                    "strides": 1,
                    "activation": "relu",
                    "kernelInitializer": "varianceScaling",
                    "pooling_poolSize": [2,2],
                    "pooling_strides": [2,2]
                },
                {
                    "kernelSize": 5,
                    "filters": 64,
                    "strides": 1,
                    "activation": "relu",
                    "kernelInitializer": "varianceScaling",
                    "pooling_poolSize": [2,2],
                    "pooling_strides": [2,2]
                }
            ],
            "dense": {
                "units": 1,
                "kernelInitializer": "varianceScaling",
                "activation": "softmax"
            },
            "compile": {
                "optimizer": "adam",
                "loss": "binaryCrossentropy",
                "metrics": ["accuracy"]
            }
        }
    }
}
```

## How to add new model architecture

* Create new class implementing ModelArchitecture interface
* Add this class to /modules/Models/index.ts exports
* Recompile
* Point to new architecture in modelParams.json file

