import { browserHistory } from 'react-router'
import { getUrlParameters } from 'js/utils/utils'
import qs from 'qs'

// TODO: replace this with Link navigation via react-router.

// TODO: make all routes absolute by default
const protocol = process.env.WEBSITE_PROTOCOL ? process.env.WEBSITE_PROTOCOL : 'https'
const baseUrl = `${protocol}://${process.env.WEBSITE_DOMAIN}`

export const goTo = (location, paramsObj = {}) => {
  browserHistory.push({
    pathname: location,
    search: qs.stringify(paramsObj)
      ? `?${qs.stringify(paramsObj)}`
      : null
  })
}

export const replaceUrl = (location, paramsObj = {}) => {
  browserHistory.replace({
    pathname: location,
    search: qs.stringify(paramsObj)
      ? `?${qs.stringify(paramsObj)}`
      : null
  })
}

export const modifyURLParams = (paramsObj = {}) => {
  const newParamsObj = Object.assign({},
    getUrlParameters(),
    paramsObj
  )
  browserHistory.push({
    pathname: window.location.pathname,
    search: qs.stringify(newParamsObj)
      ? `?${qs.stringify(newParamsObj)}`
      : null
  })
}

export const externalRedirect = (externalURL) => {
  window.location = externalURL
}

export const absoluteUrl = (path) => {
  return `${baseUrl}${path}`
}

// ROUTES

export const dashboardURL = '/newtab/'

// Auth routes
export const loginURL = '/newtab/auth/'
export const verifyEmailURL = '/newtab/auth/verify-email/'
export const enterUsernameURL = '/newtab/auth/username/'
export const authMessageURL = '/newtab/auth/welcome/'
export const missingEmailMessageURL = '/newtab/auth/missing-email/'

// Settings and profile
export const settingsURL = '/newtab/settings/widgets/'
export const widgetSettingsURL = '/newtab/settings/widgets/'
export const backgroundSettingsURL = '/newtab/settings/background/'
export const donateURL = '/newtab/profile/donate/'
export const statsURL = '/newtab/profile/stats/'
export const inviteFriendsURL = '/newtab/profile/invite/'
export const accountURL = '/newtab/account/'

// Homepage

export const privacyPolicyURL = '/privacy/'
export const termsOfServiceURL = '/terms/'

// External links

export const postUninstallSurveyURL = 'https://goo.gl/forms/XUICFx9psTwCzEIE2'

// TODO: stop using these and replace the existing uses.
//   They only cause additional complication during testing.
// CONVENIENCE FUNCTIONS

export const goToHome = () => {
  goTo(dashboardURL)
}

export const goToLogin = () => {
  // Use replace by default because likely redirecting when
  // user is not authenticated.
  replaceUrl(loginURL)
}

export const goToDashboard = () => {
  goTo(dashboardURL)
}

export const goToSettings = () => {
  goTo(settingsURL)
}

export const goToDonate = () => {
  goTo(donateURL)
}

export const goToStats = () => {
  goTo(statsURL)
}

export const goToInviteFriends = () => {
  goTo(inviteFriendsURL)
}
