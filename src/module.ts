import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

export interface NuxtIntercomConfig {
  /** Intercom ID */
  appId: string | Function | undefined
  /** True to boot messenger widget and show UI on page load, false to allow manually booting later. Default: true */
  autoBoot: boolean
  /** True to show debug messages in the console, useful for development, false to not show them. Default: false */
  debug: boolean
  /** Object to specify messenger attributes to configure when booting. see https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-messenger-attributes. Default: {} */
  config: any
  /** String to identfy the script tag, for vue-meta. Default: "intercom-script" */
  scriptId: string
  /** True to defer loading intercom widget javascript until page loads, false to async load it in document flow. Default: false */
  scriptDefer: boolean
  /** True to call intercom's 'update' method on route change, false to not do this. Default: true */
  updateOnPageRoute: boolean
}

export default defineNuxtModule<NuxtIntercomConfig>({
  meta: {
    name: 'nuxt-3-intercom',
    configKey: 'intercom',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    appId: undefined,
    autoBoot: true,
    debug: false,
    config: {},
    scriptId: 'intercom-script',
    scriptDefer: false,
    updateOnPageRoute: true,
  },
  setup(config, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Async id evaluation
    if (typeof config.appId === 'function')
      config.appId().then((appId: string) => (config.appId = appId))

    if (!config.appId) {
      console.warn(
        'No appId found for Intercom - not including plugin or intercom script on page',
      )
      return
    }

    addPlugin(resolver.resolve('./runtime/plugin.client'))

    // Assign module options to run time cause we need it in plugin handler
    nuxt.options.runtimeConfig.public.intercom = defu(
      nuxt.options.runtimeConfig.public.intercom,
      config,
    )
  },
})
