import Parser from './parser'
import Renderer from './renderer'
export default markdown => Renderer.render(Parser.parse(markdown))
