import React, {Component} from 'react';
import Button from './Button';
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

    componentWillReceiveProps(nextProps){
        if (nextProps.list !== this.props.list){
            this.setState({
                resultat: nextProps.list,
            });
        }
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
                       resultat.hits.map(item =>
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
