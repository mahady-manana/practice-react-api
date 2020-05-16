import React,{Component} from 'react';
import './App.css';
const list = [
  {
    title: 'CSS',
    url: 'https ://facebook.github.io/react/',
    author: 'Jedese',
    num_comments: 1,
    points: 1,
    objectID: 0,
  },
  {
    title: 'HTML',
    url: 'https ://facebook.github.io/react/',
    author: 'Jordan',
    num_comments: 2,
    points: 2,
    objectID: 1,
  },
  {
    title: 'JS',
    url: 'https ://facebook.github.io/react/',
    author: 'Walke',
    num_comments: 3,
    points: 3,
    objectID: 3,
  },
  {
    title: 'React',
    url: 'https ://facebook.github.io/react/',
    author: 'Waes',
    num_comments: 4,
    points: 4,
    objectID: 4,
  }
];
//foncions d'ordre supérieur
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: '',
    };
    //bindings
    this.onDismiss      = this.onDismiss.bind(this); 
    this.onSearchChange   = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId     = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  } 
  onSearchChange(event) {
    console.log(event)
    this.setState({ searchTerm: event.target.value });
  }
  render() {
    //Destructring
    const {list,searchTerm} = this.state;
    return (
      <div className="App">
        <form>
          <input type="text" onChange={this.onSearchChange} value={searchTerm}/>
        </form>
        {
          list.filter( isSearched(searchTerm) ).map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>-
              <span>{item.author}</span>-
              <span>{item.num_comments}</span>-
              <span>{item.points}</span>-
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
      </div>
    )
  }
}

export default App;
