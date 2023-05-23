import React, { useState } from 'react'
import "./register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import joi from "joi";
import { Helmet } from 'react-helmet';

export default function Register() {

  const navigateToLogin = useNavigate();

  let [registerError, setRegisterError] = useState("");

  let [isLoading, setIsLoading] = useState(false);

  const [validateErrorList, setValidateErrorList] = useState([]);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    password: "",
    email: ""
  })

  let updateUserData = (input) => {

    let userCopy = { ...user };

    userCopy[input.target.name] = input.target.value;

    setUser(userCopy);
  }

  let sendUserData = () => {
    axios.post("https://sticky-note-fe.vercel.app/signup", user).then((res) => {

      let registerMessage = res.data.message

      if (registerMessage !== "success") {

        let error = registerError;

        error = registerMessage;

        setRegisterError(error);

        setIsLoading(false)

      } else {

        setIsLoading(false);

        navigateToLogin("/login");
      }

    }).catch((err) => {
      console.log(err)
    })
  }

  let submitRegister = (e) => {

    e.preventDefault();

    setIsLoading(true);

    let validate = validateRegisterForm();

    if (validate.error) {
      setIsLoading(false);

      let errorList = validateErrorList;
      errorList = validate.error.details;
      setValidateErrorList(errorList);

    } else {
      let emptyErrorList = validateErrorList;
      emptyErrorList = [];
      setValidateErrorList(emptyErrorList);
      sendUserData();
    }

  }

  let validateRegisterForm = () => {

    let scheme = joi.object({
      first_name: joi.string().min(3).max(10).required(),
      last_name: joi.string().min(3).max(10).required(),
      age: joi.number().min(16).max(90).required(),
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: joi.string().pattern(/^[A-Z][a-z]{3,6}/).required()
    })
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
  <Helmet>
    <title>Register</title>
  </Helmet>
      {/* register error alert */}
      {registerError.length > 0 ? <div className='alert alert-danger my-2 text-center'> {registerError} </div> : null}

      {/* register error alert */}
      {validateErrorList.length > 0 ? <div className='alert alert-danger my-2 text-center'> {validateErrorList.map((error) => error.message + "\n")} </div> : ""}

      <div className="register_container container d-flex justify-content-center align-items-center position-relative">

        {/* loading register */}
        <div className={`loading-register-spinner position-absolute ${isLoading === true ? "d-flex" : ""}`}>
          <i className="fa-solid fa-spinner fa-2x fa-spin color-light"></i>
        </div>

        <form className='register_form d-flex' onSubmit={submitRegister}>

          <h2 className='text-capitalize'>
            register
          </h2>

          <label htmlFor='first_name' className='text-capitalize'>first name</label>
          <input onChange={updateUserData} id='first_name' type="text" name='first_name' />

          <label className='text-capitalize' htmlFor='last_name'>last name</label>
          <input onChange={updateUserData} id='last_name' type="text" name='last_name' />

          <label className='text-capitalize' htmlFor='email'>email</label>
          <input onChange={updateUserData} id='email' type="email" name='email' />

          <label className='text-capitalize' htmlFor='password'>password</label>
          <input onChange={updateUserData} id='password' type="password" name='password' />

          <label className='text-capitalize' htmlFor='age'>age</label>
          <input onChange={updateUserData} id='age' type="number" name='age' />

          <button className="register btn btn-primary my-3 text-capitalize t-center" type='submit'>
            register
          </button>

        </form>
      </div>
    </>
  )
}