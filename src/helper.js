const remove = (array, element) => {
  const index = array.indexOf(element);
  array.splice(index, 1);
};

const swapArrayElements = (array, indexA, indexB) => {
  // eslint-disable-next-line no-param-reassign,prefer-destructuring
  array[indexA] = array.splice(indexB, 1, array[indexA])[0];
};

const startsWith = (str, word) => str.toLowerCase().lastIndexOf(word.toLowerCase(), 0) === 0;

const search = (str, word) => str.toLowerCase().search(word.toLowerCase()) >= 0;

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
    width = node.clientWidth; // width with padding
    height = node.clientHeight; // height with padding
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
  remove,
  swapArrayElements,
  startsWith,
  search,
  addEventListenerWheel,
  getElementSize,
  parsePercent,
  parsePx,
};
