import React from 'react'

const Form = props =>{
    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors
    } = props

    return(
        <form className="container" onSubmit={onSubmit}>
            <h2>New User Form</h2>

            <label htmlFor="name">
                Name<br></br>
                <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    onChange={onInputChange}
                    value={values.name} 
                />
            </label>

            <label htmlFor="email">
                Email<br></br>
                <input 
                    id="email" 
                    name="email" 
                    type="email"
                    onChange={onInputChange} 
                    value={values.email} 
                />
            </label>

            <label htmlFor="password">
                Password<br></br>
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    onChange={onInputChange} 
                    value={values.password} 
                />
            </label>

            <label htmlFor="terms">
                <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox"
                    onChange={onCheckboxChange}
                    checked={values.terms}
                /> Agree to Terms of Service
            </label>

            <button type="submit" disabled={disabled}>Submit</button>

        </form>
    )
}

export default Form