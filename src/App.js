import React,{Component} from 'react';
import './App.css';
const list = [
  {
    title: 'React',
    url: 'https ://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'React',
    url: 'https ://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1,
  }
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
    };
    //bindings
    this.doSomething = this.doSomething.bind(this);
    this.doSomethingElse = this.doSomethingElse.bind(this);
    this.onClickMe = this.onClickMe.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;

    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  doSomething() {
    // faire quelque chose
  }
  doSomethingElse() {
    // faire autre chose
  }
  onClickMe() {
    console.log(this);
  }
  render() {
    return (
      <div className="App">
        {
          this.state.list.map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
          )
        }
        <button
          onClick={this.onClickMe}
          type="button"
          >
          Click Me
        </button>
      </div>
    )
  }
}

export default App;
