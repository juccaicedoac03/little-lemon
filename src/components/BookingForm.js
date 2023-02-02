import { useState } from "react";
import { getReservations, formatDate, submitAPI } from "../api/api";
import { useNavigate } from "react-router-dom";

const BookingForm = (props) => {

    const [date, setDate] = useState( formatDate(new Date()) );
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("general");
    const navigate = useNavigate();

    const validateForm = () => {
        let validDate = false;
        if (date !== null) {
            console.log('here date')
        }
        if ( new Date(date.replace(/-/g,'/')) >= new Date(formatDate(new Date()).replace(/-/g,'/')) ) {
            validDate = true;
        };

        let validGuests = true;
        if ( guests<1 || guests > 15) {
            validGuests = false;
        }

        let validReservations = true;
        if (props.options.reservationList.length > 0) {
            validReservations = false;
        }

        return (!validDate || !validGuests || validReservations)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitAPI(e)) {
            alert("Account created!");
            navigate("/confirmation", { state: { reservations: props.options.reservationList } });
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        props.dispatch({type: "UPDATE_TIMES", date: e.target.value});
        props.dispatch({type: "UPDATE_AVAILABLE_TIMES", time: props.options.selectedTime, reservations: getReservations(props.options.selectedTables)});
        e.target.blur();
    };

    const handleOcassionChange = (e) => {
        setOccasion(e.target.value);
        props.dispatch({type:"UPDATE_SELECTED_OCCASION" , occasion: e.target.value});
    };

    const handleGuestsChange = (e) => {
        setGuests(e.target.value);
        props.dispatch({type:"UPDATE_SELECTED_GUESTS" , guests: e.target.value});
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "grid", maxWidth: "200px", gap: "20px"}}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" name="res-date" value={date} required onChange={handleDateChange}/>
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" name="res-time" value={props.options.selectedTime} required onChange={(e) => {props.dispatch({type: "UPDATE_SELECTED_TIME", time: e.target.value})}}>
                {props.options.availableTimes.map((time,index) => {
                    return (
                        <option key={index} value={time}>{time}</option>
                    )
                })}
            </select>
            <label htmlFor="guest">Number of guest</label>
            <input type="number" id="guest" name="guest" value={guests} placeholder="1" min="1" max="10" required onChange={handleGuestsChange}/>
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion" value={occasion} required onChange={handleOcassionChange}>
                <option value="general">General</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
            </select>
            <button type="submit" disabled={validateForm()} value="Make you reservation" >Make you reservation</button>
        </form>
    )
}

export default BookingForm