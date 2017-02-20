import { css } from 'glamor'
import { black } from './color'

const style = css({
  width: '100%',
  maxWidth: '40em',
  margin: '0 auto',
  color: black[50],
  padding: 8,
})

export default props => <article className={style} {...props}/>
