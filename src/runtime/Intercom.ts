declare global {
  interface Window {
    Intercom?: any
    intercomSettings?: any
  }
}
export interface IntercomUserData {
  [key: string]: any
  app_id?: string
  last_request_at?: number
}
export default class Intercom {
  /** Intercom ID */
  appId: string
  /** True to show debug messages in the console, useful for development, false to not show them. Default: false */
  debug: boolean
  /** Object to specify messenger attributes to configure when booting. see https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects#section-messenger-attributes. Default: {} */
  config: any
  ready: boolean
  unreadCount: number
  userData: any
  visible: boolean
  permanentUserData: string[] = ['app_id', 'email', 'user_id']

  constructor(appId: string, settings = {
    debug: false,
    config: {},
  }, { userData = {} } = {}) {
    this.appId = appId
    this.debug = settings.debug
    this.config = settings.config
    this.ready = false
    this.unreadCount = 0
    this.userData = userData
    this.visible = false
  }

  /**
   * Make a call directly to Intercom.
   * Use of this function is not recommended, but is public to support the use case where this wrapper does not
   * implement a function that may be added by Intercom in the future.
   */
  call(...args: any[]) {
    if (!window.Intercom) {
      throw new Error(
        'Cannot find Intercom object on window. Make sure Intercom loaded correctly.',
      )
    }

    this._debugLog('Intercom call', ...args)

    return window.Intercom(...args)
  }

  /**
   * Set up some event listeners to maintain internal state with Intercom state, and any initialisation required
   */
  init() {
    this.call('onHide', () => {
      this.visible = false
    })
    this.call('onShow', () => {
      this.visible = true
    })
    this.call('onUnreadCountChange', (unreadCount: number) => {
      this.unreadCount = unreadCount
    })

    this.ready = true
  }

  /**
   * Returns whether the intercom object has been initialised and is ready for us.
   * If this is false, it should first be initialised by calling init().
   */
  isReady() {
    return this.ready
  }

  /**
   * Boot Intercom. If an appId is provided, this will be used for all future calls to Intercom.
   */
  boot(userData: IntercomUserData = {}) {
    if (userData.app_id)
      this.appId = userData.app_id

    if (!window.intercomSettings)
      window.intercomSettings = {}
    window.intercomSettings.app_id = this.appId

    Object.keys(this.config).forEach((key) => {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      window.intercomSettings[snakeCaseKey] = this.config[key]
    })

    return this._updateData('boot', userData)
  }

  /**
   * Update user data sent to Intercom. This will also trigger a 'ping' to Intercom to check for new messages to display.
   */
  update(userData = {}) {
    return this._updateData('update', userData)
  }

  /**
   * Clear user's conversations, such as on logout. Otherwise, they will continue to be displayed for up to one week.
   */
  shutdown() {
    this.userData = {}
    return this.call('shutdown')
  }

  /**
   * Shows the conversation UI which displays the messages. Does not change visibility of the launcher widget.
   */
  show() {
    return this.call('show')
  }

  /**
   * Hides the conversation UI which displays the messages. Does not change visibility of the launcher widget.
   */
  hide() {
    return this.call('hide')
  }

  /**
   * Shows the conversation UI with the message list.
   */
  showMessages() {
    return this.call('showMessages')
  }

  /**
   * This will open the Messenger as if a new conversation was just created.
   * This function can also take an optional second parameter, used to pre-populate the message composer.
   */
  showNewMessage(messageContent: string) {
    return this.call('showNewMessage', messageContent)
  }

  /**
   * Associates an event with the currently logged in user.
   * The final parameter is a map that can be used to send optional metadata about the event.
   */
  trackEvent(name: string, metadata: any) {
    return this.call('trackEvent', name, metadata)
  }

  /**
   * A visitor is someone who goes to your site but does not use the messenger.
   * You can track these visitors via the visitor user_id.
   * This user_id can be used to retrieve the visitor or lead through the REST API.
   */
  getVisitorId() {
    return this.call('getVisitorId')
  }

  /**
   * Start the tour with the corresponding tourId.
   * Used to trigger a tour in response to a user action.
   *
   * Only published tours with the "use tour anywhere" option will work.
   * If this is called using an invalid tour id, nothing will happen.
   */
  startTour(tourId: string) {
    return this.call('startTour', tourId)
  }

  /**
   * Make a call to a method that updates user data.
   * This will merge the permanent user data that's cached with the new user data sent to this method.
   *
   * After the call to Intercom is made, the temporary user data will be removed from cache.
   */
  _updateData(method = 'update', userData: IntercomUserData = {}) {
    userData.last_request_at
      = userData.last_request_at || new Date().getTime() / 1000
    if (!userData.app_id)
      userData.app_id = this.appId

    this.userData = { ...this.userData, ...userData }

    const response = this.call(method, this.userData)

    this._flushUserData()

    return response
  }

  /**
   * Remove all the non-permanent user data from cache. Anything not removed will be sent again with next update.
   */
  _flushUserData() {
    this.userData = Object.keys(this.userData).reduce(
      (flushedUserData: any, userDataKey) => {
        if (this.permanentUserData.includes(userDataKey))
          flushedUserData[userDataKey] = this.userData[userDataKey]

        return flushedUserData
      },
      {},
    )
  }

  _debugLog(...args: any[]) {
    if (!this.debug)
      return

    console.log('[nuxt-3-intercom] DEBUG:', ...args) //
  }
}
