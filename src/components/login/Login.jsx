import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";
import joi from 'joi';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { GlobalStore } from '../../Context/Store';

export default function Login() {

    let { updateUserToken , updateUserData} = useContext(GlobalStore) ;

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const [validationErrorList, setValidationErrorList] = useState([]);

    const [loginError, setloginError] = useState("");

    const navigate = useNavigate()

    let getUserInput = (e) => {
        let data = userLogin;
        data[e.target.name] = e.target.value;
        setUserLogin(data);
    }

    let loginValidation = () => {
        let scheme = joi.object({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().pattern(/^[A-Z][a-z]{3,6}/).required()
        })

        return scheme.validate(userLogin, { abortEarly: false });
    }

    let sendUserLoginData = () => {
        axios.post("https://sticky-note-fe.vercel.app/signin", userLogin).then((res) => {

            let loginData = res.data.message

            if (loginData !== "success") {

                let error = loginError;

                error = loginData;

                setloginError(error);

                setIsLoading(false)

            } else {

                setIsLoading(false);
                localStorage.setItem("Token" , res.data.token)
                localStorage.setItem("User_info" , res.data.user._id)
                updateUserToken(res.data.token);
                updateUserData(res.data.user._id);
                navigate("/")
            }

        }).catch((err) => {
            console.log(err)
        })
    }

    let submitLoginUser = (e) => {
        e.preventDefault();
        
        setIsLoading(true);

        let validateError = loginValidation()

        if (validateError.error) {

            setIsLoading(false);

            let errorList = validationErrorList;
            errorList = validateError.error.details;
            setValidationErrorList(errorList);

        } else {
            setIsLoading(false);
            sendUserLoginData();
        }
    }

    return (
        <>
        <Helmet>
            <title>login</title>
        </Helmet>
            <div className='container login-container'>
                {/* register error alert */}
                {loginError.length > 0 ? <div className='alert alert-danger my-2 text-center'> {loginError} </div> : null}
                {/* validation error alert */}
                {validationErrorList.length > 0 ? validationErrorList.map((err, index) => <div key={index} className='alert alert-danger my-2 text-center'> {err.message} </div>) : null}

                <form className='login' onSubmit={submitLoginUser}>
                    <h2>
                        Login
                    </h2>
                    <label htmlFor='userName'>user name</label>
                    <input id='userName' type="text" name='email' onChange={getUserInput} />
                    <div className='password-container'>
                        <label htmlFor='password'>password</label>
                        <input id='password' type="password" name='password' onChange={getUserInput} />
                    </div>
                    <button className="submit btn btn-primary my-3 d-flex justify-content-center align-items-center">
                        {
                            isLoading === false ? "sing in" : <i className="fa-solid fa-spinner fa-1x fa-spin color-light"></i>
                        }
                    </button>
                    <p>
                        don't have account <Link to="/register" className='text-capitalize'>register</Link>
                    </p>
                </form>
            </div>
        </>
    )
}
