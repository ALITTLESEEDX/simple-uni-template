import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/LocalizedFormat';
import { routeInterceptor } from '@/utils/permission'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.locale('zh-cn');
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)
  app.use(routeInterceptor)
  return {
    app,
  }
}
