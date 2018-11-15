const PREFIX = 'REACT';

/**
 *
 * @param itemName
 */
const get = (itemName: string) => {
  const item = localStorage.getItem(`${PREFIX}_${itemName}`);
  try {
    return item === null ? null : JSON.parse(item);
  } catch (e) {
    return null;
  }
};

/**
 *
 * @param itemName
 * @param itemValue
 */
// tslint:disable-next-line
const set = (itemName: string, itemValue: any) => {
  localStorage.setItem(`${PREFIX}_${itemName}`, JSON.stringify(itemValue));
};

const remove = (itemName: string) => {
  localStorage.removeItem(`${PREFIX}_${itemName}`);
};

const clear = () => {
  Object.keys(localStorage).forEach(itemName => {
    const REGEXP = /^REACT_(.+)/;

    if (!REGEXP.test(itemName)) {
      return;
    }

    remove(itemName.substring(6));
  });
};

export default {
  get,
  set,
  remove,
  clear
};
