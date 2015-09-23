class DOMRect {
  //TODO Arguments need a validation
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.left = this.x = x;
    this.top = this.y = y;
    this.width = width;
    this.height = height;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
  }
}

window.DOMRect = window.DOMRect || DOMRect;
