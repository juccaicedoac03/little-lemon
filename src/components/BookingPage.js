import BookingForm from "./BookingForm"
import BookingSlots from "./BookingSlots";
import { useReducer } from "react";
import { fetchAPI, genTables, updTables, getReservations } from "../api/api";

export const initializeTimes = () => {
    let times = fetchAPI(new Date());
    return (
        {availableTimes: times,
        selectedTime: times[0],
        selectedDate: new Date(),
        noAvailableTimes: [],
        tables: genTables(new Date(), times),
        selectedTables: {}}
    );
}

export const updateTimes = (state, action) => {
    switch(action.type) {
        case "UPDATE_TIMES":
            const newAvailableTimes = fetchAPI(action.date);
            if ( !(newAvailableTimes.every(function(value) {return state.availableTimes.includes(value);})) ) {
                return {...state, availableTimes: newAvailableTimes, selectedDate: action.date, tables: updTables(state.tables, newAvailableTimes)};
            } else {
                return {...state, availableTimes: fetchAPI(action.date), selectedDate: action.date};
            }
        case "UPDATE_SELECTED_TIME":
            return {...state, selectedTime: action.time};

        case "UPDATE_AVAILABLE_TIMES":
            const index = state.availableTimes.findIndex(item => item.toString() === action.time,toString());
            const newState = {...state};
            if (index !== -1) {
                newState.noAvailableTimes.push(newState.availableTimes[index]);
                newState.availableTimes.splice(index, 1);
                newState.selectedTime = newState.availableTimes[0];
            };
            return newState;

        case "UPDATE_SELECTED_TABLE":
            const newState2 = {...state};
            if (action.isSelected) {
                const index = newState2.selectedTables[newState2.selectedDate.toLocaleDateString()][newState2.selectedTime].findIndex(item => item === action.selectedTable);
                newState2.selectedTables[newState2.selectedDate.toLocaleDateString()][newState2.selectedTime].splice(index, 1);
                return newState2;
            } else {
                if (newState2.selectedTables[newState2.selectedDate.toLocaleDateString()]) {
                    if (newState2.selectedTables[newState2.selectedDate.toLocaleDateString()][newState2.selectedTime]) {
                        newState2.selectedTables[newState2.selectedDate.toLocaleDateString()][newState2.selectedTime].push(action.selectedTable);
                    } else {
                        newState2.selectedTables[newState2.selectedDate.toLocaleDateString()][newState2.selectedTime] = [action.selectedTable];
                    };
                } else {
                    newState2.selectedTables[newState2.selectedDate.toLocaleDateString()] = {[newState2.selectedTime]: [action.selectedTable]};
                }
                return newState2;
            };

        case "DELETE_RESERVATION":
            const newState3 = {...state};
            const selection = action.selectedReservation.split("-");
            const index2 = newState3.selectedTables[selection[0]][selection[1]].findIndex(item => item === selection[2]);
            newState3.selectedTables[selection[0]][selection[1]].splice(index2, 1);
            return newState3;

        default:
            return state;
    }
}

const BookingPage = () => {

    const init = initializeTimes();
    const [options, dispatch] = useReducer(updateTimes, init);
    console.log(options.selectedTables);
    console.log(getReservations(options.selectedTables));
    return (
        <>
        <BookingForm options={options} dispatch={dispatch}/>
        <BookingSlots elements={options.tables[options.selectedTime]} isReserved={false} options={options} dispatch={dispatch}/>
        <BookingSlots elements={ getReservations(options.selectedTables)} isReserved={true} options={options} dispatch={dispatch}/>
        </>
    )
}

export default BookingPage