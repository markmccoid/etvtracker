import React from 'react';

const LoginForm = (props) => {
  return (
    <div>
        <h1>Login Component</h1>
        <input 
          type="text"
          value={props.data.email}
          onChange={props.onEmailUpdate}
          placeholder="Email"
        />
        <input 
          type="password"
          value={props.data.password}
          onChange={props.onPasswordUpdate}
          placeholder="Password"
        />
        <button onClick={() => props.startLogin('EMAIL', props.data.email, props.data.password)}>
          Login
        </button>
    </div>
  )
}

export default LoginForm;