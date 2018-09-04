import React from 'react';
import { Input, Button } from 'antd';

import * as myStyle from './Style';

const LoginForm = (props) => {
  const onLogin = () => {
    if (props.isRegistering) {
      if (props.data.password === props.data.confirmPassword) {
        props.startEmailRegistration(props.data.email, props.data.password);
      } else {
        alert('Passwords don\'t match');
        props.onConfirmPasswordUpdate('')
        props.onPasswordUpdate('')
      }
    } else {
      props.startLogin('EMAIL', props.data.email, props.data.password);
    }
  }
  return (
    <div className={myStyle.formWrapper}>
        <h1 style={{ textAlign: "center" }}>Login/Register</h1>
        <myStyle.LoginForm>
          <Input 
            style={{ margin: "5px"}}
            type="text"
            value={props.data.email}
            onChange={props.onEmailUpdate}
            placeholder="Email"
            autoFocus
          />
          <Input 
            style={{ margin: "5px"}}
            type="password"
            value={props.data.password}
            onChange={(e) => props.onPasswordUpdate(e.target.value)}
            placeholder="Password"
          />
          { props.isRegistering && 
            <Input 
              style={{ margin: "5px"}}
              type="password"
              value={props.data.confirmPassword}
              onChange={(e) => props.onConfirmPasswordUpdate(e.target.value)}
              placeholder="Confirm Password"
            />
          }
          <Button 
            style={{ margin: "5px"}}
            type="primary"
            onClick={onLogin}
          >
            { props.isRegistering ? 'Register' : 'Login' }
          </Button>
        </myStyle.LoginForm>
    </div>
  )
}

export default LoginForm;