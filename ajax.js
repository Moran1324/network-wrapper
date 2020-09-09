function create(binName, binData) {
  return network.post({binName}, {body: binData});
}

function read(binId) {
  return network.get({binId});
}
  
function update(binId, binData) {
  return network.put({binId}, {body: binData});
}

function destroy(binId) {
  return network.delete({binId});
}
