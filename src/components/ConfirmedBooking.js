import { useLocation } from "react-router-dom";

const ConfirmedBooking = () => {
    const location = useLocation();
    return (
        <div>
            { location.state.reservations.map((element,key) =>{
                let res = element.split("-");
                return (
                    <div key={key}>
                        <h1>{res[2]}</h1>
                        <h2>Date: {res[0]}</h2>
                        <h2>Time: {res[1]}</h2>
                        <h2>Guests: {res[3]}</h2>
                        <h2>Occasion: {res[4]}</h2>
                    </div>
                );
            }) }
        </div>
    )
};

export default ConfirmedBooking;