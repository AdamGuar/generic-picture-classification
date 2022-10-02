import { InputParameters } from "../InputParameters"
import { DataResponse } from "./DataResponse";
import fs from 'fs';
import path from 'path';

export class DataProcessor { 
    private inputParameters: InputParameters;

    constructor(inputParameters: InputParameters) {
        this.inputParameters = inputParameters;
    }

    public process(): DataResponse {
        console.log(this.inputParameters);
        this.validateInputs();
        const categories = fs.readdirSync(this.inputParameters.dataSetPath);
        const baseName = path.basename(this.inputParameters.dataSetPath);
        const normalizedPath = path.join(this.inputParameters.normalizedOut, baseName);
        console.log(normalizedPath);
        categories.forEach(category=> {
            const categoryList = fs.readdirSync(path.join(this.inputParameters.dataSetPath,category));
            const numberOfElementsToTrainingSet = Math.floor(categoryList.length * (this.inputParameters.trainingSetPercent / 100));
            console.log(`[${category}]: total: ${categoryList.length}, number to pick to training: ${numberOfElementsToTrainingSet}`);

            const selected = categoryList.sort(() => 0.5 - Math.random()).slice(0, numberOfElementsToTrainingSet);
            console.log(selected.length);

            fs.mkdirSync(path.join(normalizedPath, 'test', category), { recursive: true });
            fs.mkdirSync(path.join(normalizedPath, 'train', category), { recursive: true });

            const copyingDetails = categoryList.map(element=> {
                const subCategory = selected.indexOf(element) !== -1 ? 'test' : 'train';
                return {
                    from: path.join(this.inputParameters.dataSetPath, category, element),
                    to: path.join(normalizedPath, subCategory, category, element),
                }
            });
            copyingDetails.forEach(element=> {
                fs.copyFileSync(element.from, element.to);
            });
        });

        return new DataResponse();
    }

    private validateInputs() {
        let categories;
        try {
            categories = fs.readdirSync(this.inputParameters.dataSetPath);
        } catch(err) {};

        if(!categories || categories.length <= 1 ) {
            throw {
                message: 'Something wrong with your input data',
                details: 'Check data set directory, it needs to exist and have more than 1 category'
            }
        }

        if(this.inputParameters.trainingSetPercent < 0 || this.inputParameters.trainingSetPercent > 100 ) {
            throw {
                message: 'Something wrong with your input data',
                details: 'Check training set percantage, it needs to be within 0-100 range'
            }
        } 
    }

}