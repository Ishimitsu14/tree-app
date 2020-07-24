const addEventListenerWheel = (element, callback) => {
  if (element.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      element.addEventListener('wheel', callback);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      element.addEventListener('mousewheel', callback);
    } else {
      // Firefox < 17
      element.addEventListener('MozMousePixelScroll', callback);
    }
  }
};

const getElementSize = (node) => {
  let width = null; // width with padding
  let height = null; // height with padding
  if (node) {
    // const computedStyle = getComputedStyle(node);

    width = node.clientWidth; // width with padding
    height = node.clientHeight; // height with padding
    // if (width && height) {
    //   if (!withY) {
    //     height -= parseFloat(computedStyle.paddingTop)
    //       + parseFloat(computedStyle.paddingBottom);
    //   }
    //   if (!withX) {
    //     width -= parseFloat(computedStyle.paddingLeft)
    //       + parseFloat(computedStyle.paddingRight);
    //   }
    // }
  }

  return { height, width };
};

const parsePx = (value) => {
  if (typeof (value) === 'string') {
    if (value === '0') {
      return 0;
    }
    return parseFloat(value.slice(0, -1));
  }
  if (typeof (value) === 'number') {
    return `${value}px`;
  }
  return value;
};

const parsePercent = (value) => {
  if (typeof (value) === 'string') {
    if (value === '0') {
      return 0;
    }
    return parseFloat(value.slice(0, -1));
  }
  if (typeof (value) === 'number') {
    return `${value}%`;
  }
  return value;
};

export default {
  addEventListenerWheel,
  getElementSize,
  parsePercent,
  parsePx,
};
