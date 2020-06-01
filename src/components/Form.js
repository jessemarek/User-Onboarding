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

            <label htmlFor="name"> {/* Input for User Name */}
                Name<br></br>
                <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    onChange={onInputChange}
                    value={values.name} 
                />
                {errors.name.length > 3 ? (<p className="error">{errors.name}</p>) : null}
            </label>

            <label htmlFor="email"> {/* Input for User Email */}
                Email<br></br>
                <input 
                    id="email" 
                    name="email" 
                    type="email"
                    onChange={onInputChange} 
                    value={values.email} 
                />
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
            </label>

            <label htmlFor="password"> {/* Input for User Password */}
                Password<br></br>
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    onChange={onInputChange} 
                    value={values.password} 
                />
                {errors.password.length > 8 ? (<p className="error">{errors.password}</p>) : null}
            </label>

            <label htmlFor="role"> {/* Dropdown for User's Role */}
                Role<br></br>
                <select 
                    id="role" 
                    name="role" 
                    onChange={onInputChange}
                    value={values.role}
                >
                    <option value="">-- Select a Role --</option>
                    <option value="front">Front End Dev</option>
                    <option value="back">Back End Dev</option>
                    <option value="data">Data Science</option>
                    <option value="ops">Dev Ops</option>
                    <option value="full">Full Stack Dev</option>
                </select>
                {errors.role.length > 0 ? (<p className="error">{errors.role}</p>) : null}
            </label>

            <label htmlFor="terms"> {/* Checkbox for User to agree to the ToS */}
                <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox"
                    onChange={onCheckboxChange}
                    checked={values.terms}
                /> Agree to <a href="/#" onClick={e => e.preventDefault()}>Terms of Service</a>
                {errors.terms ? (<p className="error">{errors.terms}</p>) : null}
            </label>

            <button type="submit" disabled={disabled}>Submit</button> {/* Submit the Form */}

        </form>
    )
}

export default Form