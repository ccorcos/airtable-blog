import { black, white, theme } from './color'
import { css } from 'glamor'

const header = css({
  marginTop: '1em',
  paddingTop: '1em',
  color: black[70],
})

export const H1 = props => <h1 className={header} {...props}/>

export const H2 = props => <h2 className={header} {...props}/>

export const H3 = props => <h3 className={header} {...props}/>

export const H4 = props => <h4 className={header} {...props}/>

export const H5 = props => <h5 className={header} {...props}/>

export const P = props => <p {...props}/>

export const Blockquote = props => <blockquote {...props}/>

const italic = css({
  fontStyle: 'italic',
})

const bold = css({
  fontWeight: 'bold',
})

const strikethrough = css({
  textDecoration: 'line-through',
})

export const Span = props => (
  <span
    className={css(
      props.italic && italic,
      props.bold && bold,
      props.strikethrough && strikethrough,
    )}
    children={props.children}
  />
)

const code = css({
  backgroundColor: white[90],
})

const inline = css({
  padding: '2px 4px',
})

const pre = css({
  backgroundColor: white[90],
  padding: '1em',
  overflowX: 'scroll',
  borderLeft: `2px solid ${theme.primary}`,
  borderBottom: `1px solid ${black[20]}`,
})

export const Code = props =>
  props.inline
  ? <code className={css(code, inline)} {...props}/>
  : <pre className={pre}><code className={code} {...props}/></pre>

const href = css({
  color: theme.primary,
})

export const A = props => <a className={href} {...props}/>

export const Hr = props => <hr {...props}/>

export const Br = props => <br {...props}/>
