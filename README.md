
## 使用

```vue
<template>
  <div>
    <code-diff :old-string="oldStr" :new-string="newStr" :context="10" />
  </div>
</template>

import CodeDiff from 'vue-code-diff'
export default {
  components: {CodeDiff},
  data(){
    return {
      oldStr: 'old code',
      newStr: 'new code'
    }
  }
}
```

## 参数说明

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| old-string| 陈旧的字符串| string  |   —    |    —     |
| new-string| 新的字符串| string  |   —    |    —     |
| context| 不同地方上下间隔多少行不隐藏 | number  |   —    |    —     |
| outputFormat| 展示的方式 | string  |   line-by-line，side-by-side    |    line-by-line     |
| drawFileList | 展示对比文件列表 | boolean | - | false |
| renderNothingWhenEmpty | 当无对比时不渲染 | boolean | - | false |
| diffStyle | 每行中对比差异级别 | string | word, char | word |
| fileName | 文件名 | string | - |  |
| isShowNoChange | 当无对比时展示源代码 | boolean | - | false |
| language | 语言 | String | - | javascript |
| language | 主题 | String | - | light |  dark |
| extCls |  外部设置的 class name | String | - | '' |

## 效果展示

### line-by-line

![image](https://github.com/ddchef/vue-code-diff/blob/master/2018-06-01.png?raw=true)

### side-by-side

![image](https://github.com/ddchef/vue-code-diff/blob/master/2018050615272.png?raw=true)

## LICENSE

[MIT](LICENSE)
