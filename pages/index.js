import Router from 'next/router'
import Layout from '../ui/layout'
import Nav from '../ui/nav'
import Article from '../ui/article'
import Box from '../ui/box'
import { A, H2, Span } from '../ui/typography'
import List from '../ui/list'
import Button from '../ui/button'
import Link from '../ui/link'
import Map from '../ui/map'

export default class extends React.PureComponent {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : ''
    const response = await fetch(baseUrl + '/api/v1/posts')
    const data = await response.json()
    return { data }
  }
  constructor(props) {
    super(props)
    this.onClick = this._onClick.bind(this)
  }
  renderList() {
    if (!this.props.data) {
      return 'Loading...'
    }
    return (
      <List>
        {this.props.data.records.map(record =>
          <List.Item key={record.id}>
            <Link route={`/post?id=${record.id}`} path={`/posts/${record.id}`} key={record.id}>
              <Span bold>{record.fields.Name}</Span>
            </Link>
            <Span>{' published on '  + record.fields["Date Published"]}</Span>
          </List.Item>
        )}
      </List>
    )
  }
  _onClick() {
    Router.push('/editor')
  }
  render() {
    return (
      <Layout>
        <Nav>
          <Nav.Title>Airtable Blog</Nav.Title>
          <Nav.Aside>
            <Button onClick={this.onClick}>
              Editor
            </Button>
          </Nav.Aside>
        </Nav>
        <Article>
          {this.renderList()}
        </Article>
      </Layout>
    )
  }
}
