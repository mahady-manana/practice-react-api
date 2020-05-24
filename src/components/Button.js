import React from 'react';
const Button = ({ onClick, children, className = "", type = "button" }) =>
                <button onClick={onClick} type={type} className={className}>
                    {children !== undefined ? children : ""}
                </button>
export default Button;
