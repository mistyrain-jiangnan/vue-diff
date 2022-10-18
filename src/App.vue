<template>
  <div id="app">
    <vue-diff
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
  </div>
</template>
<script>
import VueDiff from "vue-code-map-diff";
import { A, B } from "./data";
export default {
  name: "App",
  components: {
    VueDiff,
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
  methods: {},
  computed: {},
};
</script>
