import { Notify } from 'quasar'

const notify = {
  warning: function (message, position) {
    Notify.create({
      message: message,
      color: 'warning',
      icon: 'warning',
      position: position
    })
  },
  danger: function (message, position) {
    Notify.create({
      message: message,
      color: 'negative',
      icon: 'sentiment_very_dissatisfied',
      position: position
    })
  },
  success: function (message, position) {
    Notify.create({
      message: message,
      color: 'positive',
      icon: 'tag_faces',
      position: position
    })
  }
}

export default notify
