<template>
  <div class="">
    <canvas id="map"></canvas>
    <div class="vue-diff" :class="classes">
      <div v-highlight v-html="html" />
    </div>
  </div>
</template>

<script>
import pageMap from "./pagemap";
import { createPatch } from "diff";
import * as Diff2Html from "diff2html";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";
import "diff2html/bundles/css/diff2html.min.css";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import scss from "highlight.js/lib/languages/scss";
import less from "highlight.js/lib/languages/less";
import stylus from "highlight.js/lib/languages/stylus";
import shell from "highlight.js/lib/languages/shell";
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import go from "highlight.js/lib/languages/go";
import xml from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import sql from "highlight.js/lib/languages/sql";
import ruby from "highlight.js/lib/languages/ruby";
import vim from "highlight.js/lib/languages/vim";
import php from "highlight.js/lib/languages/php";
import perl from "highlight.js/lib/languages/perl";
import powershell from "highlight.js/lib/languages/powershell";
import makefile from "highlight.js/lib/languages/makefile";
[
  { lang: "java", mod: java },
  { lang: "javascript", mod: javascript },
  { lang: "json", mod: json },
  { lang: "css", mod: css },
  { lang: "scss", mod: scss },
  { lang: "less", mod: less },
  { lang: "stylus", mod: stylus },
  { lang: "shell", mod: shell },
  { lang: "bash", mod: bash },
  { lang: "cpp", mod: cpp },
  { lang: "go", mod: go },
  { lang: "xml", mod: xml },
  { lang: "python", mod: python },
  { lang: "typescript", mod: typescript },
  { lang: "sql", mod: sql },
  { lang: "ruby", mod: ruby },
  { lang: "vim", mod: vim },
  { lang: "php", mod: php },
  { lang: "perl", mod: perl },
  { lang: "powershell", mod: powershell },
  { lang: "makefile", mod: makefile },
].forEach((item) => {
  hljs.registerLanguage(item.lang, item.mod);
});
export default {
  name: "CodeDiff",
  directives: {
    highlight: function (el) {
      const blocks = el.querySelectorAll("code");
      blocks.forEach((block) => {
        hljs.highlightBlock(block);
      });
    },
  },
  props: {
    oldString: {
      type: String,
      default: "",
    },
    newString: {
      type: String,
      default: "",
    },
    context: {
      type: Number,
      default: 5,
    },
    outputFormat: {
      type: String,
      default: "side-by-side",
    },
    drawFileList: {
      type: Boolean,
      defalut: false,
    },
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false,
    },
    diffStyle: {
      type: String,
      default: "word",
    },
    fileName: {
      type: String,
      default: "",
    },
    isShowNoChange: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      required: true,
      default: "javascript",
    },
    // 外部设置的 class name
    extCls: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "light",
      validator: (value) => {
        return ["light", "dark"].includes(value);
      },
    },
  },
  mounted() {
    this.initMiniMap();
  },
  computed: {
    html() {
      return this.createdHtml(
        this.oldString,
        this.newString,
        this.context,
        this.outputFormat,
        this.drawFileList,
        this.renderNothingWhenEmpty,
        this.fileName,
        this.isShowNoChange,
        this.diffStyle
      );
    },
    classes() {
      return [this.theme, this.extCls, `format-${this.outputFormat}`];
    },
  },
  watch: {
    language: {
      handler(language) {
        hljs.configure({
          languages: [language],
        });
        console.log(hljs);
      },
      immediate: true,
    },
    outputFormat: function () {
      this.reInitMiniMap();
    },
  },
  methods: {
    createdHtml(
      oldString,
      newString,
      context,
      outputFormat,
      drawFileList,
      renderNothingWhenEmpty,
      fileName,
      isShowNoChange,
      diffStyle
    ) {
      function hljs(html) {
        return html.replace(
          /<span class="d2h-code-line-ctn">(.+?)<\/span>/g,
          '<span class="d2h-code-line-ctn"><code>$1</code></span>'
        );
      }
      if (isShowNoChange) {
        oldString =
          "File Without Change\tOldString: ======================== \n" +
          oldString;
        newString =
          "File Without Change\tNewString: ======================== \n" +
          newString;
      }
      const args = [
        fileName,
        oldString,
        newString,
        "",
        "",
        { context: context },
      ];
      const dd = createPatch(...args);
      console.log(outputFormat);
      const outStr = Diff2Html.parse(dd, {
        inputFormat: "diff",
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        diffStyle: diffStyle,
        matching: "word",
        renderNothingWhenEmpty: renderNothingWhenEmpty,
      });
      const html = Diff2Html.html(outStr, {
        inputFormat: "json",
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        diffStyle: diffStyle,
        matching: "word",
        renderNothingWhenEmpty: renderNothingWhenEmpty,
      });
      return hljs(html);
    },
    initMiniMap() {
      pageMap(document.querySelector("#map"), {
        viewport: document.querySelector("#vue-diff"),
        styles: {
          "td.d2h-change.d2h-del": "rgba(255, 0, 0, 0.4)",
          "td.d2h-change.d2h-del del": "rgba(255, 0, 0, 1)",
          "td.d2h-change.d2h-ins": "rgba(0,255,0, 0.4)",
          "td.d2h-change.d2h-ins ins": "rgba(0,255,0, 1)",
        },
        back: "rgba(0,0,0,0.02)",
        view: "rgba(0,0,0,0.05)",
        drag: "rgba(0,0,0,0.10)",
        interval: null,
      });
    },

    reInitMiniMap() {
      setTimeout(() => {
        const map = document.querySelector("#map");
        const parent = map.parentElement;
        const cloneMap = map.cloneNode(true);
        cloneMap.style = "";
        map.remove();
        const fisrtNode = parent.children[0];
        parent.insertBefore(cloneMap, fisrtNode);
        this.initMiniMap();
      }, 500);
    },
  },
};
</script>

<style lang="scss">
#map {
  top: 0;
  right: 0;
  width: 50px;
  // width: 160px;
  margin-right: 10px;
  z-index: 100;
}
.vue-diff {
  .hljs {
    display: inline-block;
    padding: 0;
    background: transparent;
    vertical-align: middle;
    overflow-y: hidden;
  }
  .d2h-file-header {
    display: none;
  }
  .d2h-file-diff {
    &::-webkit-scrollbar {
      width: 6px;
      height: 5px;
      // background-color: lightness;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: #e6e9ea;
    }
  }
  .d2h-files-diff {
    display: flex;
    .d2h-file-side-diff {
      flex: 1 1 50%;
      &:nth-child(n + 2) {
        .d2h-code-wrapper {
          border-left: 1px solid #fff;
        }
      }
      .d2h-code-side-linenumber {
        width: 60px;
        padding-right: 10px;
      }
    }
  }
  .d2h-info {
    background-color: transparent;
  }
  .d2h-diff-table {
    td {
      height: 20px;
      vertical-align: middle;
      overflow: hidden;
    }
  }
  .d2h-file-side-diff {
    &::-webkit-scrollbar {
      width: 6px;
      height: 5px;
      // background-color: lightness;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: #e6e9ea;
    }
  }
  .hljs-comment,
  .hljs-quote {
    color: #c4c6cc;
    font-style: italic;
  }
}
.dark {
  .d2h-diff-table {
    background: #1d1d1d;
  }
  .d2h-file-side-diff {
    &:nth-child(n + 2) {
      .d2h-code-wrapper {
        border-left-color: #313238;
      }
    }
  }

  .d2h-code-linenumber,
  .d2h-code-side-linenumber {
    font-size: 12px;
    color: #8f8f89;
    border: none;
    background: #212121;
    & .d2h-change {
      background-color: #45b787;
    }
    &.d2h-emptyplaceholder {
      background: transparent;
    }
  }
  del {
    background-color: #ee3f4d !important;
    .hljs-string {
      background-color: #ee3f4d !important;
    }
    .hljs-number {
      background-color: #ee3f4d !important;
    }
    .hljs-symbol {
      background-color: #ee3f4d !important;
    }
  }
  ins {
    background-color: #8a6913 !important;

    .hljs-string {
      background-color: #8a6913 !important;
    }
    .hljs-number {
      background-color: #8a6913 !important;
    }
    .hljs-symbol {
      background-color: #8a6913 !important;
    }
  }
  .d2h-info {
    color: inherit;
  }
  .d2h-del {
    background-color: #422326 !important;
    del {
      background: transparent;
    }
  }
  .d2h-ins {
    background-color: #45b787 !important;
    ins {
      background: transparent;
    }
  }
  .d2h-emptyplaceholder {
    background-color: #292929 !important;
  }
  .hljs {
    color: #979ba5;
  }

  .hljs-keyword,
  .hljs-literal,
  .hljs-symbol,
  .hljs-name {
    color: #3a84ff;
  }
  .hljs-link {
    color: #569cd6;
    text-decoration: underline;
  }

  .hljs-built_in,
  .hljs-type {
    color: #4ec9b0;
  }

  .hljs-number,
  .hljs-class {
    color: #b8d7a3;
  }

  .hljs-string,
  .hljs-meta-string {
    color: #8f3aff;
  }

  .hljs-regexp,
  .hljs-template-tag {
    color: #9a5334;
  }

  .hljs-subst,
  .hljs-function,
  .hljs-title,
  .hljs-formula {
    color: #8f3aff;
  }
  .hljs-params {
    color: #ea3636;
  }

  .hljs-comment,
  .hljs-quote {
    color: #63656e;
    font-style: italic;
  }

  .hljs-doctag {
    color: #608b4e;
  }

  .hljs-meta,
  .hljs-meta-keyword,
  .hljs-tag {
    color: #9b9b9b;
  }

  .hljs-variable,
  .hljs-template-variable {
    color: #bd63c5;
  }

  .hljs-attr,
  .hljs-attribute,
  .hljs-builtin-name {
    color: #ff9c01;
  }

  .hljs-section {
    color: gold;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
  .hljs-bullet,
  .hljs-selector-tag,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo {
    color: #3a84ff;
  }

  .hljs-addition {
    background-color: #144212;
    display: inline-block;
    width: 100%;
  }

  .hljs-deletion {
    background-color: #600;
    display: inline-block;
    width: 100%;
  }
}
.format-line-by-line {
  tbody.d2h-diff-tbody {
    tr:last-child,
    tr:nth-last-child(2) {
      display: none;
    }
  }
}
.format-side-by-side {
  tbody.d2h-diff-tbody {
    tr:last-child {
      display: none;
    }
  }
}
</style>
