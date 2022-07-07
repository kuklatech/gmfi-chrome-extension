chrome.runtime.onInstalled.addListener(() => {
  console.log("installed")
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    const url = new URL(tabs[0].url)
    const hostname = url.hostname

    const parts = hostname.split('.');
    const sndleveldomain = parts.slice(-2).join('.');

    const apiUrl = `https://gmfindex.com/api/check-url?url=${sndleveldomain}`

    fetch(apiUrl).then((response) => response.json()).then(data => {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        deleteContent()
        markInactive()
      } else {
        updateContent(data)
        markActive()
      }
    }).catch(err => {
      deleteContent()
      markInactive()
    })
  });
})

const markActive = () => {
  chrome.action.setIcon({ path: "/images/logo-active/logo-active-with-badge-128.png" });
}

const markInactive = () => {
  const path = "/images/logo-inactive/logo-inactive-with-badge-128.png"
  chrome.action.setIcon({ path });
}

const updateContent = (data) => {
  chrome.storage.sync.set({current: data})
}

const deleteContent = () => {
  chrome.storage.sync.set({current: null})
}
