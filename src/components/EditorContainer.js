import React, { Component, useState } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from './plugins/highlightPlugin';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import '../App.css';
import 'draft-js/dist/Draft.css';

const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions } = emojiPlugin;



const EditorContainer = () => {

const content = window.localStorage.getItem('content');

const [editorState, setEditorState] = useState( () => {
    if(content) {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
        return EditorState.createEmpty();
    }
});


 
const saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)))
}
  
 const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    saveContent(contentState);
    setEditorState(editorState);
   
  };

  const highlightPlugin = createHighlightPlugin(onChange);

  const plugins = [highlightPlugin, emojiPlugin];

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  const onUnderlineClick = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
    );
  };

  const onBoldClick = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "BOLD")
    );
  }

  const onItalicClick = () => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, "ITALIC")
    );
  };

  
    return (
      <div className="editorContainer">
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onBoldClick}><b>B</b></button>
        <button onClick={onItalicClick}>
          <em>I</em>
        </button>
        <div className="editors">
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            plugins={plugins}
          />
          <EmojiSuggestions/>
        </div>
      </div>
    )
  
}

export default EditorContainer;
