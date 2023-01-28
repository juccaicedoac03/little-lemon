import Button from "./Button";

const isSelected = (props, element) => {
    if (props.options.selectedTables) {
        if (props.options.selectedTables[props.options.selectedDate.toLocaleDateString()]) {
            return props.options.selectedTables[props.options.selectedDate.toLocaleDateString()][props.options.selectedTime].includes(element);
        }
    } else {
        return false;
    }
}


const BookingSlots = (props) => {

    const handleClick = (e,isSelected) => {
        props.dispatch({type: "UPDATE_SELECTED_TABLE", selectedTable: e, isSelected: isSelected});
    };

    return (
        <div id='bookingSlots'>
        {(props.elements.length>0) && props.elements.map((element,index)=>{
            return (
                <Button key={index} value={element} label={element} isSelected={ isSelected(props,element) } onClick={handleClick} />
            )
        })}
        </div>
    );
}

export default BookingSlots