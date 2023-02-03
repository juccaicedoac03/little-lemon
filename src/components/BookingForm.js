import { useState } from "react";
import { getReservations, formatDate } from "../api/api";
/*import { useNavigate } from "react-router-dom";*/

const BookingForm = (props) => {

    const [date, setDate] = useState( formatDate(new Date()) );
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("general");
    const [errors, setErrors] = useState({});
    /*const navigate = useNavigate();*/

    const validateForm = () => {

        const formErrors = {};

        let validDate = true;
        if ( new Date(date.replace(/-/g,'/')) < new Date(formatDate(new Date()).replace(/-/g,'/')) ) {
            validDate = false;
        };

        let validGuests = true;
        if ( guests<1 || guests > 15) {
            validGuests = false;
        };

        let validReservations = false;
        if (props.options.reservationList.length > 0) {
            validReservations = true;
        } else {
            formErrors["reservations"] = "Select a table";
        };

        return (!validDate || !validGuests || !validReservations)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /*if (submitAPI(e)) {
            alert("Account created!");
            navigate("/confirmation", { state: { reservations: props.options.reservationList } });
        }*/
        alert("Account created!");
        props.submitForm(props.options.reservationList);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        props.dispatch({type: "UPDATE_TIMES", date: e.target.value});
        props.dispatch({type: "UPDATE_AVAILABLE_TIMES", time: props.options.selectedTime, reservations: getReservations(props.options.selectedTables)});
        if ( new Date(e.target.value.replace(/-/g,'/')) < new Date(formatDate(new Date()).replace(/-/g,'/')) ) {
            let state = {...errors};
            state["date"] = "Date must be greater or equal than today";
            setErrors(state);
        } else {
            let state = {...errors};
            state["date"] = "";
            setErrors(state);
        };
        e.target.blur();
    };

    const handleOcassionChange = (e) => {
        setOccasion(e.target.value);
        props.dispatch({type:"UPDATE_SELECTED_OCCASION" , occasion: e.target.value});
    };

    const handleGuestsChange = (e) => {
        setGuests(e.target.value);
        props.dispatch({type:"UPDATE_SELECTED_GUESTS" , guests: e.target.value});
        if ( e.target.value<1 || e.target.value > 15) {
            let state = {...errors};
            state["guests"] = "Guests must be between 1 and 15";
            setErrors(state);
        } else {
            let state = {...errors};
            state["guests"] = "";
            setErrors(state);
        }
        ;
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "grid", maxWidth: "200px", gap: "20px"}}>
            <label htmlFor="date">Choose date</label>
            <input type="date" id="date" name="date" value={date} required onChange={handleDateChange}/>
            {(errors.date && errors.date.length>0) && <div className="error">{errors.date}</div>}
            <label htmlFor="time">Choose time</label>
            <select id="time" type="text" name="time" value={props.options.selectedTime} required onChange={(e) => {props.dispatch({type: "UPDATE_SELECTED_TIME", time: e.target.value})}}>
                {props.options.availableTimes.map((time,index) => {
                    return (
                        <option key={index} value={time}>{time}</option>
                    )
                })}
            </select>
            <label htmlFor="guest">Number of guest</label>
            <input type="number" id="guest" name="guest" value={guests} placeholder="1" min="1" max="10" required onChange={handleGuestsChange}/>
            {(errors.guests && errors.guests.length>0) && <div className="error">{errors.guests}</div>}
            <label htmlFor="occasion">Occasion</label>
            <select type="text" id="occasion" name="occasion" value={occasion} required onChange={handleOcassionChange}>
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