import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

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
  setup(config: NuxtIntercomConfig, nuxt: any) {
    const resolver = createResolver(import.meta.url)

    // Async id evaluation
    if (config.appIdPromise)
      config.appIdPromise().then((appId: string) => (config.appId = appId))

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
