import { css } from 'glamor'
import { theme, white } from './color'

const style = css({
  height: 30,
  width: 80,
  fontSize: 12,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  borderRadius: 6,
  border: `1px solid ${theme.primary}`,
  backgroundColor: white[100],
  color: theme.primary,
  outline: 'none',
})

export default props => <button className={style} {...props}/>
