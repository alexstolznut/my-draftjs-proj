import React, { Component } from 'react';
import './App.css';
import EditorContainer from './components/EditorContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <EditorContainer />
      </div>
    );
  }
}

export default App;