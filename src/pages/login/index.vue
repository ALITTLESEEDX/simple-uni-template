<template>
  <view>login page</view>
  <view>
    <wd-button @click="login">LOGIN</wd-button>
  </view>
</template>

<script setup lang="ts">
const userStore = useUserStore();
function login() {
  userStore.isLogin = true;
}
</script>
