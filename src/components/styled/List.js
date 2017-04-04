/*
  Horizontal list that takes care of applying margins to its children
*/

import styled, { css } from 'styled-components';

const margin = '10px !important';

const List = styled.div`
  display: flex;
  justify-content: ${props => props.right ? 'flex-end' : 'flex-start'};
  ${(props) => {
    if (props.left) {
      return css`
        > *:not(:first-child) {
          margin-left: ${() => margin};
        }
      `;
    } else if (props.right) {
      return css`
        > *:not(:last-child) {
          margin-right: ${() => margin};
        }
      `;
    }
  }}
`;

export default List;
