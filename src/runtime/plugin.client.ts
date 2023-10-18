import Intercom from './Intercom'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

function createIntercomPlaceholder() {
  const placeholder = (...args: any[]) => placeholder.c(args)
  placeholder.queue = []
  placeholder.c = args => placeholder.queue.push(args)

  return placeholder
}

function initialiseIntercom(ctx: any, intercom: Intercom, config: NuxtIntercomConfig) {
  intercom.init()

  if (config.autoBoot)
    intercom.boot({ appId: config.appId })

  if (config.updateOnPageRoute)
    startPageTracking(ctx, intercom)
}

function startPageTracking(ctx: any, intercom: Intercom) {
  ctx.$router.afterEach(() => {
    setTimeout(() => {
      intercom.update()
    }, 250)
  })
}
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.intercom as NuxtIntercomConfig
  const intercom = new Intercom(config)

  if (typeof window.Intercom === 'function') {
    intercom.init()
    intercom.call('reattach_activator')
    intercom.update()
  }
  else {
    window.Intercom = createIntercomPlaceholder()

    initialiseIntercom(
      nuxtApp,
      intercom,
      config,
    )
  }
  return {
    provide: {
      intercom,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $intercom: Intercom
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $intercom: Intercom
  }
}
export {}
