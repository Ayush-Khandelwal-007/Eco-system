import React from 'react';
import LoginCss from '../StudentComponents/LoginComponent/Login.module.css';

function Login() {
    return (
        <div className={LoginCss.Login}>
            <div className={LoginCss.LoginForm}></div>
        </div>
    )
}

export default Login