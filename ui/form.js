import { css } from 'glamor'
import { black } from './color'

const formStyle = css({
  width: '100%',
  maxWidth: '300px',
  margin: '36px auto',
})

const Form = props => <form className={formStyle} {...props}/>

export default Form
