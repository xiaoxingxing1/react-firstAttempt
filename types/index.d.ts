declare module 'bizcharts';
declare module 'react-date-range';
declare module 'rc-tween-one';
declare module 'rc-drawer-menu';
declare module 'rc-queue-anim'
/** 加载进度 */
interface Loading {
  [key: string]: boolean;
}

interface infosVal {
  value: string,
  label: string,
  key: string
}

/** 字典 */
interface Dict {
  code: string|number;
  name: string;
}

/** 查询条件 */
interface Qs {
  [key: string]: number|string|string[]|boolean
}

/** Object扩展方法 */
interface Object {
  isObject: (obj: any) => boolean;
  isEmpty: (obj: any) => boolean;
  isEqual: (src: any, dist: any) => boolean;
}

/** 通用模态对话框参数 */
interface ModalOpts {
  id?: null | number;
  title?: null | string;
  visible?: boolean;
  type?: null | string;
  treeData? : any;
  visitType? : null | string;
  groupId? : any;
  //psq增加的
  idType?: any |string;
}

/** 侧边栏菜单 */
interface MenuData {
  name: string;
  icon?: string;
  path?: string;
  children?: MenuData[];
  component?: any;
}
