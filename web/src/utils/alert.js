export function showAlert(message, type = 'danger') {
  const alertContainer = document.getElementById('alert-container')

  const alert = document.createElement('div')
  alert.className = `alert alert-${type} alert-dismissible fade show`
  alert.role = 'alert'
  alert.innerHTML = `${message}`

  alertContainer.appendChild(alert)

  setTimeout(() => {
    alert.remove()
  }, 4000)
}
