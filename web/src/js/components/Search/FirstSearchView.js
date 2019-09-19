import React from 'react'
import { replaceUrl, searchBaseURL } from 'js/navigation/navigation'
import { SEARCH_INTRO_QUERY_ENGLISH } from 'js/constants'
import { detectSupportedBrowser } from 'js/utils/detectBrowser'
import {
  CHROME_BROWSER,
  FIREFOX_BROWSER,
  SEARCH_SRC_CHROME_EXTENSION,
  SEARCH_SRC_FIREFOX_EXTENSION,
} from 'js/constants'

// The view the Search extensions open immediately after they're
// added to the browser.
class FirstSearchView extends React.Component {
  componentDidMount() {
    // Set the "src" parameter to the browser name, because
    // users will arrive at this view after installing a
    // browser extension. Other logic for showing the
    // "Add to Chrome/Firefox" button relies on the "src" param
    // value, so we don't want to show the "add extension"
    // call-to-action  to a user who just added the extension.
    // We could set this value in the extension code, but this
    // is an easy workaround without pushing new versions of the
    // extension.
    const browser = detectSupportedBrowser()
    var src = null
    if (browser === CHROME_BROWSER) {
      src = SEARCH_SRC_CHROME_EXTENSION
    } else if (browser === FIREFOX_BROWSER) {
      src = SEARCH_SRC_FIREFOX_EXTENSION
    }

    replaceUrl(searchBaseURL, {
      // The first search query we'll show the user.
      q: SEARCH_INTRO_QUERY_ENGLISH,
      src,
    })
  }

  render() {
    return null
  }
}

export default FirstSearchView
