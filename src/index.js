require('./DOMPoint');
require('./DOMRect');
require('./DOMQuad');

var CSSBoxType = ["margin", "border", "padding", "content"];
var GeometryNode = [Document, Element, Text];

function getProps(styles, prop) {
  var props = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  Object.keys(props).forEach(function (side) {
    var _side = prop + side[0].toUpperCase() + side.substr(1);
    var _prop = parseFloat(styles[_side]);
    if (!isNaN(_prop)) {
      props[side] = _prop;
    }
  });

  return props;
}

function getMargins(styles) {
  return getProps(styles, 'margin');
}

function getBorders(styles) {
  return getProps(styles, 'border');
}

function getPaddings(styles) {
  return getProps(styles, 'padding');
}

function buildRect(boxType, rect, margins, borders, paddings, offsetX, offsetY) {
  var x = rect.left - offsetX;
  var y = rect.top - offsetY;
  var width = rect.width;
  var height = rect.height;

  if (boxType === 'margin') {
    x -= margins.left;
    y -= margins.top;

    width += margins.left + margins.right;
    height += margins.top + margins.bottom;
  }

  if (boxType === 'padding') {
    x += borders.left;
    y += borders.top;

    width -= borders.left + borders.right;
    height -= borders.top + borders.bottom;
  }

  if (boxType === 'content') {
    x += borders.left + paddings.left;
    y += borders.top + paddings.top;

    width -= borders.left + borders.right + paddings.left + paddings.right;
    height -= borders.top + borders.bottom + paddings.top + paddings.bottom;
  }

  return new DOMRect(x, y, width, height);
}

function buildBoxQuads(node, boxType, offsetX, offsetY) {
  var rect = node.getBoundingClientRect();
  var styles = window.getComputedStyle(node);

  var margins = getMargins(styles);
  var paddings = getPaddings(styles);
  var borders = getBorders(styles);

  return new DOMQuad(buildRect(boxType, rect, margins, borders, paddings, offsetX, offsetY));
}

function getBoxQuads(opts) {
  opts = opts || {};

  var boxType = opts.box || 'border';
  var relativeTo = opts.relativeTo || null;

  if (CSSBoxType.indexOf(boxType) === -1) throw new Error();

  if (relativeTo !== null) {
    var isGeometryNode = GeometryNode.some(function (Class) {
      return relativeTo instanceof Class;
    });

    if (!isGeometryNode) throw new Error();
  }

  if (relativeTo === this) {
    relativeTo = null;
  }

  var offsetX = 0;
  var offsetY = 0;
  var relativeRect;

  if (relativeTo) {
    relativeRect = relativeTo.getBoundingClientRect();
    offsetX = relativeRect.left;
    offsetY = relativeRect.top;
  }

  return [buildBoxQuads(this, boxType, offsetX, offsetY)];
};

Element.prototype.getBoxQuads = Element.prototype.getBoxQuads || getBoxQuads;
