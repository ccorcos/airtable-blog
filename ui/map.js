import { css } from 'glamor'
import querystring from 'query-string'

const baseUrl = 'https://www.google.com/maps/embed/v1/place?'
const apiKey = 'AIzaSyB9xiyN1VpwGnsG95l1e_XgktvzQnAfKlA'

const mapStyle = css({
  border: 'none'
})

export default (props) =>
  <iframe
    width="100%"
    frameBorder="0"
    className={mapStyle}
    allowFullScreen
    src={baseUrl + querystring.stringify({
      key: apiKey,
      q: props.query,
    })}
  />