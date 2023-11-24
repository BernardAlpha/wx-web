<template>
  <web-view :src="url"></web-view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import website from '@/config/website'

const url = ref(`${website.staticPrefix}/public/html/test.html`);
console.log('url.value', url.value);
</script>

<style lang="scss" scoped></style>
