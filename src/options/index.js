/* global chrome */

const id = (i) => {
  return document.getElementById(i)
}

const save = () => {
  chrome.storage.sync.set({
    settings: {
      domain: id('input').value
    }
  }, () => {
    id('feedback').innerText = 'Saved!'
  })
}

const makeButton = (h, tr) => {
  const btn = document.createElement('button')
  btn.innerText = 'X'
  btn.onclick = () => {
    chrome.storage.sync.remove(h, () => {
      tr.remove()
    })
  }
  return btn
}

const showTable = (obj) => {
  const table = id('table')
  let hostnames = Object.keys(obj).filter((s) => s !== 'settings')
  hostnames = hostnames.sort()

  hostnames.forEach((h) => {
    const tr = document.createElement('tr')

    const col1 = document.createElement('td')
    const a = document.createElement('a')
    const scheme = obj[h].secure ? 'https://' : 'http://'
    a.href = `${scheme}${h}`
    a.innerText = obj[h].address
    col1.appendChild(a)

    const col2 = document.createElement('td')
    col2.appendChild(makeButton(h, tr))

    tr.appendChild(col1)
    tr.appendChild(col2)
    table.appendChild(tr)
  })
}

chrome.storage.sync.get(null, (obj) => {
  console.log(obj)
  const domain = obj.settings ? obj.settings.domain : null
  if (domain) {
    id('input').value = domain
    showTable(obj)
  }
})

id('save').onclick = save
id('input').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    save()
  }
})
id('reset').onclick = () => {
  chrome.storage.sync.clear(() => {
    window.location.reload()
  })
}
