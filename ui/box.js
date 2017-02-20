import { css } from 'glamor'
import { spacing } from './defs'

const flexbox = css({ display: 'flex' })
const flex = css({ flex: 1 })
const row = css({flexDirection: 'row'})
const column = css({flexDirection: 'column'})

const padding = {}
const sides = ['Top', 'Right', 'Bottom', 'Left']
sides.forEach(side => {
  padding[side] = {
    none: css({
      [`padding${side}`]: '0',
    }),
  }
  Object.keys(spacing).forEach(space => {
    padding[side][space] = css({
      [`padding${side}`]: spacing[space],
    })
  })
})

const paddingCss = (value) => {
  if (!Array.isArray(value)) {
    return css(...sides.map(side => padding[side][value]))
  }
  if (value.length === 2) {
    const top = padding.Top[value[0]]
    const bottom = padding.Bottom[value[0]]
    const left = padding.Left[value[1]]
    const right = padding.Right[value[1]]
    return css(top, bottom, left, right)
  }
  if (value.length === 4) {
    const top = padding.Top[value[0]]
    const right = padding.Right[value[1]]
    const bottom = padding.Bottom[value[2]]
    const left = padding.Left[value[3]]
    return css(top, bottom, left, right)
  }
}

export default props =>
  <div
    className={css(
      props.flexbox && flexbox,
      props.flex && flex,
      props.row && row,
      props.col && col,
      props.padding && paddingCss(props.padding)
    )}
    children={props.children}
  />
