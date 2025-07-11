<script setup lang="ts">
onLaunch(() => {
  console.log('app launch');
});
onShow(() => {
  console.log('app show');
});
</script>

<style lang="scss">
@import '@/styles/global.scss';

::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  color: transparent !important;
  -webkit-appearance: none;
  background: transparent;
}
</style>
