<script setup lang="ts">
import { usePageAuth } from '@/hooks/usePageAuth';

usePageAuth();

onLaunch(() => {
  // #ifdef MP-WEIXIN
  wxMpAutoUpdate();
  // #endif
  console.log('app launch');
});
onShow(() => {
  console.log('app show');
});
function wxMpAutoUpdate() {
  let f = uni.canIUse('getUpdateManager'); // 获取小程序更新机制兼容
  if (f) {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        // 是否有新的版本
        updateManager.onUpdateReady(() => {
          // 当新版本下载完成，会进行回调
          updateManager.applyUpdate(); // 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
        });
      }
    });
    updateManager.onUpdateFailed(() => {
      // 当新版本下载失败，会进行回调
      uni.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索绘画酱打开哟~',
      });
    });
  }
}
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
