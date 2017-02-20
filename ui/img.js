import { css } from 'glamor'

const style = css({
  maxWidth: '100%',
  maxHeight: '500px',
  margin: '0 auto',
})

export default props => <img className={style} {...props}/>
