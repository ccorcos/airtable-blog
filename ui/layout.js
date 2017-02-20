import { css } from 'glamor'
import { navHeight } from './defs'

css.global('html, body', {
  margin: 0,
})

css.global('body', {
  fontFamily: ["Helvetica", "Arial", 'sans-serif'],
  lineHeight: '1.5em',
  paddingTop: navHeight,
})

export default (props) => (
  <main>
    {props.children}
  </main>
)