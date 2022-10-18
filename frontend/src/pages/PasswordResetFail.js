import { useNavigate } from "react-router-dom";


export const PasswordResetFail = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Oh no verification has failed</h1>
            <p>
                Something went wrong while trying to reset your password.
            </p>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}