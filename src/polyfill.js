import { DOMPoint, DOMRect, DOMQuad, getBoxQuads, convertQuadFromNode, convertRectFromNode, convertPointFromNode } from './index';
import GeometryNode from './GeometryNode';

const globalPatches = { DOMPoint, DOMRect, DOMQuad };
const prototypePatches = { getBoxQuads, convertQuadFromNode, convertRectFromNode, convertPointFromNode };

Object.keys(globalPatches).forEach(name => {
  if (!window.hasOwnProperty(name)) {
    window[name] = globalPatches[name];
  }
});

GeometryNode.forEach(prototype => {
  Object.keys(prototypePatches).forEach(name => {
    if (!prototype.prototype.hasOwnProperty(name)) {
      prototype.prototype[name] = function (...args) {
        return prototypePatches[name](this, ...args);
      }
    }
  });
});
