<template>
  <view class="los-page gourd-mark-page">
    <nav-bar pageName="编辑"></nav-bar>
    <view class="content">
      <invisible-module></invisible-module>
      <view v-if="isEdit" class="edit-box words-box">
        <view class="edit-content">
          <textarea :cursor="contentCursor" :focus="textareaFocus" class="" v-model="content" :maxlength="-1"
            @blur="textareaBlur"></textarea>
        </view>
        <view class="edit-func">
          <view class="func-item" v-for="item in editFuncs" @click="editFuncClick(item)">
            <los-button>{{ item.name }}</los-button>
          </view>
        </view>
      </view>

      <view v-else class="preview-box words-box">
        <mp-html :content="mpHtmlContent" />
      </view>

      <view @click="switchClick" class="switch-box">
        <los-button background="#F3F3F3">{{ isEdit ? '预览' : '编辑' }}</los-button>
      </view>
    </view>

  </view>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { onLoad } from '@dcloudio/uni-app';
import navBar from '@/pages/components/navBar.vue';
import losButton from '@/pages/components/losButton.vue';
import invisibleModule from "@/pages/components/invisibleModule.vue";
import mpHtml from '@/pages/components/mp-html/mp-html.vue'
import { marked } from 'marked';
import hljs from "highlight.js";
// import hljs from 'highlight.js/lib/core';
// import "highlight.js/styles/atom-one-dark.css";
// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript);

onLoad(() => {
});

const content = ref('')
const contentCursor = ref(0);
const textareaFocus = ref(false);
const isEdit = ref(true)
const mpHtmlContent = ref('');

const switchClick = () => {
  console.log('switchClick');
  if (isEdit.value) {
    mpHtmlContent.value = genMpHtmlContent();
  }
  isEdit.value = !isEdit.value;
}

const genMpHtmlContent = () => {
  let oriContent = content.value;
  let htmlParse = marked.parse(oriContent);
  const codeArr = getContentBetweenChars(htmlParse, '<code', '</code>')
  console.log('codeArr', codeArr);
  for (let i in codeArr) {
    console.log('codeArr[i]', codeArr[i]);
    let netCode = codeArr[i].slice(1);
    let lang = 'bash';
    let eleTag = 'div';
    let eleClass = 'code-block';
    if (netCode.indexOf(`class="language-`) >= 0) {
      netCode = netCode.slice(netCode.indexOf('>') + 1);
      lang = getContentBetweenChars(codeArr[i], `class="language-`, `">`)[0]
    }else {
      lang = 'singleword'; // 单个字符
      eleTag = 'span';
      eleClass = 'code-inline';
    }
    netCode = decodeHtmlEntities(netCode)
    console.log('netCode\n', netCode);
    console.log('lang\n', lang);
    const hljsCode = hljs.highlight(netCode, { language: lang === 'singleword' ? 'bash' : lang }).value
    console.log('hljsCode\n', hljsCode);
    htmlParse = htmlParse.replace(`<code${codeArr[i]}</code>`, `<${eleTag} class="html-code ${eleClass}">${hljsCode}</${eleTag}>`)
  }
  console.log('cookedDomHtml\n', htmlParse);
  return htmlParse;
}

const getContentBetweenChars = (inputString: string, startChar: string, endChar: string) => {
  console.log('inputString\n', inputString);
  const regexPattern = new RegExp(`${startChar}(.*?)${endChar}`, 'gs');
  const matches = [];
  let match;
  while ((match = regexPattern.exec(inputString)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function decodeHtmlEntities(input) {
  return input.replace(/&([^;]+);/g, function (match, entity) {
    const specialEntities = {
      'amp': '&',
      'lt': '<',
      'gt': '>',
      'quot': '"',
      'apos': "'",
      '#39': "'",
      // 可根据需要添加其他实体
    };
    return specialEntities[entity] || match;
  });
}


/*
hello, UniApp!
```javascript
console.log('Hello World!');
```
图片
[链接文字](http://www.example.com)
![替代文本](http://www.example.com/image.jpg)

引用
> 这是引用的文本
`单行代码`
`good`
`fff` `www` `dwa`

```javascript
let a = 1
const showKeyboard = (cursorPoint: number) => {
  console.log('cursor', cursorPoint);

  if (cursorPoint && this || that && !alice && bob !== ciri) { // 光标移动到当前位置
    contentCursor.value = cursorPoint;
  }
  textareaFocus.value = true;
  `good`
}
```
`bad`
*/

const editFuncs = [
  {
    name: '换行符',
    text: '<br/>',
    forwardStep: 4
  },
  {
    name: '一级标题',
    text: '\n# \n',
    forwardStep: 3
  },
  {
    name: '粗体',
    text: '****',
    forwardStep: 2
  },
]

const editFuncClick = (item) => {
  // debugger
  setTimeout(() => {
    content.value = content.value.substring(0, contentCursor.value) + item.text + content.value.substring(contentCursor.value);
    showKeyboard(contentCursor.value + item.forwardStep);
  }, 50);
}

const textareaBlur = (e) => {
  // debugger
  console.log('e.detail.cursor', e.detail.cursor);
  contentCursor.value = e.detail.cursor;
  textareaFocus.value = false;
}

const showKeyboard = (cursorPoint: number) => {
  console.log('cursor', cursorPoint);
  if (cursorPoint) { // 光标移动到当前位置
    contentCursor.value = cursorPoint;
  }
  // nextTick(() => {
  //   textareaFocus.value = true;
  // });
  setTimeout(() => {
    textareaFocus.value = true;
  }, 600);
}

</script>

<style lang="scss" scoped>
// @import "@/styles/variables.scss";
// @import "highlight.js/styles/atom-one-dark.css";

.gourd-mark-page {
  font-family: 'Consolas', 'Courier New', 'MissU';
  background-color: azure;

  .edit-box {
    font-family: 'Consolas', 'Courier New', 'Microsoft Yahei';

    // background-color: black;
    .words-box {
      height: -webkit-fill-available;

    }

    .edit-func {
      // margin-top: 40rpx;
      background-color: bisque;
      width: -webkit-fill-available;
    }

    .edit-content {
      margin: 20rpx;
      border-radius: 16rpx;
      border: 2rpx solid #aaaaaa;

      textarea {
        // background-color: aqua;
        padding: 16rpx;
        width: -webkit-fill-available;
        height: 500rpx;
      }
    }
  }

  .preview-box {
    font-family: 'Consolas', 'Courier New', 'Microsoft Yahei';
    margin: 20rpx;
    padding: 16rpx;
    border-radius: 16rpx;
    border: 2rpx solid #aaaaaa;
    min-height: 500rpx;
  }

  .switch-box {
    position: fixed;
    bottom: 100rpx;
    width: 300rpx;
    text-align: center;
  }

}


</style>
