import Noti from 'svelma/src/components/Notification'

export const showNotification = (content: string) => {
  Noti.create({
    message: content,
    type: 'is-danger',
  })
}
