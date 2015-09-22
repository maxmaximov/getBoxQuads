require('./DOMPoint');
require('./DOMRect');

/*function buildBounds(p1, p2, p3, p4) {
  return new DOMRect();
}*/

function DOMQuad() {
  if (arguments.length === 1) {
    var rect = arguments[0];

    if (!(rect instanceof DOMRect)) throw new Error();

    this.bounds = rect;

    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;

    this.p1 = new DOMPoint(x, y, 0, 1);
    this.p2 = new DOMPoint(x + width, y, 0, 1);
    this.p3 = new DOMPoint(x + width, y + height, 0, 1);
    this.p4 = new DOMPoint(x, y + height, 0, 1);
  } else {
    throw new Error('DOMPoint arguments are not implemented yet');
  }
}

window.DOMQuad = window.DOMQuad || DOMQuad;
