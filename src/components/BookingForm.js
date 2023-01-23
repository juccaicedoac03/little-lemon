import { useState } from "react";

const BookingForm = () => {

    const [date, setDate] = useState(new Date());
    const [selectedValue, setSelectedValue] = useState("18:00");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("birthday");
    const [availableTimes, setAvailableTimes] = useState([
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
    ]);


    const handleSubmit = (e) => { 
        e.preventDefault(); 
        alert("Account created!"); 
    }; 

    return (
        <form onSubmit={handleSubmit} style={{display: "grid", maxWidth: "200px", gap: "20px"}}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" name="res-date" value={date} required onChange={(e) => {setDate(e.target.value)}}/>
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" name="res-time" value={selectedValue} required onChange={(e) => {setSelectedValue(e.target.value)}}>
                {availableTimes.map((time,index) => {
                    return (
                        <option key={index} value={time}>{time}</option>
                    )
                })}
            </select>
            <label htmlFor="guest">Number of guest</label>
            <input type="number" id="guest" name="guest" value={guests} placeholder="1" min="1" max="10" required onClick={(e) => {setGuests(e.target.value)}}/>
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion" value={occasion} required onChange={(e) => {setOccasion(e.target.value)}}>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
            </select>
            <input type="submit" value="Make you reservation"/>
        </form>
    )
}

export default BookingForm