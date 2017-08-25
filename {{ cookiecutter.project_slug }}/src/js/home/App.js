import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div className="{{cookiecutter.project_slug}}-app">
         <h2>Let's get this started!</h2>
       </div>
    )
  }
}

export default App;

