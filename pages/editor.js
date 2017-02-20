import Router from 'next/router'
import markdown from '../markdown'
import Layout from '../ui/layout'
import Nav from '../ui/nav'
import Box from '../ui/box'
import Textarea from '../ui/textarea'
import Button from '../ui/button'
import Form from '../ui/form'
import Input from '../ui/input'

function throttle(ms, fn) {
  let timerId = undefined
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(function() {
      fn(...args)
    }, ms)
  }
}

function isoDate() {
  return (new Date()).toLocaleString('en-GB').slice(0,10).split("\/").reverse().join("-")
}

const initial = [
  '# Title',
  '',
  'Write your *markdown* here!'
].join('\n')

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      markdown: initial,
      output: markdown(initial),
      saving: false,
      password: '',
      auth: false,
    }
    this.onChangeTextArea = this._onChangeTextArea.bind(this)
    this.onChangePassword = this._onChangePassword.bind(this)
    this.onPublish = this._onPublish.bind(this)
    this.onLogin = this._onLogin.bind(this)
    this.recompile = throttle(200, this._recompile.bind(this))
  }
  async _onLogin(e) {
    e.preventDefault()
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({password: this.state.password})
    })
    const data = await response.json()
    if (data.auth) {
      this.setState({auth: true})
    } else {
      alert('Wrong password')
    }
  }
  async _onPublish() {
    const matchTitle = this.state.markdown.match(/#+\s*([^\n]+)/)
    if (!matchTitle) {
      alert('Could not find a heading')
      return
    }
    const title = matchTitle[1]
    this.setState({saving: true})
    const response = await fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        password: this.state.password,
        Name: title,
        'Date Published': isoDate(),
        Markdown: this.state.markdown,
      })
    })
    const { id } = await response.json()
    Router.push(`/post?id=${id}`, `/posts/${id}`)
  }
  _onChangeTextArea(event) {
    const markdown = event.target.value
    this.setState({ markdown })
    this.recompile(markdown)
  }
  _recompile(string) {
    this.setState({ output: markdown(string) })
  }
  _onChangePassword(event) {
    this.setState({password: event.target.value})
  }
  renderLogin() {
    return (
      <Form onSubmit={this.onLogin}>
        <Box flexbox row>
          <Box flex padding={['none', 'medium', 'none', 'none']}>
            <Input
              placeholder="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </Box>
          <Box>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </Form>
    )
  }
  renderEditor() {
    return (
      <Box flexbox row>
        <Box flex>
          <Textarea
            disabled={this.state.saving}
            value={this.state.markdown}
            onChange={this.onChangeTextArea}
          />
        </Box>
        <Box flex>
          {this.state.output}
        </Box>
      </Box>
    )
  }
  render() {
    return (
      <Layout>
        <Nav>
          <Nav.Title>Airtable Blog</Nav.Title>
          {
            this.state.auth && (
              <Nav.Aside>
                <Button
                  disabled={this.state.saving}
                  onClick={this.onPublish}
                >
                  Publish
                </Button>
              </Nav.Aside>
            )
          }
        </Nav>
        {
          this.state.auth
          ? this.renderEditor()
          : this.renderLogin()
        }
      </Layout>
    )
  }
}