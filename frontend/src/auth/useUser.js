import { useState, useEffect } from "react";
import { useToken } from './useToken';


/* 
1. get the token from the useToken hook
2. define a function for getting the payload from the token
3. define the user state
4. check if the user exists
5. if it does then return the payload for the token
6.  use useEffect to watch the token for changes
        when ever the token changes it will update the user as well
        it will allow other components to get the token or the user and make sure they're in sync
*/
export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];

        return JSON.parse(atob(encodedPayload))
    }

    const [user, setUser] = useState(() => {
        if (!token) {
            return null
        }
        
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token))
        }
    }, [token]);

    return user;
}