import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default ({ style = {} }) => (
  <Spinner style={style}>
    <CircularProgress size={60} thickness={7} />
  </Spinner>
);
