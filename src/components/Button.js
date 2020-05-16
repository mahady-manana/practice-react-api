import React, { Component } from 'react';
class Button extends Component {
    render() { 
        const {onClick,children,className = ''} = this.props;
        return (
            <button onClick={onClick} type="button" className={className}>  
                {children !== undefined ? children : ""}
            </button>
        );
    }
}
 
export default Button;