export default class Utils {
  static get baseUrl() {
    const inDev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;
    return inDev ? DEV_URL : PROD_URL;
  }
}
