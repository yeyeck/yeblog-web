export function showLogin (state) {
  state.loginShow = true
}

export function closeLogin (state, payload) {
  state.loginShow = payload
}

export function setSiteInfo (state, payload) {
  const site = state.site
  site.siteName = payload.siteName
  site.icpRecord = payload.icpRecord
  site.icpRecordUrl = payload.icpRecordUrl
  site.psRecord = payload.psRecord
  site.psRecordUrl = payload.psRecordUrl
  site.keywords = payload.keywords
  site.description = payload.description
  site.domain = payload.domain
}

export function setNavigations (state, payload) {
  state.navigations = []
  payload.forEach(link => {
    state.navigations.push(link)
  })
}

export function setFooters (state, payload) {
  state.footers = []
  payload.forEach(link => {
    state.footers.push(link)
  })
}

export function setFriends (state, payload) {
  state.friends = []
  payload.forEach(link => {
    state.friends.push(link)
  })
}

export function setTop10 (state, payload) {
  state.top10 = []
  payload.forEach(article => {
    state.top10.push(article)
  })
}

export function setStatistics (state, payload) {
  const statistics = state.statistics
  statistics.totalArticles = payload.totalArticles
  statistics.totalViews = payload.totalViews
  statistics.totalComments = payload.totalComments
}
