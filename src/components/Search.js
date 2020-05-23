import React, {Component} from 'react';
import Table from './Table';
// API
const DEFAULT_QUERY = 'redux';
const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query='; 

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
    
        }
        this.onSearchChange         = this.onSearchChange.bind(this);
        this.setSearchTopStories    = this.setSearchTopStories.bind(this) ;
    }

    setSearchTopStories(result){ 
        this.setState({result});
    }

    componentDidMount(){
        const {searchTerm} = this.state;        
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error=> error);        
    }

    onSearchChange(event) { 
        this.setState({ searchTerm: event.target.value });
    }
    
    render() { 
        const {searchTerm, result} = this.state;
        if(!result)
           return null;

        return (
            <div>
                <form>
                    {this.props.children} <input type="text" onChange={this.onSearchChange} value={searchTerm}/>
                </form>
                <Table searchTerm={searchTerm} list={result}/>
            </div>
        );
    }
}
 
export default Search;