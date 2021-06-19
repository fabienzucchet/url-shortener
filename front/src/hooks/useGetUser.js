import { useState} from 'react';

import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

function useGetUser() {

    const [user, setUser] = useState({});
    const [initialize, setInitialize] = useState(true);

    if (initialize) {

        const session = Cookies.get("session");
        if (session) {
            setUser(jwt(session).user);
        }
        setInitialize(false);
    }

    return user;
}

function useIsLoggedIn() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initialize, setInitialize] = useState(true);

    if (initialize) {

        const session = Cookies.get("session");
        if (session) {
            setIsLoggedIn(true)
        }
        setInitialize(false);
    }

    return isLoggedIn;
}

export { useGetUser, useIsLoggedIn };
