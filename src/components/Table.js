import React, {Component} from 'react';
import Button from './Button';
class Table extends Component {
    render() {
        const { list, deletiavo } = this.props;
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
                       list.map(item =>
                            <tr key={item.objectID}>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>
                                    <span>
                                        <Button onClick={ () => deletiavo(item.objectID) }>
                                            Del.
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
