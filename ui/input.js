import { css } from 'glamor'
import { theme, white, black } from './color'

const style = css({
  height: 30,
  fontSize: 12,
  borderRadius: 6,
  border: `1px solid ${theme.primary}`,
  backgroundColor: white[100],
  color: black[100],
  outline: 'none',
  padding: '0 6px',
  width: '100%',
  boxSizing: 'border-box',
})

export default props => <input className={style} {...props}/>
