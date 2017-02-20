import { css } from 'glamor'
import { theme, white } from './color'
import { navHeight } from './defs'

const navStyle = css({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: navHeight,
  backgroundColor: theme.primary,
})

const Nav = props =>
  <nav className={navStyle} {...props}>{props.children}</nav>


const titleStyle = css({
  fontWeight: 'bold',
  fontSize: 24,
  paddingLeft: 16,
  lineHeight: navHeight + 'px',
  color: white[100],
  textDecoration: 'none',
})

Nav.Title = props => <a href='/' className={titleStyle} {...props}>{props.children}</a>

const asideStyle = css({
  position: 'absolute',
  top: 0,
  right: 16,
  height: navHeight,
  lineHeight: navHeight + 'px',
})

Nav.Aside = props =>
  <div
    className={asideStyle}
    children={props.children}
  />

export default Nav