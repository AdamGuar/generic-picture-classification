# predictions-ts

TypeScript application for running predictions for provided image categorization model

## How it works

Running application with following parameters

```
bin/index.js -i ./imagesExample/kosmita.JPG -c ./configExample/config.json
```

where:
* -i - image to categorize
* -c - config file

where config file looks like this:
```
{
    "tensorParams": {
        "size": [300,300],
        "channels": 3,
        "scalar": 255.0
    },
    "modelPath": "./modelExample/model.json",
    "labelsMapping": ["alien", "human"]
}
```

where:
* tensorParams - describe dimensions to which input image will be converted to fit trained model
* modelPath - model which will be used for image categorization
* labelsMapping - array which map label indexes from model to human readable categories

## Setting a CLI

To have CLI reference in you shell you need to run
```
npm link
```

command

## Using as a library:

Use `predict(imagePath: string, config: ConfigModel)` method from index.ts to get the prediction results