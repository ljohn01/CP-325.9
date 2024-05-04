import React, { useState } from 'react'
import './SignUp.css'


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function signup(ev) {
        ev.preventDefault();
        fetch('http://localhost:4000/signup', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        })
    }
    return (
        <form className="signup" onSubmit={signup}>
            <h1>Sign Up</h1>
            <input type="text"
                placeholder="Create Username"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input type="password"
                placeholder="Create Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>
            <button>Sign Up</button>
        </form>
    )
}

export default SignUp
