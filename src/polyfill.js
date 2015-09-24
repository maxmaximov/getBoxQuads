import DOMPoint from './DOMPoint';
import DOMRect from './DOMRect';
import DOMQuad from './DOMQuad';
import getBoxQuads from './getBoxQuads';

const patches = { DOMPoint, DOMRect, DOMQuad };

Object.keys(patches).forEach(name => {
  if (!window.hasOwnProperty(name)) {
    window[name] = patches[name];
  }
});

if (!Element.prototype.getBoxQuads) {
  Element.prototype.getBoxQuads = function (...args) {
    return getBoxQuads(this, ...args);
  }
}
