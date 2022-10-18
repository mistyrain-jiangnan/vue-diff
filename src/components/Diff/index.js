import CodeDiff from "./Diff";
CodeDiff.install = (Vue) => Vue.component(CodeDiff.name, CodeDiff);
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(CodeDiff);
}
export default CodeDiff;
