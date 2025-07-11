import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/LocalizedFormat';


export function createApp() {
  const app = createSSRApp(App)
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  dayjs.locale('zh-cn');
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)
  return {
    app,
  }
}
