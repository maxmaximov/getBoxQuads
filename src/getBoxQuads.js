import DOMRect from './DOMRect';
import DOMQuad from './DOMQuad';
import GeometryNode from './GeometryNode';

const CSSBoxType = ['margin', 'border', 'padding', 'content'];

function getProps(styles, prop) {
  let props = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  Object.keys(props).forEach(side => {
    let _side = prop + side[0].toUpperCase() + side.substr(1);
    let _prop = parseFloat(styles[_side]);
    if (!isNaN(_prop)) {
      props[side] = _prop;
    }
  });

  return props;
}

function buildRect(box, rect, margins, borders, paddings, offsetX, offsetY) {
  let x = rect.left - offsetX;
  let y = rect.top - offsetY;
  let width = rect.width;
  let height = rect.height;

  if (box === 'margin') {
    x -= margins.left;
    y -= margins.top;

    width += margins.left + margins.right;
    height += margins.top + margins.bottom;
  }

  if (box === 'padding') {
    x += borders.left;
    y += borders.top;

    width -= borders.left + borders.right;
    height -= borders.top + borders.bottom;
  }

  if (box === 'content') {
    x += borders.left + paddings.left;
    y += borders.top + paddings.top;

    width -= borders.left + borders.right + paddings.left + paddings.right;
    height -= borders.top + borders.bottom + paddings.top + paddings.bottom;
  }

  return new DOMRect(x, y, width, height);
}

function buildBoxQuads(node, box, relativeTo) {
  const rect = node.getBoundingClientRect();
  const styles = window.getComputedStyle(node);
  const margins = getProps(styles, 'margin');
  const borders = getProps(styles, 'border');
  const paddings = getProps(styles, 'padding');

  let offsetX = 0;
  let offsetY = 0;

  if (relativeTo) {
    let rect = relativeTo.getBoundingClientRect();
    offsetX = rect.left;
    offsetY = rect.top;
  }

  return new DOMQuad(buildRect(box, rect, margins, borders, paddings, offsetX, offsetY));
}

export default function getBoxQuads(node, { box = 'border', relativeTo = null } = {}) {
  if (CSSBoxType.indexOf(box) === -1) throw new Error();

  if (relativeTo !== null) {
    let isGeometryNode = GeometryNode.some(Class => relativeTo instanceof Class);
    if (!isGeometryNode) throw new Error();
  }

  //TODO Are you sure about this?
  if (relativeTo === node) {
    relativeTo = null;
  } else if (relativeTo === document) {
    relativeTo = document.documentElement;
  }

  //TODO And about this?
  if (node === document) {
    node = document.documentElement;
  }

  return [buildBoxQuads(node, box, relativeTo)];
};
