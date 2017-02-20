import Router from 'next/router'
import { css } from 'glamor'
import { theme } from './color'

const linkStyle = css({
  color: theme.primary,
  cursor: 'pointer',
})

class Link extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onClick = this._onClick.bind(this)
  }
  _onClick() {
    const {route, path} = this.props
    Router.push(route, path)
  }
  render() {
    const {path, route, ...props} = this.props
    return (
      <a
        onClick={this.onClick}
        className={linkStyle}
        {...props}
      />
    )
  }
}

export default Link
