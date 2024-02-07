<template>
  <view class="los-page gourd-mark-page">
    <navbar pageName=""></navbar>
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
import navbar from '@/pages/components/navBar.vue';
import losButton from '@/pages/components/losButton.vue';
import invisibleModule from "@/pages/components/invisibleModule.vue";
import mpHtml from '@/pages/components/mp-html/mp-html.vue'
import { marked } from 'marked';
import hljs from "highlight.js";
// import hljs from 'highlight.js/lib/core';
// import "highlight.js/styles/atom-one-dark.css";
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);
// hljs.initHighlightingOnLoad();
onLoad(() => {
  // marked.setOptions({
  //   renderer: new marked.Renderer(),
  //   highlight: function (code) {
  //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!dawd', code);
  //     return hljs.highlightAuto(code).value;
  //   },
  //   langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  //   pedantic: false,
  //   gfm: true,
  //   breaks: true,
  //   sanitize: false,
  //   smartypants: false,
  //   xhtml: false
  // });
});
// hljs.configure({useBR: true});


// console.log('dd', marked('I \nam using __markdown__.'));


const content = ref('')
const contentCursor = ref(0);
const textareaFocus = ref(false);
const isEdit = ref(true)
const mpHtmlContent = ref('');

// const textareaInput = (e) => {
//   console.log('e', e);
// }

const switchClick = () => {
  console.log('switchClick');
  if (isEdit.value) {
    mpHtmlContent.value = genMpHtmlContent();
    // hljs.highlightAll();
  }
  isEdit.value = !isEdit.value;
}


const genMpHtmlContent = () => {
  let oriContent = content.value;
  let cookedContent = '';
  console.log('oriContent--oooo', oriContent);
  console.log(oriContent.split('```'))
  const codeSplit = oriContent.split('```');
  for (let i in codeSplit) {
    if (i % 2 === 1) {
      const splitStrs = ['\n', '↵', '\r\n', '\r'];
      console.log('codeSplit[i]', codeSplit[i]);
      console.log('codeSplit[i]-l', codeSplit[i].length);
      console.log('splitStrs[0]', splitStrs[0]);
      let splitIndex = codeSplit[i].toLowerCase().indexOf(splitStrs[0]);
      let splitStr = '';
      console.log('splitIndexss', splitIndex);
      for (let j in splitStrs) {
        if (codeSplit[i].indexOf(splitStrs[j]) > 0 && codeSplit[i].indexOf(splitStrs[j]) < splitIndex) {
          splitIndex = codeSplit[i].indexOf(splitStrs[j]);
          splitStr = splitStrs[j];
        }
      }
      console.log('splitIndex', splitIndex);
      console.log('splitStr', splitStr);
      const lang = codeSplit[i].slice(0, splitIndex) || '';
      const code = codeSplit[i].slice(splitIndex + splitStr.length) || '';
      console.log('lang', lang);
      console.log('code', code);
      const hljsCode = `<div class="hljs lang-${lang}" style="background: #1E1E1E; border-radius: 8rpx; padding: 8rpx;">` + hljs.highlight(code, { language: lang }).value + '</div>'
      // const hljsCode = '<div style="background: #FFFFFF; border-radius: 12rpx; padding: 20rpx;">' + hljs.highlightAuto(code).value + '</div>'
      codeSplit[i] = hljsCode;
      // oriContent = oriContent.replace('```' + codeSplit[i] + '```', hljsCode)
    } else {
      const lines = codeSplit[i].split('\n')
      for (let l in lines) {
        const singleCode = lines[l].split('`')
        for (let s in singleCode) {
          if (s % 2 === 1) {
            console.log('singleCode', singleCode[s]);
            codeSplit[i] = codeSplit[i].replace('`' + singleCode[s] + '`', '<span style="color:#ff5c17; background:#F3F3F3; font-size:13px; margin: 0 2px 0 2px; padding: 1px 4px; border-radius:4px;">' + singleCode[s] + '</span>');
          }
        }
        console.log('lines', lines);
      }
      // codeSplit[i] = codeSplit[i].replace(/↵|\r|\n|\r\n/g, '<br/>');
    }
    cookedContent = cookedContent + codeSplit[i];
  }
  // console.log('cookedContent\n', cookedContent);
  // console.log('marked.parse(oriContent)\n', marked.parse(cookedContent));
  // console.log('marked.parse(oriContent, {breaks: true})\n', marked.parse(cookedContent, { breaks: true }));
  // console.log('marked(oriContent, {breaks: true})\n', marked(cookedContent, { breaks: true }));
  return marked.parse(cookedContent);
  console.log('marked.parse(oriContent)', marked.parse(oriContent));
  // return marked.parse(oriContent);
  // return hljs.highlightAuto(marked.parse(oriContent)).value;

  // return cookedContent;
  // return marked.parse(oriContent, {
  //   renderer: new marked.Renderer(),
  //   highlight: function (src: '', options: {code, lang}) {
  //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!dawd', code);
  //     return hljs.highlightAuto(code).value;
  //   },
  //   langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  //   pedantic: false,
  //   gfm: true,
  //   breaks: true,
  //   sanitize: false,
  //   smartypants: false,
  //   xhtml: false
  // });
  // return oriContent;

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
`fff` `www``dwa`

```javascript
let a = 1
const showKeyboard = (cursorPoint: number) => {
  console.log('cursor', cursorPoint);

  if (cursorPoint) { // 光标移动到当前位置
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
