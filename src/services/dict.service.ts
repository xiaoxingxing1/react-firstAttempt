export interface Dict {
  code: string | number;
  name: string;
}
/**
 * 获取字典名称
 * @param {*} dicts 字典数组
 * @param {*} code 字典编码
 */
const filter = (dicts: Dict[], code: string | number) => {
  if (!Array.isArray(dicts) || dicts.length === 0) {
    return '';
  }

  const dict = dicts.find(d => d.code === code);

  return dict ? dict.name : '';
};

/**
 * 将字典对象转换为字典数组
 */

const obj2arr = (dictObj: { [key: string]: string }) => {
  return Object.keys(dictObj).map(key => ({
    code: key,
    name: dictObj[key]
  }));
};

export default { filter, obj2arr };
