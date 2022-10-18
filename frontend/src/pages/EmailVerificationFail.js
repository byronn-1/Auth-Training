import { useNavigate } from "react-router-dom";


export const EmailVerificationFail = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Oh no verification has failed</h1>
            <p>
                Something went wrong while trying to verify your email.
            </p>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    )
}