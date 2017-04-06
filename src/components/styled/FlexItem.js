import styled from 'styled-components';

const FlexItem = styled.div`
  flex: ${props => props.flex};
  align-self: ${props => props.alignItems || 'auto'};
`;

export default FlexItem;
