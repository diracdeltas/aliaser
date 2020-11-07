/* global chrome */

/*
const settings = new window.Store('settings', {
  sample_setting: 'sample setting'
})
*/

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'onfill') {
    port.onMessage.addListener((message, p) => {
      console.log(message)
      console.log(p.sender)
    })
  }
})
