import { useState } from 'react';


/* 
1. if there is a token already in local storage, set that as the initial value
2. define a function that will set the token in local storage when the user wants to change it
*/
export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });
    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    }

    return [token, setToken];
}