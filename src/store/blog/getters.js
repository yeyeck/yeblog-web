
export function loginShow (state) {
  return state.loginShow
}

export function site (state) {
  return state.site
}

export function hasNavigations (state) {
  const navigations = state.navigations
  return navigations && navigations.length > 0
}

export function hasFooters (state) {
  const footers = state.footers
  return footers && footers.length > 0
}

export function navigations (state) {
  return state.navigations
}

export function footers (state) {
  return state.footers
}

export function friends (state) {
  return state.friends
}

export function top10 (state) {
  return state.top10
}

export function statistics (state) {
  return state.statistics
}
