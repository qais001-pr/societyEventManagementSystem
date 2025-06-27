/* eslint-disable quotes */
import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { ip } from "../../config";
const SocietyContext = createContext();

export const useSociety = () => useContext(SocietyContext);
export const SocietyProvider = ({ children }) => {
    const [society_id, setsociety_id] = useState(-1);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${ip}/api/societies`);
            setItems(response?.data?.data || []);
        } catch (err) {
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SocietyContext.Provider value={{ items, setItems, society_id, setsociety_id, fetchData }}>
            {children}
        </SocietyContext.Provider>
    );
};
