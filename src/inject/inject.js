/* global chrome */

console.log('inject.js loaded')

const port = chrome.runtime.connect({
  name: 'onfill'
})
port.onMessage.addListener((msg) => {
  console.log(msg)
})

window.onload = () => {
  const emails = document.querySelectorAll('input[type="email"]')
  console.log('email fields', emails)
  emails.forEach((el) => {
    const address = 'hi'
    el.value = address
    port.postMessage({
      address,
      origin: window.location.origin
    })
  })
}
