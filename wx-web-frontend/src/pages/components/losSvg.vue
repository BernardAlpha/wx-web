<template>
  <image class="los-svg" :style="`width:${props.width};height:${props.height};`" :src="svgBase64" :mode="props.mode"
    :lazyLoad="props.lazyLoad" :webp="props.webp" :draggable="props.draggable"></image>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { req } from '@/utils/request';
import { base64Encode } from '@/utils/common';

const props = defineProps({
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: ''
  },
  lazyLoad: {
    type: Boolean,
    defailt: false
  },
  webp: {
    type: Boolean,
    defailt: false
  },
  draggable: {
    type: Boolean,
    defailt: false
  }
})

const svgBase64 = ref('')

let svgCache = uni.getStorageSync('svgCache');
let svgIndex = -1;

interface svgItem {
  src: string;
  content: string;
}

console.log('typeof(svgCache)', typeof (svgCache));

if (svgCache) {
  svgIndex = svgCache.findIndex((item: svgItem) => item.src === props.src);
} else {
  svgCache = [];
}

if (svgIndex >= 0) {
  const addedColor = svgCache[svgIndex].content.replace('<svg', `<svg color="${props.color}"`)
  svgBase64.value = `data:image/svg+xml;base64,${base64Encode(addedColor)}`;
} else {
  req.FETCH(props.src).then((res: string) => {
    const svgNew: svgItem = {
      src: props.src,
      content: res
    };
    svgCache.push(svgNew);
    uni.setStorageSync('svgCache', svgCache);
    const addedColor = res.replace('<svg', `<svg color="${props.color}"`)
    svgBase64.value = `data:image/svg+xml;base64,${base64Encode(addedColor)}`;
  });
}

</script>

<style lang="scss" scoped></style>
