import React from 'react'

const Input = (props) => {
    let input = props.area ? 
        <textarea
            name={props.name}
            type="text"
            onChange={props.onChange}
            value={props.value}
            required /> : 
        <input
            name={props.name}
            type="text"
            onChange={props.onChange}
            value={props.value}
            required />
    return (
        <label>
            {props.description}:
            {input} <br/>
        </label> 
    );
}

export default Input;