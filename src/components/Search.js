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
            results: null,
            searchTerm: DEFAULT_QUERY,
            searchKey: ''
        }

        this.onSearchChange         = this.onSearchChange.bind(this);
        this.setSearchTopStories    = this.setSearchTopStories.bind(this) ;
        this.fetchSearchTopStories  = this.fetchSearchTopStories.bind(this);
        this.onSearchSubmit         = this.onSearchSubmit.bind(this);
        this.dataExist              = this.dataExist.bind(this);
        this.deletiavo              = this.deletiavo.bind(this);
    }

    setSearchTopStories(result){ 
        const { hits, page } = result;
        const { results, searchKey } = this.state;
        const oldHits           = results && results[searchKey] ? results[searchKey].hits : [];
        const updatedHits       = [ ...oldHits,...hits ];
        
        this.setState({
            results: { 
                ...results, 
                [searchKey]: { hits : updatedHits, page } 
            }
        });
    }

    deletiavo(id) {
        const { results, searchKey } = this.state;
        const { hits, page } = results[searchKey];
        const isNotId       = item => item.objectID !== id;        
        const updatedList   = hits.filter(isNotId); 
        
        this.setState({
            results: { ...results, [searchKey] : {hits: updatedList, page} }
        }); 
    }

    componentDidMount(){
        const {searchTerm} = this.state;
        this.setState({ searchKey: searchTerm });
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
        this.setState({ searchKey : searchTerm });

        if(!this.dataExist(searchTerm))
            this.fetchSearchTopStories(searchTerm);
        
        event.preventDefault();
    }

    dataExist(searchTerm){ 
        return this.state.results[searchTerm];
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, results, searchKey } = this.state;        
        const page = ( results && results[searchKey] && results[searchKey].page ) || 0;
        const list = (results && results[searchKey] && results[searchKey].hits) || [];// 
        
        if(!results)
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
                <Table list={list} deletiavo={this.deletiavo}/>
                <div>
                    <Button onClick={()=>this.fetchSearchTopStories(searchKey, page+1)}>
                        Voir plus
                    </Button>
                </div>
            </div>
        );
    }
}

export default Search;
