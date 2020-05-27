import React, {Component} from 'react';
import Table from './Table';
import Button from './Button';
// API
const DEFAULT_QUERY = 'redux';
const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query=';
const PARAM_PAGE    = 'page=';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,

        }
        this.onSearchChange         = this.onSearchChange.bind(this);
        this.setSearchTopStories    = this.setSearchTopStories.bind(this) ;
        this.fetchSearchTopStories  = this.fetchSearchTopStories.bind(this);
        this.onSearchSubmit         = this.onSearchSubmit.bind(this);
    }

    setSearchTopStories(result){ 
        const {hits,page}   = result;
        const oldResult     = page !== 0 ? this.state.result.hits : [];
        const updateList    = [...oldResult,...hits];
        this.setState({
            result:{hits :updateList,page}
        });
    }

    componentDidMount(){
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const {searchTerm, result} = this.state;        
        const page = (result && result.page) || 0;
        if(!result)
           return <div>Aucune donnée</div>;

        return (
            <div>
                <form onSubmit={this.onSearchSubmit}>
                    {this.props.children}
                    <input type="text" onChange={this.onSearchChange} value={searchTerm}/>
                    <Button type="submit">
                        find
                    </Button>
                </form>
                <Table searchTerm={searchTerm} list={result}/>
                <div>
                    <Button onClick={()=>this.fetchSearchTopStories(searchTerm,page+1)}>
                        Voir plus
                    </Button>
                </div>
            </div>
        );
    }
}

export default Search;
