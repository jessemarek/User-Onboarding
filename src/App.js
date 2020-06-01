import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'

//Import Components
import Form from './components/Form'

//Import Styles
import './App.css';



//Base URL endpoint
const baseURL = 'https://reqres.in/api/users_'

//Initial values for the new user form
const initFormValues = {
  name: '',
  email: '',
  password: '',
  role: '',
  terms: false,
}

//Initial Form validation error state
const initFormErrors = {
  name: '',
  email: '',
  password: '',
  role: '',
  terms: '',
}

  /************************ Validation Format ************************/
const formSchema = yup.object().shape({
  name:
    yup
      .string()
      .min(3, 'Your name must contain at least 3 letters')
      .required('You must enter your name'),
  email:
    yup
      .string()
      .email('Enter a valid email')
      .required('You must enter an email address'),
  password:
    yup
      .string()
      .min(8, 'Your password must be at least 8 characters long')
      .required('You must enter a password'),
  role:
    yup
      .string()
      .matches(/front|back|data|ops|full/, 'Select a valid role')
      .required('You must select a role'),
  terms:
    yup
      .boolean()
      .oneOf([true], 'You must agree to the Terms of Service')
})

function App() {

  /****************************** States ******************************/

  //Holds all the users data
  const [userList, setUserList] = useState([])

  //Holds values for the from inputs
  const [formValues, setFormValues] = useState(initFormValues)

  //Holds the error messages for Form validation
  const [formErrors, setFormErrors] = useState(initFormErrors)
  
  //Disable the Submit button if the form isn't filled in correctly
  const [submitDisabled, setSubmitDisabled] = useState(true)

  /**************************** Callbacks  ****************************/
  
  //Check form validation when the input fields change
  const onInputChange = e =>{
    const name = e.target.name
    const value = e.target.value

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid =>{
        //Clear the errors if the value is passes the test
        setFormErrors({
          ...formErrors, [name]: '',
        })
      })
      .catch(err =>{
        //Set our error message into the formErrors if it doesn't pass the test
        setFormErrors({
          ...formErrors, [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues, [name]: value
    })
  }

  //Check form validation when the checkbox changes
  const onCheckboxChange = e =>{
    const name = e.target.name
    const isChecked = e.target.checked

    yup
      .reach(formSchema, name)
      .validate(isChecked)
      .then(valid =>{
        //Clear the errors if the value passes the test
        setFormErrors({
          ...formErrors, [name]: '',
        })
      })
      .catch(err =>{
        //Set our error message into the formErrors if it doesn't pass the test
        setFormErrors({
          ...formErrors, [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues, [name]: isChecked,
    })

  }

  //Enable the Submit button if the Form is filled in correctly
  useEffect(() =>{
    formSchema
      .isValid(formValues)
      .then(valid =>{
        setSubmitDisabled(!valid)
      })

  }, [formValues])

  //POST data to server using axios
  const postUsers = (data) =>{
    axios
      .post(baseURL, data)
      .then(res =>{
        const addUser = res.data
        setUserList([
          ...userList, addUser
        ])
      })
      .catch(err =>{
        console.log('ERROR: ', err)
      })
  }


  //Submit the filled out form
  const onSubmit = e =>{
    //Prevent page reload
    e.preventDefault()

    //Send a post to the server adding the values from the form
    postUsers(formValues)

    //Reset the Form inputs
    setFormValues(initFormValues)

  }

  return (
    <div className="container">
      <header><h1>My App</h1></header>
    
      <Form 
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        disabled={submitDisabled}
        errors={formErrors}
        
      />

      <div className="container">
        <h3>User List:</h3>
        <pre>
          {JSON.stringify(userList, null, 1)}
        </pre>
      </div>
      

    </div>
  );
}

export default App;
