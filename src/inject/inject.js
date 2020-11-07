/* global chrome */

const hostname = window.location.hostname
let store = {}

chrome.storage.sync.get(null, (obj) => {
  const domain = obj.settings ? obj.settings.domain : null
  if (!domain) {
    console.log(`Email domain is not set. Open chrome-extension://${chrome.runtime.id}/src/options/index.html to set it.`)
  } else {
    store = obj
    onload(domain)
  }
})

const generateAddress = (domain) => {
  if (!domain || !hostname) {
    return null
  }
  const alias = hostname.split('.').reverse().join('.')
  return `${alias}@${domain}`
}

const saveAlias = (address) => {
  chrome.storage.sync.set({
    [hostname]: {
      address,
      secure: window.location.protocol === 'https:',
      timestamp: Date.now()
    }
  })
}

const onload = (domain) => {
  const emails = document.querySelectorAll('input[type="email"]')
  if (emails.length) {
    const existing = store[hostname]
    const address = existing ? existing.address : generateAddress(domain)
    if (address) {
      emails.forEach((el) => {
        el.value = address
      })
      if (!existing) {
        saveAlias(address)
      }
    }
  }
}
