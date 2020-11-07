/* global chrome */

const id = (i) => {
  return document.getElementById(i)
}

chrome.storage.sync.get('domain', (obj) => {
  const domain = obj.domain
  if (domain) {
    id('input').value = domain
  }
})

id('save').onclick = () => {
  chrome.storage.sync.set({
    domain: id('input').value
  }, () => {
    id('feedback').innerText = 'Saved!'
  })
}
