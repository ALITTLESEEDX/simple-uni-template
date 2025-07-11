import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'
import Optimization from '@uni-ku/bundle-optimizer'
import UniKuRoot from '@uni-ku/root'
// https://vitejs.dev/config/
export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'src/types/uni-pages.d.ts',
        subPackages: [], // 分页
        exclude: ['**/components/**/*.*']
      }),
      Optimization({
        enable: {
          'optimization': true,
          'async-import': true,
          'async-component': true,
        },
        dts: {
          base: 'src/types',
        },
        logger: false,
      }),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        extensions: ['vue'],
        deep: true,
        dts: 'src/types/components.d.ts',
        directoryAsNamespace: true,
        resolvers: [WotResolver()],
      }),
      UniKuRoot(),
      Uni(),
      UniPolyfill(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/types/auto-import.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils'],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
  })
}
