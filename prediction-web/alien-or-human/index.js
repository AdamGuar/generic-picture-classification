const reader = new FileReader();

const fileInput = document.getElementById("imgSelection");
const img = document.getElementById("imgPlaceholder");


const resultBlock = document.getElementById("resultBlock");
const resultOut = document.getElementById("resultOut");

function clearResult() {
  resultBlock.style.display = 'none';
}

function setResult(label, score) {
  resultOut.textContent = `I am ${score} % sure that its ${label.toUpperCase()}`;
  resultBlock.style.display = 'block';
}

reader.onload = e => {
  img.src = e.target.result;
  document.getElementById('predictButton').style.display = 'inline-block'
}

fileInput.addEventListener('change', e => {
  const f = e.target.files[0];
  reader.readAsDataURL(f);
  clearResult();
})

var model;

const delay = ms => new Promise(res => setTimeout(res, ms));

document.addEventListener('DOMContentLoaded', async function () {
  model = await tf.loadLayersModel('model/model.json');
  await delay(2000);
  document.getElementById('modelLoader').style.display = 'none'
}, false);

document.getElementById('predictButton').onclick = async function(){

  document.getElementById('resultLoader').style.display = 'block';

  let tensor = tf.browser.fromPixels(img, 3)
		.resizeNearestNeighbor([96,96]) // change the image size here
		.toInt()
		.div(tf.scalar(255.0))
		.expandDims()

  let predictions = await model.predict(tensor).data();

  const categoryMappingsResponse = await fetch('./model/category_mappings.json');
  const categoryMappings = await categoryMappingsResponse.json();


  const scores = categoryMappings.map((category, index) => {
    return {
      label: category,
      score: predictions[index]
    }
  }).sort((a,b) => b.score - a.score);

  document.getElementById('resultLoader').style.display = 'none';
  setResult(scores[0].label, scores[0].score);
  console.log(scores);
};

