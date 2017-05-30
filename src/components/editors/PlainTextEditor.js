import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate';

/**
 * Define a schema.
 *
 * @type {Object}
 */

/* eslint-disable */
const schema = {
  nodes: {
    'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
  },
  marks: {
    bold: {
      fontWeight: 'bold'
    },
    code: {
      fontFamily: 'monospace',
      backgroundColor: '#eee',
      padding: '3px',
      borderRadius: '4px'
    },
    italic: {
      fontStyle: 'italic'
    },
    underlined: {
      textDecoration: 'underline'
    }
  }
};
/* eslint-enable */

/**
 * The rich text example.
 *
 * @type {Component}
 */

class PlainTextEditor extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    state: PropTypes.object,
    style: PropTypes.object,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    placeholder: '',
    style: {},
    onChange: () => {}
  }

  /**
   * Deserialize the initial editor state.
   *
   * @type {Object}
   */

  state = {
    state: this.props.state
  };

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = (state) => {
    this.props.onChange(state);
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          spellCheck
          placeholder={this.props.placeholder}
          schema={schema}
          state={this.props.state}
          onChange={this.onChange}
          readOnly={this.props.readOnly}
        />
      </div>
    );
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render = () => {
    require('./PlainTextEditor.scss');

    return (
      <div
        className="PlainTextEditor"
        style={this.props.style}
      >
        {this.renderEditor()}
      </div>
    );
  }
}

/**
 * Export.
 */

export default PlainTextEditor;
