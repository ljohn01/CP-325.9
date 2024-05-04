import React from 'react'
import './SignUp.css'


function SignUp() {
  return (
    <form className="signup">
        <h1>Sign Up</h1>
    <input type="text" placeholder="Create Username"/>
    <input type="text" placeholder="Create Password"/>
    <button>Sign Up</button>
</form>
  )
}

export default SignUp
