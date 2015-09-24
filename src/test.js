import { DOMPoint, DOMRect, DOMQuad, getBoxQuads } from './index';

function test() {
  console.log(new DOMPoint());
  console.log(getBoxQuads(document.getElementById('d'), { box: 'margin' })[0].bounds);
  console.log(document.getElementById('d').getBoxQuads({ box: 'margin' })[0].bounds);
  console.log(document.getBoxQuads({ box: 'margin' })[0].bounds);

  //var node = document.getElementById('d');
  //var box = node.getBoxQuads();
  //console.log(box.length, box[0], box[0].bounds);
}

window.addEventListener('DOMContentLoaded', test);
