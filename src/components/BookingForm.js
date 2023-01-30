import { useState } from "react";
import { getReservations, formatDate, submitAPI } from "../api/api";
import { useNavigate } from "react-router-dom";

  
const BookingForm = (props) => {

    const [date, setDate] = useState( formatDate(new Date()) );
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("birthday");
    const navigate = useNavigate();

    const submitForm = (formData) => {
        const user = submitAPI(formData);
        if (user) {
            navigate("/confirmation");
            console.log('done')
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Account created!");
        submitForm(e.target.value);
    };

    const handleAddReservation = (e) => {
        props.dispatch({type: "UPDATE_AVAILABLE_TIMES", time: props.options.selectedTime, reservations: getReservations(props.options.selectedTables) });
        alert("Reservation added!")
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        props.dispatch({type: "UPDATE_TIMES", date: e.target.value});
        props.dispatch({type: "UPDATE_AVAILABLE_TIMES", time: props.options.selectedTime, reservations: getReservations(props.options.selectedTables) });
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
            <input type="number" id="guest" name="guest" value={guests} placeholder="1" min="1" max="10" required onChange={(e) => {setGuests(e.target.value)}}/>
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion" value={occasion} required onChange={(e) => {setOccasion(e.target.value)}}>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
            </select>
            <button type="button" value="Add reservaion" onClick={handleAddReservation}>Add reservaion</button>
            <button type="submit" value="Make you reservation" >Make you reservation</button>
        </form>
    )
}

export default BookingForm