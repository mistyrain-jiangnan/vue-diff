<template>
  <div id="app">
    <template>
      <code-diff
        :old-string="oldStr"
        :new-string="newStr"
        :context="context"
        :output-format="format"
        :draw-file-list="drawFileList"
        :render-nothing-when-empty="renderNothingWhenEmpty"
        :diff-style="diffStyle"
        :file-name="fileName"
        :language="'json'"
        :is-show-no-change="isShowNoChange"
        :theme="theme"
      />
    </template>
  </div>
</template>
<script>
import { A, B } from "./data";
export default {
  name: "App",
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
  methods: {},
  computed: {},
};
</script>
