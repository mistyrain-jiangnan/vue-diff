import CodeDiff from "./Diff.vue";
CodeDiff.install = function (Vue) {
  Vue.component(CodeDiff.name, CodeDiff);
};
export default CodeDiff;
