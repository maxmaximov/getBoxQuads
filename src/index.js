import DOMPoint from './DOMPoint';
import DOMRect from './DOMRect';
import DOMQuad from './DOMQuad';
import getBoxQuads from './getBoxQuads';

function notImplementedYet() {
  throw new Error(`Not implemented yet`);
}

const convertQuadFromNode = notImplementedYet;
const convertRectFromNode = notImplementedYet;
const convertPointFromNode = notImplementedYet;

export default { DOMPoint, DOMRect, DOMQuad, getBoxQuads, convertQuadFromNode, convertRectFromNode, convertPointFromNode }
