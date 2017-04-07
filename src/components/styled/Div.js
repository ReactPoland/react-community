import styled from 'styled-components';

const Div = styled.div`
  // POSITION
  position: ${props => {
    if (props.absolute) return 'absolute';
    if (props.relative) return 'relative';
    return 'static';
  }};
  // SIZE
  width: ${props => {
    if (props.square) return `${props.square}px`;
    return 'auto';
  }};
  height: ${props => {
    if (props.square) return `${props.square}px`;
    return 'auto';
  }};
  // DISPLAY
  display: ${props => {
    if (props.flex) return 'flex';
    if (props.flex && props.inline) return 'inline-flex';
    if (props.block) return 'block';
    if (props.block && props.inline) return 'inline-block';
    if (props.inline) return 'inline';
    return 'block';
  }};
  // FLEX
  flex-direction: ${props => {
    if (props.rowReverse) return 'rowReverse';
    if (props.column) return 'column';
    if (props.columnReverse) return 'columnReverse';
    return 'row';
  }};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  align-content: ${props => props.alignContent || 'stretch'};
  // FLEX ITEM
  flex: ${props => props.flexVal};
  align-self: ${props => props.alignItems || 'auto'};
  // LAYER
  position: ${props => props.layer ? 'absolute' : 'static'};
  top: ${props => props.layer ? '0' : 'auto'};
  right: ${props => props.layer ? '0' : 'auto'};
  bottom: ${props => props.layer ? '0' : 'auto'};
  left: ${props => props.layer ? '0' : 'auto'};
  //MISC
  z-index: ${props => props.z !== undefined ? props.z : 'auto'};
  cursor: ${props => props.clickable ? 'pointer' : 'auto'};
`;

export default Div;
