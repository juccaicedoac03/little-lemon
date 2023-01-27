import BookingForm from "./BookingForm"
import { useReducer } from "react";
import { fetchAPI, genTables } from "../api/api";

export const initializeTimes = () => {
    return (
        {times: fetchAPI(new Date()),
        tables: genTables(new Date())}
    );
}

export const updateTimes = (state, action) => {
    switch(action.type) {
        case "UPDATE_TIMES":
            return {...state, times: fetchAPI(action.date)};
        default:
            return state;
    }
}

const BookingPage = () => {

    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

    return (
        <>
        <BookingForm availableTimes={availableTimes} dispatch={dispatch}/>
        </>
    )
}

export default BookingPage