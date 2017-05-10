/* eslint-disable */
import styled, { css } from 'styled-components'

export default styled.div`
  // DISPLAY
  ${({ flex, block, inline }) => {
    if (inline) {
      if (block) return css`display: inline-block;`
      else if (flex) return css`display: inline-flex;`
      else return css`display: inline;`
    } else {
      if (flex) return css`display: flex;`
      if (block) return css`display: block;`
    }
  }}

  // FLEX
  ${(props) => {
    if (props.flex) {
      return css`
        flex-direction: ${(props) => {
          if (props.rowReverse) return 'rowReverse'
          if (props.column) return 'column'
          if (props.columnReverse) return 'columnReverse'
          return 'row'
        }}
        flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
        justify-content: ${props => props.justifyContent || 'flex-start'};
        align-items: ${props => props.alignItems || 'stretch'};
        align-content: ${props => props.alignContent || 'stretch'};
      `
    }
  }}

  // FLEX ITEM
  ${(props) => {
    if (props.flexNone) return css`flex: none;`
    if (props.flexVal) return css`flex: ${props.flexVal};`
  }}
  ${({ alignSelf }) => alignSelf && css`align-self: ${alignSelf};`}

  // POSITION
  ${({ absolute, relative }) => {
    if (absolute) return css`position: absolute;`
    if (relative) return css`position: relative;`
  }}

  // LAYER
  ${(props) => {
    if (props.layer) {
      return css`
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
      `
    }
  }}

  // SIZE
  ${(props) => {
    if (props.square) {
      return css`
        width: ${props => props.square};
        height: ${props => props.square};
      `
    } else {
      if (props.width) return css`width: ${props => props.width};`
      if (props.height) return css`height: ${props => props.height};`
    }
    if (props.margin) return css`margin: ${props => props.margin};`
    if (props.padding) return css`padding: ${props => props.padding};`
  }}

  // MISC
  ${(props) => {
    if (props.z || props.zIndex) return css`z-index: ${props => props.z || props.zIndex};`
    if (props.clickable) return css`cursor: pointer;`
  }}
`
