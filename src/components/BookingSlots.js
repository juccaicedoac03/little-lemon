import Button from "./Button";

const isSelected = (props, element) => {
    if (props.options.selectedTables) {
        if (props.options.selectedTables[props.options.selectedDate.toLocaleDateString()]) {
            if (props.options.selectedTables[props.options.selectedDate.toLocaleDateString()][props.options.selectedTime]) {
                return props.options.selectedTables[props.options.selectedDate.toLocaleDateString()][props.options.selectedTime].includes(element);
            }
        }
    } else {
        return false;
    }
}


const BookingSlots = (props) => {

    const handleClick = (e,isSelected) => {
        if (props.isReserved) {
            props.dispatch({type: "DELETE_RESERVATION", selectedReservation: e});
        } else {
            props.dispatch({type: "UPDATE_SELECTED_TABLE", selectedTable: e, isSelected: isSelected});
        }
    };

    return (
        <div id='bookingSlots'>
        {(props.elements) && props.elements.map((element,index)=>{
            return (
                <Button key={index} value={element} label={element} isSelected={ isSelected(props,element) } onClick={handleClick} />
            )
        })}
        </div>
    );
}

export default BookingSlots