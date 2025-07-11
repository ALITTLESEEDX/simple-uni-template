<script setup lang="ts">
import { useTheme } from './composables/useTheme';

const { theme, themeVars } = useTheme({});
</script>

<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <KuRootView />
  </wd-config-provider>
  <wd-toast />
</template>
