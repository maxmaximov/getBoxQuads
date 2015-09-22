(function() {
  if (Element.prototype.getBoxQuads) return;

  var CSSBoxType = ["margin", "border", "padding", "content"];

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

  function getBounds(boxType, rect, margins, borders, paddings) {
    var bounds = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    };

    if (boxType === 'margin') {
      bounds.width += margins.left + margins.right;
      bounds.height += margins.top + margins.bottom;

      bounds.left -= margins.left;
      bounds.top -= margins.top;
    }

    if (boxType === 'padding') {
      bounds.width -= borders.left + borders.right;
      bounds.height -= borders.top + borders.bottom;

      bounds.left += borders.left;
      bounds.top += borders.top;
    }

    if (boxType === 'content') {
      bounds.width -= borders.left + borders.right + paddings.left + paddings.right;
      bounds.height -= borders.top + borders.bottom + paddings.top + paddings.bottom;

      bounds.left += borders.left + paddings.left;
      bounds.top += borders.top + paddings.top;
    }

    bounds.x = bounds.left;
    bounds.y = bounds.top;

    return bounds;
  }

  Element.prototype.getBoxQuads = function (opts) {
      opts = opts || {};
      var boxType = opts.box || 'border';
      var element = this;

      function patch(rect) {
        var styles = window.getComputedStyle(element);

        var margins = getMargins(styles);
        var paddings = getPaddings(styles);
        var borders = getBorders(styles);

        var bounds = getBounds(boxType, rect, margins, borders, paddings);

        var p1 = { x: bounds.x, y: bounds.y, z: 0, w: 1 };
        var p2 = { x: bounds.x + bounds.width, y: bounds.y, z: 0, w: 1 };
        var p3 = { x: bounds.x + bounds.width, y: bounds.y + bounds.height, z: 0, w: 1 };
        var p4 = { x: bounds.x, y: bounds.y + bounds.height, z: 0, w: 1 };

        return {
          p1: p1, p2: p2, p3: p3, p4: p4, bounds: bounds
        };
      }

      return Array.from(this.getClientRects()).map(patch);
  };
})();
