import { DataLoader, StatsModel, TensorModel } from './modules/Data'
import path from 'path'

const dataLoader: DataLoader = new DataLoader();

dataLoader.loadData({
    trainPath: path.join('../data-sets/normalized/flowers','train'),
    testPath: path.join('../data-sets/normalized/flowers','test'),
});

const trainingSet: StatsModel = dataLoader.getTrainingStats();
const testingSet: StatsModel = dataLoader.getTestStats();
console.log(`TRAIN DATA:`);
console.log(`Number of categories: ${trainingSet.categories.length}`);

trainingSet.categories.forEach(category => {
    console.log(`Category name: ${category.categoryName}, Number of images: ${category.images.length}`);
});

console.log(`Labels: ${JSON.stringify(trainingSet.labels)}`);

console.log(`TEST DATA:`);
console.log(`Number of categories: ${testingSet.categories.length}`);

testingSet.categories.forEach(category => {
    console.log(`Category name: ${category.categoryName}, Number of images: ${category.images.length}`);
});

console.log(`Labels: ${JSON.stringify(testingSet.labels)}`);