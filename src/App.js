import React,{Component} from 'react';  
import Search from './components/Search';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Clock from './components/Clock';
class App extends Component {  
  render() { 
    return (
      <div className="App">
        <Clock/>
        <Search>
          tadiavo : 
        </Search>   
      </div>
    )
  }
}

export default App;
