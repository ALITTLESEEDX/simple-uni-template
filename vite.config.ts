import path from 'node:path'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'
import Optimization from '@uni-ku/bundle-optimizer'
import UniKuRoot from '@uni-ku/root'


export default async ({ command, mode }) => {
  const UnoCSS = (await import('unocss/vite')).default
  const { UNI_PLATFORM } = process.env
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM)

  const env = loadEnv(mode, path.resolve(process.cwd(), '.'))
  console.log('环境变量 env -> ', env)
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
        dirs: ['src/composables', 'src/store', 'src/utils'],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images'),
      },
    },
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },
  })
}
