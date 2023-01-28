import BookingForm from "./BookingForm"
import BookingSlots from "./BookingSlots";
import { useReducer } from "react";
import { fetchAPI, genTables } from "../api/api";

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
            return {...state, availableTimes: fetchAPI(action.date), selectedDate: action.date};
        case "UPDATE_SELECTED_TIME":
            return {...state, selectedTime: action.time};

        case "UPDATE_AVAILABLE_TIMES":
            const index = state.availableTimes.findIndex(item => item.toString() === action.time,toString());
            const newState = {...state};
            if (index !== -1) {
                newState.noAvailableTimes.push(newState.availableTimes[index]);
                newState.availableTimes.splice(index, 1);
                newState.selectedTime = newState.availableTimes[0];
            }
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
            }

        default:
            return state;
    }
}

const BookingPage = () => {

    const init = initializeTimes();
    const [options, dispatch] = useReducer(updateTimes, init);
    console.log(options.selectedTables)
    return (
        <>
        <BookingForm options={options} dispatch={dispatch}/>
        <BookingSlots elements={options.tables[options.selectedTime]} options={options} dispatch={dispatch}/>
        </>
    )
}

export default BookingPage