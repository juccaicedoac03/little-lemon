import Button from "./Button";

const isSelected = (props, element) => {
    if (props.options.selectedTables) {
        if (props.options.selectedTables[props.options.selectedDate.replace(/-/g, '/')]) {
            if (props.options.selectedTables[props.options.selectedDate.replace(/-/g, '/')][props.options.selectedTime]) {
                return props.options.selectedTables[props.options.selectedDate.replace(/-/g, '/')][props.options.selectedTime].includes(element);
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
        <div id="tableContiner">
            {(props.tittle)&&<div id="tableTittle" ><h2>{props.tittle}</h2></div>}
            {(props.subtittle)&&<div id="tableSubTittle" ><h5>{props.subtittle}</h5></div>}
            <div className={props.className} id='bookingSlots'>
                {(props.elements) && props.elements.map((element,index)=>{
                    return (
                        <Button key={index} value={element} label={element} isSelected={ isSelected(props,element) } onClick={handleClick} />
                    )
                })}
            </div>
        </div>
    );
}

export default BookingSlots