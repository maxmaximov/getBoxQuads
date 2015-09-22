window.addEventListener('DOMContentLoaded', test);

function test() {
  var node = document.getElementById('d');
  var box = node.getBoxQuads();
  //console.log(box.length, box[0], box[0].bounds);
  //console.log(document.getElementById('d').getBoxQuads({ box: 'margin' })[0].bounds.width);
}
