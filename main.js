// fix: dont load metadata
// fix: handle prompt cancellation gracefully
function loadBin() {
  resetError();
  const binId = prompt("binId"); // todo later: ask and load by bin name and not id
  read(binId).then(binJson => {
    document.querySelector("#view > textarea").value = JSON.stringify(binJson.record);
  }).catch(displayError);
}

function newBin() {
  // todo later: confirm() wether to delete unsaved work
  const binName = prompt("bin name"); // todo later: replace prompt with querying an <input>
  const initialData = { hello: "world" };

  resetError();

  create(binName, initialData)
  .then(binData => {
    document.querySelector("#view > textarea").value = JSON.stringify(binData.record)
    document.getElementById("metadata").innerText = binData.metadata.id;
  })
  .catch(displayError);
}

function saveBin() {
  const binId = document.getElementById("metadata").innerText;
  const binData = document.querySelector("#view > textarea").value; // exercise: use "object destructuring with alias"
  resetError();
  update(binId, JSON.parse(binData)).catch(displayError);  
}

function deleteBin() {
  const binId = document.getElementById("metadata").innerText;
  resetError();
  destroy(binId).catch(displayError);
}

function resetError() {
  document.querySelector("#error").hidden = true;
}

function displayError(error) {
  document.querySelector("#error").hidden = false;
  document.querySelector("#error").innerText = error;
}
