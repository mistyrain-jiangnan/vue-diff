<template>
  <div id="app" style="width: 1000px">
    <button @click="getTheme">暗黑</button>
    <button @click="getFormat">分栏</button>
    <vue-diff
      :old-string="oldStr"
      :new-string="newStr"
      :context="context"
      :output-format="format"
      :draw-file-list="drawFileList"
      :render-nothing-when-empty="renderNothingWhenEmpty"
      :diff-style="diffStyle"
      :file-name="fileName"
      :language="'javascript'"
      :is-show-no-change="isShowNoChange"
      :theme="theme"
    />
  </div>
</template>

<script>
import vueDiff from "./components/Diff/Diff.vue";
import { A, B } from "./data";
export default {
  name: "App",
  components: {
    vueDiff,
  },
  data() {
    return {
      oldStr: A,
      newStr: B,
      context: 100,
      diffStyle: "word",
      isShowNoChange: false,
      drawFileList: false,
      format: "side-by-side",
      fileName: "",
      theme: "light",
      renderNothingWhenEmpty: false,
    };
  },
  methods: {
    getTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
    getFormat() {
      this.format =
        this.format === "line-by-line" ? "side-by-side" : "line-by-line";
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
