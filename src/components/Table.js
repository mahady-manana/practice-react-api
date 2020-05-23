import React, {Component} from 'react'; 
import Button from './Button'; 
//foncions d'ordre supérieur
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultat: this.props.list,  
        }
        this.onDismiss      = this.onDismiss.bind(this); 
    }

    onDismiss(id) {
        const {resultat}    = this.state;
        const isNotId       = item => item.objectID !== id;
        const updatedList   = resultat.hits.filter(isNotId);
        this.setState({ 
            resultat: {...resultat,hits:updatedList}  
        });  
    }
    
    render() {  
        const {resultat} = this.state;
        return (
             <table>
                 <thead> 
                     <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>actions</th>
                     </tr>
                 </thead>
                 <tbody>
                    { 
                       resultat.hits.filter( isSearched(this.props.searchTerm) ).map(item => 
                            <tr key={item.objectID}>
                                <td>{item.title}</td>
                                <td>{item.author}</td> 
                                <td>
                                    <span>
                                        <Button onClick={()=>this.onDismiss(item.objectID)}>
                                            del.
                                        </Button> 
                                    </span>
                                </td>
                            </tr>
                       )
                    }
                 </tbody>
             </table>
        );
    }
}
 
export default Table;