import Layout from '../ui/layout'
import Nav from '../ui/nav'
import Article from '../ui/article'
import Box from '../ui/box'
import { A, H2, Span } from '../ui/typography'
import List from '../ui/list'
import markdown from '../markdown'

export default class extends React.PureComponent {
  static async getInitialProps({req, query: {id}}) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : ''
    const response = await fetch(baseUrl + `/api/v1/posts/${id}`)
    const data = await response.json()
    return { data }
  }
  renderPost() {
    if (!this.props.data) {
      return 'Loading...'
    }
    const record = this.props.data
    return markdown(record.fields.Markdown)
  }
  render() {
    return (
      <Layout>
        <Nav>
          <Nav.Title>Airtable Blog</Nav.Title>
        </Nav>
        <Article>
          {this.renderPost()}
        </Article>
      </Layout>
    )
  }
}