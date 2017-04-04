import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import editorStyles from './CommentEditor.scss';
// import 'draft-js-hashtag-plugin/lib/plugin.css';

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];
const text = `#TIL: This editor can have all sorts of #hashtags. Pretty #cool :)
Try it yourself by starting a word with a # (hash character) …
`;

export default class CommentEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text)
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  focus = () => {
    this.editor.focus();
  }

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  }
}
