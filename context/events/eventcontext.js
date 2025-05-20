/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { ip } from "../../config";

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const loadeventfromsearchquery = async (query) => {
        try {
            if (!query || typeof query !== 'string') {
                setEvents([]);
                return;
            }
            const response = await axios.get(
                `${ip}/api/events/eventname/${query}`
            );
            if (response.data?.success && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            } else {
                setEvents([]);
            }

        } catch (error) {
            console.log("Search error:", error);
            setEvents([]);
        }
    };

    const loadeventfromstatus = async (status) => {
        try {
            const res = await axios.get(`${ip}/api/events/eventstatus/${status}`);
            if (res.data.success) {
                setEvents(res.data.data);
            }
        } catch {
        }
    };

    const loadeventfromsocieties = async (societyid) => {
        try {
            const res = await axios.get(`${ip}/api/events/geteventbysociety/${societyid}}`);
            if (res.data.success) {
                setEvents(res.data.data);
            }
        } catch {
        }
    };
    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${ip}/api/events`);
            if (res.data.success) {
                setEvents(res.data.data);
            }
        } catch {
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{
            events,
            setEvents,
            fetchEvents,
            loadeventfromstatus,
            loadeventfromsocieties,
            loadeventfromsearchquery,
        }}>
            {children}
        </EventContext.Provider>
    );
};