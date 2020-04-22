import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'

//Import Components
import Form from './components/Form'

//Import Styles
import './App.css';

//Initial values for the new user form
const initFormValues = {
  name: '',
  email: '',
  paswword: '',
  terms: false,
}

const initFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

//Yup validation
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
  terms:
    yup
      .boolean()
      .oneOf([true], 'You must agree to the Terms of Service')
})

function App() {

  //States
  const [formValues, setFormValues] = useState(initFormValues)
  const [formErrors, setFormErrors] = useState(initFormErrors)
  
  const [submitDisabled, setSubmitDisabled] = useState(true)

  //Callbacks
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

  const onSubmit = e =>{
    //Prevent page reload
    e.preventDefault()


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

    </div>
  );
}

export default App;
