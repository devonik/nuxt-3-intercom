import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

export interface NuxtIntercomConfig {
  /** Intercom ID */
  appId?: string
  /** Intercom ID getting with promise */
  appIdPromise?: Function
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
  /** The CSS selector of an element to trigger Intercom("show") in order to activate the messenger (See https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical). To target an element by ID: "#id_of_element". To target elements by class ".classname_of_elements" */
  custom_launcher_selector?: string
  /** Dictate the alignment of the default launcher icon to be on the left/right. Possible values: "left" or "right" (any other value is treated as right). (See https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical) */
  alignment?: string
  /** Move the default launcher icon vertically. Padding from bottom of screen. Minimum value: 20. Does not work on mobile. (See https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical) */
  vertical_padding?: number
  /** Move the default launcher icon horizontally. Padding from right side of screen Minimum value: 20. Does not work on mobile. (See https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/customize-the-intercom-messenger-technical) */
  horizontal_padding?: number
  /** Hide the default launcher icon. Setting to false will forcefully show the launcher icon (See https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/turn-off-show-or-hide-the-intercom-messenger) */
  hide_default_launcher?: boolean
  /** Time in milliseconds for the Intercom session to be considered active.A value of 5 * 60 * 1000 would set the expiry time to be 5 minutes */
  session_duration?: number
  /** Used in button links and more to highlight and emphasise. The color string can be any valid CSS (https://www.w3schools.com/cssref/css_colors.asp) Color Name HEX or RGB */
  action_color?: string
  /** Used behind your team profile and other attributes. The color string can be any valid CSS (https://www.w3schools.com/cssref/css_colors.asp) Color Name HEX or RGB */
  background_color?: string
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
