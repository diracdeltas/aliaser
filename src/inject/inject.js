/* global chrome */

let emailDomain = null

chrome.storage.sync.get(null, (obj) => {
  console.log(obj)
})

chrome.storage.sync.get('domain', (obj) => {
  const domain = obj.domain
  if (!domain) {
    console.error('Email domain is not set yet. Open Aliaser options to configure.')
  } else {
    emailDomain = domain
    onload()
  }
})

const port = chrome.runtime.connect({
  name: 'onfill'
})
port.onMessage.addListener((msg) => {
  // None are sent yet
  console.log(msg)
})

const generateRandomAddress = () => {
  if (!emailDomain) {
    return null
  }
  const rand = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  return `${rand}@${emailDomain}`
}

const onload = () => {
  const emails = document.querySelectorAll('input[type="email"]')
  console.log('got emails', emails)
  emails.forEach((el) => {
    const address = generateRandomAddress()
    if (address) {
      el.value = address
      port.postMessage({
        address
      })
    }
  })
}
