import { useState } from "react";

const BookingForm = (props) => {

    const [date, setDate] = useState(new Date());
    const [selectedValue, setSelectedValue] = useState(props.availableTimes.times[0]);
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("birthday");

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        alert("Account created!"); 
    }; 

    const handleDateChange = (e) => {
        console.log(typeof(new Date(e.target.value)))
        setDate(e.target.value)
        props.dispatch({type: "UPDATE_TIMES", date: new Date(e.target.value)})
    }

    return (
        <form onSubmit={handleSubmit} style={{display: "grid", maxWidth: "200px", gap: "20px"}}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" name="res-date" value={date} required onChange={handleDateChange}/>
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" name="res-time" value={selectedValue} required onChange={(e) => {setSelectedValue(e.target.value)}}>
                {props.availableTimes.times.map((time,index) => {
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
            <button type="submit" value="Make you reservation" onClick={handleSubmit}>Make you reservation</button>
        </form>
    )
}

export default BookingForm