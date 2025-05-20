/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */

import React, { createContext, useContext, useState } from "react";
const Authcontext = createContext()
export const useAuth = () => useContext(Authcontext)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        user_id: '',
        name:'',
        username: '',
        gender: '',
        contact: '',
        roles: '',
        email: '',
        password: ''
    });
    const login = (data) => {
        setUser({
            user_id: data.user_id,
            name:data.name,
            username: data.username,
            gender: data.gender,
            contact: data.contact,
            roles: data.roles,
            email: data.email,
            password: data.password
        })
    }
    const logout = () => {
        setUser({
            user_id: '',
            name:'',
            username: '',
            gender: '',
            contact: '',
            roles: '',
            email: '',
            password: ''
        })
    }
    return (
        <Authcontext.Provider value={{ user, login, logout }}>
            {children}
        </Authcontext.Provider >
    )
}
