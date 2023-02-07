import { useLocation } from "react-router-dom";

const ConfirmedBooking = () => {
    const location = useLocation();
    console.log(location.state.reservations.formData)
    return (
        <div className="main">
            <div id="confirmationContainer">
                <div id="confirmationHeader">
                    <h1>Booking confirmed!</h1>
                    <h3>Thank you for your reservation.</h3>
                </div>
                
                <div id="confirmedInformation">
                    <h2>Personal information</h2>
                    <h5>Name: {location.state.reservations.formData.firstName +' '+ location.state.reservations.formData.lastName}</h5>
                    <h5>Email: {location.state.reservations.formData.email}</h5>
                    <h5>Phone: {location.state.reservations.formData.phone}</h5>
                </div>
                { location.state.reservations.options.map((element,key) =>{
                    let res = element.split("-");
                    return (
                        <div id='confirmedCard' key={key}>
                            <h2>{res[2]}</h2>
                            <h5>Date: {res[0]}</h5>
                            <h5>Time: {res[1]}</h5>
                            <h5>Guests: {res[3]}</h5>
                            <h5>Occasion: {res[4]}</h5>
                        </div>
                    );
                }) }
            </div>
        </div>
    )
};

export default ConfirmedBooking;