import React from 'react'
import './Login.css'

function Login() {
  return (
    <form className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Enter Username"/>
        <input type="password" placeholder="Enter Password"/>
        <button>Login</button>
    </form>
  )
}

export default Login
