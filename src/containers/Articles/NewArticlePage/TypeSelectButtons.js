import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'components/styled';
import FlatButton from 'material-ui/FlatButton';

const TypeSelectButtons = ({ type, onChange }) => (
  <List right>
    <FlatButton
      label="Own article"
      primary={type === 'own'}
      onTouchTap={() => onChange('own')}
    />
    <FlatButton
      label="External article"
      primary={type === 'external'}
      onTouchTap={() => onChange('external')}
    />
  </List>
);

TypeSelectButtons.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TypeSelectButtons;
