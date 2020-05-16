import React, {Component} from 'react'; 
import Button from './Button';
//data
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

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,  
        }
        this.onDismiss      = this.onDismiss.bind(this); 
    }

    onDismiss(id) {
      const isNotId     = item => item.objectID !== id;
      const updatedList = this.state.list.filter(isNotId);
      this.setState({ list: updatedList }); 
    }
    
    render() {  
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
                       this.state.list.filter( isSearched(this.props.searchTerm) ).map(item => 
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