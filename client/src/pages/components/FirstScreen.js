import React from 'react'
import Login from './Login'
import Signup from './Signup'

function FirstScreen({onLogin}) {
    if(localStorage.getItem("isLoggedIn") === "true"){
        onLogin();
    }


  return (
    <div>
        <Login />
        <Signup/>
    </div>

  )
}

export default FirstScreen