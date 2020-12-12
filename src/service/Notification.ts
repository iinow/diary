import Noti from 'svelma/src/components/Notification'

export const showNotification = (event: MouseEvent, content: string) => {
  Noti.create({
    message: content,
  })
}
