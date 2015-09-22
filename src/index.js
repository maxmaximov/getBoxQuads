require('./DOMPoint.js');

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

function getBounds(boxType, rect, margins, borders, paddings, offsetX, offsetY) {
  var bounds = {
    width: rect.width,
    height: rect.height,
    x: rect.left - offsetX,
    y: rect.top - offsetY
  };

  if (boxType === 'margin') {
    bounds.width += margins.left + margins.right;
    bounds.height += margins.top + margins.bottom;

    bounds.x -= margins.left;
    bounds.y -= margins.top;
  }

  if (boxType === 'padding') {
    bounds.width -= borders.left + borders.right;
    bounds.height -= borders.top + borders.bottom;

    bounds.x += borders.left;
    bounds.y += borders.top;
  }

  if (boxType === 'content') {
    bounds.width -= borders.left + borders.right + paddings.left + paddings.right;
    bounds.height -= borders.top + borders.bottom + paddings.top + paddings.bottom;

    bounds.x += borders.left + paddings.left;
    bounds.y += borders.top + paddings.top;
  }

  bounds.left = bounds.x;
  bounds.top = bounds.y;
  bounds.right = bounds.x + bounds.width;
  bounds.bottom = bounds.y + bounds.height;

  return bounds;
}

function buildBoxQuads(node, boxType, offsetX, offsetY) {
  var rect = node.getBoundingClientRect();
  var styles = window.getComputedStyle(node);

  var margins = getMargins(styles);
  var paddings = getPaddings(styles);
  var borders = getBorders(styles);

  var bounds = getBounds(boxType, rect, margins, borders, paddings, offsetX, offsetY);

  var p1 = new DOMPoint(bounds.left, bounds.top, 0, 1);
  var p2 = new DOMPoint(bounds.right, bounds.top, 0, 1);
  var p3 = new DOMPoint(bounds.right, bounds.bottom, 0, 1);
  var p4 = new DOMPoint(bounds.left, bounds.bottom, 0, 1);

  return {
    p1: p1, p2: p2, p3: p3, p4: p4, bounds: bounds
  };
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
