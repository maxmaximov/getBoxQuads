import './DOMPoint';
import './DOMRect';

/*function buildBounds(p1, p2, p3, p4) {
  return new DOMRect();
}*/

class DOMQuad {
  constructor(rect, ...rest) {
    if (rest.length) {
      throw new Error('DOMQuad constructor: "A work with DOMPoint arguments are not implemented yet"');
    } else if (!rect) {
      throw new Error('DOMQuad constructor: "I need more arguments"');
    } else if (!(rect instanceof DOMRect)) {
      throw new Error('DOMQuad constructor: "A rect should be an instance of the DOMRect class"');
    } else {
      this.bounds = rect;

      //TODO redesign this shit
      let { x, y, width, height } = rect;

      this.p1 = new DOMPoint(x, y, 0, 1);
      this.p2 = new DOMPoint(x + width, y, 0, 1);
      this.p3 = new DOMPoint(x + width, y + height, 0, 1);
      this.p4 = new DOMPoint(x, y + height, 0, 1);
    }
  }
}

window.DOMQuad = window.DOMQuad || DOMQuad;
