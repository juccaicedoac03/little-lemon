const BookingSlots = (props) => {

    const handleClick = (e) => {
        props.dispatch({type: "UPDATE_SELECTED_TABLE", selectedTable: e.target.value});
    };

    return (
        <div id='bookingSlots'>
        {(props.elements.length>0) && props.elements.map((element,index)=>{
            return (
                <button key={index} value={element} onClick={handleClick}>{element}</button>
            )
        })}
        </div>
    );
}

export default BookingSlots