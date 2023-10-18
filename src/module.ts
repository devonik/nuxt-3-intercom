import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      intercom?: NuxtIntercomConfig
    }
  }
  interface NuxtConfig {
    intercom?: NuxtIntercomConfig
  }
  interface NuxtOptions {
    intercom?: NuxtIntercomConfig
  }
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
  setup(config: NuxtIntercomConfig, nuxt: any) {
    const resolver = createResolver(import.meta.url)

    // Async id evaluation
    if (config.appIdPromise)
      config.appIdPromise().then((appId: string) => (config.appId = appId))

    if (!config.appId) {
      console.warn(
        'No appId found for Intercom in module config - be sure to add appId either in module config or nuxt public runtimeConfig under key intercom.appId. See https://github.com/devonik/nuxt-3-intercom#readme for more',
      )
    }

    addPlugin(resolver.resolve('./runtime/plugin.client'))

    // Assign module options to run time cause we need it in plugin handler
    nuxt.options.runtimeConfig.public.intercom = defu(
      nuxt.options.runtimeConfig.public.intercom,
      config,
    )
  },
})
