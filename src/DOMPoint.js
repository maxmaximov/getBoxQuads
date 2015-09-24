class DOMPoint {
  //TODO Arguments need a validation
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

const DOMPointClass = window.DOMPoint || DOMPoint;
export default DOMPointClass;
