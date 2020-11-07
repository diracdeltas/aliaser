/* global chrome */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('showing first run page')
    chrome.runtime.openOptionsPage()
  }
})

const saveAlias = (address, url) => {
  chrome.storage.sync.set({
    [address]: {
      url,
      timestamp: Date.now()
    }
  })
}

const attachListener = () => {
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'onfill') {
      port.onMessage.addListener((message, p) => {
        if (p.sender.id !== chrome.runtime.id) {
          return
        }
        const address = message.address
        const url = p.sender.url
        saveAlias(address, url)
      })
    }
  })
}

attachListener()
