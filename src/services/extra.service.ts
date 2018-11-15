/**
 * 判断是否为对象
 *
 * @param {any} obj
 * @returns {boolean}
 */
Object.isObject = obj => {
  return obj !== null && !Array.isArray(obj) && typeof obj === 'object';
};

/**
 * 判断对象是否为空对象
 *
 * @param {any} obj
 * @returns {boolean}
 */
Object.isEmpty = obj => {
  if (!Object.isObject(obj)) {
    return false;
  }

  return Object.keys(obj).length === 0;
};

/**
 * 对象浅比对
 *
 * @param {any} src 源对象
 * @param {any} dist 目标对象
 * @returns {boolean}
 */
Object.isEqual = (src, dist) => {
  if (!Object.isObject(src) || !Object.isObject(dist)) {
    return false;
  }

  let flag = true;

  Object.keys(src).forEach(k => {
    if (src[k] !== dist[k]) {
      flag = false;
    }
  });

  return flag;
};
