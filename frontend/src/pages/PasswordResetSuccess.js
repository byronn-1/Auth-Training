import { useNavigate } from "react-router-dom";


export const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Success!</h1>
            <p>
               Your Password has been reset now log in with your new password.
            </p>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}