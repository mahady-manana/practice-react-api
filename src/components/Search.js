import React, {Component} from 'react';
import Table from './Table';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        }
        this.onSearchChange   = this.onSearchChange.bind(this);
    }

    onSearchChange(event) { 
        this.setState({ searchTerm: event.target.value });
    }
    
    render() { 
        const {searchTerm} = this.state;
        return (
            <div>
                <form>
                    <input type="text" onChange={this.onSearchChange} value={searchTerm}/>
                </form>
                <Table searchTerm={searchTerm}/>
            </div>
        );
    }
}
 
export default Search;