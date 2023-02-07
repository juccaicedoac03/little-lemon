import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ConfirmedBooking = (props) => {
    const location = useLocation();
    const MySwal = withReactContent(Swal);
    const handleClick = (e) => {
        /*MySwal.fire({
            icon: 'success',
            title: 'Successfully booked',
            confirmButtonText: "Ok",
            confirmButtonColor: "#F4CE14",
            customClass: {
                confirmButton: 'alert'
            }
          })*/
        MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F4CE14',
        cancelButtonColor: '#e7956f',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            confirmButton: 'alert'
        }
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                text: 'Reservation canceled successfully!',
                confirmButtonColor: '#F4CE14',
                customClass: {
                    confirmButton: 'alert'
                }
            }
            ).then(()=>{
                props.redirectReservation();
            })
        }
        })
    };
    return (
        <div className="main">
            <div id="confirmationMain">
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
                <div id="buttonConfirmation">
                    <button id="cancelReservation" onClick={handleClick} >Cancel reservation</button>
                    <button id="goHome" onClick={props.handleClick} >Go to home</button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmedBooking;