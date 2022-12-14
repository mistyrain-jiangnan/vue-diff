import CodeDiff from "./Diff/index.js";
const components = [CodeDiff];
// eslint-disable-next-line no-unused-vars
const install = function (Vue, opts = {}) {
  if (install.installed) return;
  components.map((component) => {
    Vue.component(component.name, component);
  });
};
/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  CodeDiff,
};
