export interface NuxtIntercomConfig {
  /** Intercom ID */
  appId?: string
  /** Intercom ID getting with promise */
  appIdPromise?: Function
  /** True to boot messenger widget and show UI on page load, false to allow manually booting later. Default: true */
  autoBoot?: boolean
  /** True to show debug messages in the console, useful for development, false to not show them. Default: false */
  debug?: boolean
  /** Object to specify messenger attributes to configure when booting. see https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-messenger-attributes. Default: {} */
  config?: any
  /** String to identfy the script tag, for vue-meta. Default: "intercom-script" */
  scriptId?: string
  /** True to defer loading intercom widget javascript until page loads, false to async load it in document flow. Default: false */
  scriptDefer?: boolean
  /** True to call intercom's 'update' method on route change, false to not do this. Default: true */
  updateOnPageRoute?: boolean
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

export interface IntercomUserAvatar {
  /** The value is "avatar" */
  type: string
  /** An avatar image URL. Note: needs to be https. */
  image_url: string
}
export interface IntercomUserCompany {
  /** The company ID of the company */
  company_id: string
  /** The name of the company */
  name: string
  /** The time the company was created in your system */
  remote_created_at: number
  /** The name of the plan the company is on */
  plan: string
  /** How much revenue the company generates for your business */
  monthly_spend: number
  /** Indicates the number of users in Intercom associated to the companyDoes not actually update the value but is a reserved keyword */
  user_count: number
  /** The number of employees in the company */
  size: number
  /** The URL for the company website */
  website: string
  /** The industry of the company */
  industry: string
}
export interface IntercomUserData {
  [key: string]: any
  /** The email address of the currently logged in user (Only applicable to users) */
  email?: string
  /** The user_id address of the currently logged in user (Only applicable to users) */
  user_id?: string
  /** The Unix timestamp (in seconds) when the user signed up to your app (Only applicable to users) */
  created_at?: number
  /** Name of the current user/lead */
  name?: string
  /** Phone number of the current user/lead */
  phone?: string
  /** This value can't actually be set by the Javascript API (it automatically uses the time of the last request but is a this is a reserved attribute) */
  last_request_at?: number
  /** Sets the [unsubscribe status]((https://docs.intercom.com/faqs-and-troubleshooting/unsubscribing-users/how-do-i-unsubscribe-users-from-receiving-emails) of the record */
  unsubscribed_from_emails?: boolean
  /** Set the messenger language programmatically (instead of relying on browser language settings) */
  language_override?: string
  /** UTM Campaign valueNote: All UTM parameters are updated automatically and can not be manually overidden (See https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters for more) */
  utm_campaign?: string
  /** https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters */
  utm_content?: string
  /** https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters */
  utm_medium?: string
  /** https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters */
  utm_source?: string
  /** https://docs.intercom.com/the-intercom-platform/track-conversions-and-clicks-with-utm-parameters */
  utm_term?: string
  /** Set the avatar/profile image associated to the current record (typically gathered via social profiles via email address https://docs.intercom.com/faqs-and-troubleshooting/your-users-and-leads-data-in-intercom/where-do-the-social-profiles-come-from) */
  avatar?: IntercomUserAvatar
  /** Used for identity verification (Only applicable to users) */
  user_hash?: string
  /** Current user's company (Only applicable to users)For field definitions see Company Object in the section belowNote: Company ID and company name are the minimum requirements to pass a company into Intercom. */
  company?: IntercomUserCompany
  /** An array of companies the user is associated to (Only applicable to users) */
  companies?: Array<IntercomUserCompany>
  /** Can be set in update. Intercom ID */
  app_id?: string | undefined
  /** Can be set in update. Hide the default launcher icon. Setting to false will forcefully show the launcher icon (See https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-the-intercom-messenger/turn-off-show-or-hide-the-intercom-messenger) */
  hide_default_launcher?: boolean
}
