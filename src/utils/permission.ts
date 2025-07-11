import { useUserStore } from '@/store'
import { needLoginPages as _needLoginPages, getLastPage, getNeedLoginPages } from '@/utils'


// TODO Check
const loginRoute = import.meta.env.VITE_LOGIN_URL

function isLogined() {
  const userStore = useUserStore()
  return userStore.isLogin
}

const isDev = import.meta.env.DEV

// 黑名单登录拦截器 - （适用于大部分页面不需要登录，少部分页面需要登录）
const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    // console.log(url) // /pages/route-interceptor/index?name=feige&age=30
    let path = url.split('?')[0]
    // 处理相对路径
    if (!path.startsWith('/')) {
      const currentPath = getLastPage().route
      const normalizedCurrentPath = currentPath?.startsWith('/') ? currentPath : `/${currentPath}`
      const baseDir = normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))
      path = `${baseDir}/${path}`
    }
    let needLoginPages: string[] = []
    if (isDev) {
      needLoginPages = getNeedLoginPages()
    }
    else {
      needLoginPages = _needLoginPages
    }
    const isNeedLogin = needLoginPages.includes(path)
    if (!isNeedLogin) {
      return true
    }
    const hasLogin = isLogined()
    if (hasLogin) {
      return true
    }
    const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(url)}`
    uni.navigateTo({ url: redirectRoute })
    return false
  },
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
    uni.addInterceptor('switchTab', navigateToInterceptor)
  },
}
