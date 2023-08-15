import Intercom from './Intercom'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

function createIntercomPlaceholder() {
  const placeholder = (...args: any[]) => placeholder.c(args)
  placeholder.queue = []
  placeholder.c = args => placeholder.queue.push(args)

  return placeholder
}
function includeIntercomScript(appId, callback) {
  const intercomScript = document.createElement('script')
  intercomScript.async = true
  intercomScript.src = `https://widget.intercom.io/widget/${appId}`
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(intercomScript, firstScript)

  intercomScript.addEventListener('load', callback)
}
function callWhenPageLoaded(callback) {
  if (window.attachEvent)
    window.attachEvent('onload', callback)

  else
    window.addEventListener('load', callback, false)
}

function initialiseIntercom(ctx: any, intercom: Intercom, config: NuxtIntercomConfig) {
  intercom.init()

  if (config.autoBoot)
    intercom.boot({ appId: config.appId })

  if (config.updateOnPageRoute)
    startPageTracking(ctx, intercom)
}

function startPageTracking(ctx: any, intercom: Intercom) {
  ctx.$router.afterEach((to) => {
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

    const callWhenIntercomScriptLoaded = initialiseIntercom(
      nuxtApp,
      intercom,
      config,
    )

    callWhenPageLoaded(() =>
      includeIntercomScript(config.appId, callWhenIntercomScriptLoaded),
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
