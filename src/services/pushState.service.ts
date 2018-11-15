import * as qs from 'qs';

/**
 * 更新url
 * @param params
 */
const pushState = (params: Qs) => {
  const path = location.pathname + '?' + qs.stringify(params);
  history.pushState(null, '', path);
};

export default pushState;
