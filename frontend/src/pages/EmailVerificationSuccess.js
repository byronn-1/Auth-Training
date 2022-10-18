import { useNavigate } from "react-router-dom";


export const EmailVerificationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email
            </p>
            <button onClick={() => navigate('/')}>Go to Home Page</button>
        </div>
    )
}