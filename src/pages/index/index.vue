<template>
  <view class="p-3 center">
    <HiCounter />
  </view>
  <view class="center gap-3">
    <wd-button @click="go">GO</wd-button>
    <wd-button @click="goLogin">GO LOGIN</wd-button>
  </view>
</template>

<script setup lang="ts">
function go() {
  uni.navigateTo({
    url: '/pages/need-login/index',
  });
}
function goLogin() {
  uni.navigateTo({
    url: '/pages/login/index',
  });
}
</script>

<style></style>

<route type="home" lang="json5">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
