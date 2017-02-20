import { css } from 'glamor'
import { black } from './color'

const style = css({
  width: '100%',
  maxWidth: '40em',
  margin: '0 auto',
  color: black[50],
  fontSize: '1em',
  boxSizing: 'border-box',
  height: '100%',
  minHeight: '300px',
  border: 'none',
  outline: 'none',
  resize: 'none',
  padding: 16,
  fontFamily: 'sans-serif',
  color: black[100],
})

export default props => <textarea className={style} {...props}/>
