import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { GlobalStore } from '../../Context/Store'


export default function ProtectedRoute(props) {

    if(localStorage.getItem("Token") === null){
        return <Navigate to="/login"/>
    }else{
        return props.children;
    }
}
