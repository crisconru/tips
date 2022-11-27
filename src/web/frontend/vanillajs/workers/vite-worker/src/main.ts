import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <button id="apreta">Apreta</button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const worker = new Worker('./src/worker.ts')
worker.onmessage = (ev) => {
  console.log('llamado desde el service worker -> ' + ev.data)
}

const sentToTheWorker = () => {
  const time = Date.now()
  worker.postMessage(`Son las ${time}`)
  console.log('apretao el boton')
}

const btn: HTMLButtonElement | null = document.querySelector('#apreta')
if (btn) {
  btn.onclick = (ev) => {
    console.log(ev)
    sentToTheWorker()
  }
  console.log('cargado')
}
