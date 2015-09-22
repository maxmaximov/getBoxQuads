function DOMPoint(x, y, z, w) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w || 1;
}

window.DOMPoint = window.DOMPoint || DOMPoint;
