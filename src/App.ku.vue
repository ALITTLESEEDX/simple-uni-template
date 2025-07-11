<!-- src/App.ku.vue | App.ku.vue -->

<script setup lang="ts">
import { useTheme } from './composables/useTheme';

const { theme, themeVars } = useTheme({
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#07c160',
});
</script>

<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <KuRootView />
  </wd-config-provider>
  <wd-toast />
</template>
