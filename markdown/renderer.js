import { AstRenderer, MarkdownParser } from 'markdown-it-renderer'

import { H1, H2, H3, H4, H5, P, Blockquote, Span, Code, A, Hr, Br } from '../ui/typography'
import Table from '../ui/table'
import List from '../ui/list'
import Img from '../ui/img'
import Box from '../ui/box'

class PassThrough extends React.Component {
  render() {
    return React.Children.only(this.props.children)
  }
}

export default new AstRenderer({
  root: children => <Box children={children}/>,
  text: value => value,
  a: (props, children) => <A {...props} children={children}/>,
  h1: (props, children) => <H1 {...props} children={children}/>,
  h2: (props, children) => <H2 {...props} children={children}/>,
  h3: (props, children) => <H3 {...props} children={children}/>,
  h4: (props, children) => <H4 {...props} children={children}/>,
  h5: (props, children) => <H5 {...props} children={children}/>,
  p: (props, children) => <P {...props} children={children}/>,
  span: (props, children) => <Span {...props} children={children}/>,
  small: (props, children) => <Span {...props} children={children}/>,
  strong: (props, children) => <Span {...props} bold children={children}/>,
  em: (props, children) => <Span {...props} italic children={children}/>,
  del: (props, children) => <Span {...props} strikethrough children={children}/>,
  blockquote: (props, children) => <Blockquote {...props} children={children}/>,
  code: (props, children) => <Code {...props} children={children}/>,
  pre: (props, children) => <PassThrough {...props} children={children}/>,
  a: (props, children) => <A {...props} children={children}/>,
  table: (props, children) => <Table {...props} children={children}/>,
  th: (props, children) => <Table.Header {...props} children={children}/>,
  tr: (props, children) => <Table.Row {...props} children={children}/>,
  td: (props, children) => <Table.Cell {...props} children={children}/>,
  ul: (props, children) => <List {...props} children={children}/>,
  ol: (props, children) => <List {...props} children={children} ordered/>,
  li: (props, children) => <List.Item {...props} children={children}/>,
  hr: (props, children) => <Hr {...props} children={children}/>,
  br: (props, children) => <Br {...props} children={children}/>,
  img: (props) => <Img {...props}/>,
})
