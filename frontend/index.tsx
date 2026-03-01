/* @refresh reload */

import 'solid-devtools'
import './assets/index.css'
import './assets/scrollbar.css'
import './assets/button.css'
import './assets/video.css'
import './assets/animation.css'

import { render } from 'solid-js/web'

import App from './app'
import { Router } from '@solidjs/router'
import routes from '~solid-pages'

render(
  () => <Router root={(props) => <App>{props.children}</App>}>{routes}</Router>,
  document.getElementById('root')!,
)
