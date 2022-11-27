postMessage('Worker is alive')


onmessage = (event) =>{
  postMessage('Al habla el service worker')
}
