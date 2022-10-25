import commandLineArgs from 'command-line-args';
import { InputParameters } from './modules/InputParameters';
import { DataProcessor } from './modules/DataProcessor/DataProcessor';


const inputParameters: InputParameters = commandLineArgs(InputParameters.buildClOptions());
const dataProcessor = new DataProcessor(inputParameters);

dataProcessor.process();