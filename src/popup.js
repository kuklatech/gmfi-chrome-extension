document.addEventListener('DOMContentLoaded', async () => {
    const organizationNameElement = document.getElementById('organizationName')

    const data = await chrome.storage.sync.get(['current'])

    const contentElement = document.getElementById('content')
    const noContentElement = document.getElementById('no-content')
    const readMoreLinkElement = document.getElementById('read-more-link')
    const missionsElement = document.getElementById('missions')

    if (data.current) {
        const currentData = data.current
        const organization = currentData.organization
        const missions = currentData.missions

        contentElement.style.display = 'flex';
        noContentElement.style.display = 'none';
        organizationNameElement.innerHTML = organization.name

        readMoreLinkElement.setAttribute('href', `https://gmfindex.com/organization/${organization.id}`)

        missionsElement.innerHTML = missions.map(mission => mission.name).join(', ')
    } else {
        contentElement.style.display = 'none';
        noContentElement.style.display = 'flex';
    }
})
