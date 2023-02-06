import { useState } from "react";
import { getReservations, formatDate } from "../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/*import { useNavigate } from "react-router-dom";*/

const BookingForm = (props) => {

    const [name, setName] = useState("");
    const [isNameValid, setIsNameValid] = useState(true);
    const [lastname, setLastname] = useState("");
    const [isLastnameValid, setIsLastnameValid] = useState(true);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [date, setDate] = useState( new Date() );
    /*const [startDate, setStartDate] = useState(new Date());*/
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("general");
    const [errors, setErrors] = useState({});
    /*const navigate = useNavigate();*/

    const validateForm = () => {

        let validName = false;
        if (name.length > 0) {
            validName = true;
        };

        let validLastname = false;
        if (lastname.length > 0) {
            validLastname = true;
        };

        let validEmail = false;
        if (/^[^@]+@[^.]+\..+$/.test(email)) {
            validEmail = true;
        };

        let validPhone = false;
        if (/^\+\d{2,3} \d{10}$/.test(phone)) {
            validPhone = true;
        };

        let validDate = true;
        /*if ( new Date(date.replace(/-/g,'/')) < new Date(formatDate(new Date()).replace(/-/g,'/')) ) {*/
        if ( date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ) {
            validDate = false;
        };

        let validGuests = true;
        if ( guests<1 || guests > 15) {
            validGuests = false;
        };

        let validReservations = false;
        if (props.options.reservationList.length > 0) {
            validReservations = true;
        };


        return (!validName || !validLastname || !validPhone || !validEmail || !validDate || !validGuests || !validReservations)
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

    const handleNameBlur = (e) => {
        setIsNameValid(e.target.value.length > 0);
    };
    const handleLastnameBlur = (e) => {
        setIsLastnameValid(e.target.value.length > 0);
    };
    const handleEmailBlur = (e) => {
        if (e.target.value.length > 0) {
            setIsEmailValid( /^[^@]+@[^.]+\..+$/.test(e.target.value) );
        } else {
            setIsEmailValid(true);
        }
        ;
      };
    const handlePhoneBlur = (e) => {
        if (e.target.value.length > 0) {
            setIsPhoneValid(/^\+\d{2,3} \d{10}$/.test(e.target.value));
        } else {
            setIsPhoneValid(true);
        };
    };
    const handleDateChange = (date) => {
        setDate(date);
        props.dispatch({type: "UPDATE_TIMES", date: formatDate(date)});
        props.dispatch({type: "UPDATE_AVAILABLE_TIMES", time: props.options.selectedTime, reservations: getReservations(props.options.selectedTables)});
        /*if ( new Date(e.target.value.replace(/-/g,'/')) < new Date(formatDate(new Date()).replace(/-/g,'/')) ) {*/
        if ( date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ) {
            let state = {...errors};
            state["date"] = "Date must be greater or equal than today";
            setErrors(state);
        } else {
            let state = {...errors};
            state["date"] = "";
            setErrors(state);
        };
        /*e.target.blur();*/
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
        <form onSubmit={handleSubmit} className={props.className}>
            <div id="formTittle">
                <h2>{props.tittle}</h2>
            </div>
            <div className="inputDiv">
                <label htmlFor="firstname">First name</label>
                <input type="text" id="firstname" name="firstname" value={name} placeholder="Enter your first name" onChange={(e)=>{setName(e.target.value)}} onBlur={handleNameBlur} required arial-label="Enter first name"/>
                {!isNameValid && (<div className="error">Please enter a first name</div>)}
            </div>
            <div className="inputDiv">
                <label htmlFor="lastname">Last name</label>
                <input type="text" id="lastname" name="lastname" value={lastname} placeholder="Enter your last name" onChange={(e)=>{setLastname(e.target.value)}} onBlur={handleLastnameBlur} required arial-label="Enter last name"/>
                {!isLastnameValid && (<div className="error">Please enter a last name</div>)}
            </div>
            <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} placeholder="example@little-lemon.com" onChange={(e)=>{setEmail(e.target.value)}} onBlur={handleEmailBlur} required arial-label="Enter email"/>
                {!isEmailValid && (<div className="error">Please enter a valid Email address</div>)}
            </div>
            <div className="inputDiv">
                <label htmlFor="numberPhone">Phone number</label>
                <input type="tel" id="numberPhone" name="numberPhone" pattern="+[0-9]{2,3} [0-9]{10}" placeholder="+57 9120000001" onChange={(e)=>{setPhone(e.target.value)}} onBlur={handlePhoneBlur} required arial-label="Enter number phone"/>
                {!isPhoneValid && (<div className="error">Please enter a valid phone number</div>)}
            </div>
            <div className="shortInputs">
                <div className="inputDiv">
                    <label htmlFor="date">Choose date</label>
                    {/*<input type="date" id="date" name="date" value={date} required onChange={handleDateChange} arial-label="Select a date"/>*/}
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange} 
                        className="datePicker"
                        calendarClassName="custom-calendar"
                        dayClassName={(date) =>
                            ((date.getMonth() < new Date().getMonth()) || (date.getMonth() > new Date().getMonth()) )  ? "random" : undefined}
                     />
                    {(errors.date && errors.date.length>0) && <div className="error">{errors.date}</div>}
                </div>
                <div className="inputDiv">
                    <label htmlFor="time">Choose time</label>
                    <select id="time" type="text" name="time" arial-label="Select a time" value={props.options.selectedTime} required onChange={(e) => {props.dispatch({type: "UPDATE_SELECTED_TIME", time: e.target.value})}}>
                        {props.options.availableTimes.map((time,index) => {
                            return (
                                <option key={index} value={time}>{time}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="inputDiv">
                    <label htmlFor="guest">Number of guest</label>
                    <input type="number" id="guest" name="guest" value={guests} placeholder="1" min="1" max="10" required onChange={handleGuestsChange} arial-label="Enter number of guests"/>
                    {(errors.guests && errors.guests.length>0) && <div className="error">{errors.guests}</div>}
                </div>
                <div className="inputDiv">
                    <label htmlFor="occasion">Occasion</label>
                    <select type="text" id="occasion" name="occasion" value={occasion} required onChange={handleOcassionChange} arial-label="Select the occasion">
                        <option value="general">General</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="business">Business</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div className="submitButtom">
                <button className="submitBottom" type="submit" disabled={validateForm()} value="Make you reservation" aria-label="On Click" style={{backgroundColor: validateForm() ? "#EDEFEE" : undefined, color: validateForm() ? "#BDBDBD" : undefined}}>Make you reservation</button>
            </div>
        </form>
    )
}

export default BookingForm