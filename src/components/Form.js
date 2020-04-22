import React from 'react'

const Form = props =>{
    const {
        name,
        email,
        password,
        terms,
        onInputChange,
        onSubmit

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
                    value={name} 
                />
            </label>

            <label htmlFor="email">
                Email<br></br>
                <input 
                    id="email" 
                    name="email" 
                    type="email"
                    onChange={onInputChange} 
                    value={email} 
                />
            </label>

            <label htmlFor="password">
                Password<br></br>
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    onChange={onInputChange} 
                    value={password} 
                />
            </label>

            <label htmlFor="ToS">
                <input 
                    id="ToS" 
                    name="terms" 
                    type="checkbox"
                    onChange={onInputChange}
                    checked={terms} 
                /> Agree to Terms of Service
            </label>

            <button type="submit">Submit</button>

        </form>
    )
}

export default Form