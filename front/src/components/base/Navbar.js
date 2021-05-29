import React from 'react';

import { useGetUser } from '../../hooks/useGetUser';

import logo from '../../svg/logo-url.svg';

const Navbar = () => {

    const user = useGetUser();
    const isLoggedIn = Object.keys(user).length > 0;

    return (
        <nav className="navbar">
            <div className="navbar-pages">
                <img src={logo} alt={logo} className="logo" />
                <div>
                    <a href="/" className="navbar-link">Home</a>
                    <a href="/dashboard" className="navbar-link">Dashboard</a>
                    <a href="/url/list" className="navbar-link">My URL</a>
                    <a href="/url/create" className="navbar-link">New URL</a>
                </div>
            </div>
            <div className="navbar-login">
                {isLoggedIn
                ? <>
                    <span>Hello, {user.firstName} {user.lastName}</span>
                    <a href="/api/auth/logout" className="navbar-link">Log Out</a>
                </>
                : <a href="/api/auth/login" className="navbar-link">Log In</a> }
            </div>
        </nav>
    );
}

export default Navbar;