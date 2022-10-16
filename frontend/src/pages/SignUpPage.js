import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axios } from 'axios';

import { useToken } from '../auth/useToken';

export const SignupPage = () => {

    const [token, setToken] = useToken();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        });

        const { token } = response.data
        setToken(token);
        window.history.pushState('/');
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="Enter Email" />
            <input
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type="password"
                placeholder="Enter Password" />
            <input
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                type="password"
                placeholder="Enter Password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue ||
                passwordValue !== confirmPasswordValue
                }
                onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={() => navigate('/login')}>Already have an account? Log In</button>

        </div>
    )
}