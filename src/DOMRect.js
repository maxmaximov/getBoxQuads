function DOMRect(x, y, width, height) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 0;
  this.height = height || 0;

  this.left = this.x;
  this.top = this.y;
  this.right = this.x + this.width;
  this.bottom = this.y + this.height;
}

window.DOMRect = window.DOMRect || DOMRect;
