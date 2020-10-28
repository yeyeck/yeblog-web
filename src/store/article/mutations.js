// article: {
//   id: -1,
//   title: '',
//   content: '',
//   views: 0,
//   countComments: 0,
//   updateTime: -1
// }
export function setArticle (state, payload) {
  state.article.id = payload.id
  state.article.title = payload.title
  state.article.content = payload.contentHtml
  state.article.keywords = payload.keywords
  state.article.views = payload.views
  state.article.countComments = payload.countComments ? payload.countComments : 0
  state.article.updateTime = payload.updateTime
  state.article.labels = payload.labels
  state.article.abstractText = payload.abstractText
}

export function setTitles (state, payload) {
  state.titles = []
  payload.forEach(element => {
    state.titles.push(element)
  })
}

export function setComments (state, payload) {
  state.comments = []
  payload.forEach(element => {
    state.comments.push(element)
  })
}
export function addComment (state, payload) {
  state.comments.push(payload)
}

export function addReply (state, payload) {
  const comments = state.comments
  comments.forEach(comment => {
    if (comment.id === payload.parentId) {
      comment.replies.push(payload)
    }
  })
}

export function setPrevious (state, payload) {
  state.previous = payload
}

export function setNext (state, payload) {
  state.next = payload
}
