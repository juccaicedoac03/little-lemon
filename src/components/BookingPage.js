import BookingForm from "./BookingForm"
import BookingSlots from "./BookingSlots";
import { useReducer } from "react";
import { fetchAPI, genTables, updTables, getReservations, formatDate } from "../api/api";


export const initializeTimes = () => {
    let times = fetchAPI(new Date());
    return (
        {availableTimes: times,
        selectedTime: times[0],
        selectedDate: formatDate(new Date()),
        tables: genTables(new Date(), times),
        selectedTables: {},
        reservations: false,
        reservationList: [],
        guests: 1,
        occasion: "General",
    }
    );
}

export const updateTimes = (state, action) => {
    switch(action.type) {
        case "UPDATE_TIMES":
            const newAvailableTimes = fetchAPI(new Date(action.date.replace(/-/g, '/')));
            if ( !(newAvailableTimes.every(function(value) {return state.availableTimes.includes(value);})) ) {
                return {...state, availableTimes: newAvailableTimes, selectedDate: action.date, tables: updTables(state.tables, newAvailableTimes)};
            } else {
                return {...state, availableTimes: newAvailableTimes, selectedDate: action.date};
            }
        case "UPDATE_SELECTED_TIME":
            return {...state, selectedTime: action.time};

        case "UPDATE_SELECTED_OCCASION":
            return {...state, occasion: action.occasion};

        case "UPDATE_SELECTED_GUESTS":
            return {...state, guests: action.guests};

        case "UPDATE_AVAILABLE_TIMES":
            const newState = {...state};
            const count = {};
            for (let res of action.reservations) {
                let reserved = res.split("-");
                count[reserved[0]+"-"+reserved[1]] = (count[reserved[0]+"-"+reserved[1]] || 0) + 1;
                console.log(count,Object.keys(state.tables[reserved[1]]).length)
                if ((reserved[0].toString() === state.selectedDate.replace(/-/g,'/').toString()) && (count[reserved[0]+"-"+reserved[1]] === Object.keys(state.tables[reserved[1]]).length )) {
                    let index = state.availableTimes.findIndex(item => item.toString() === reserved[1],toString());
                    if (index !== -1) {
                        newState.availableTimes.splice(index, 1);
                    };
                };
            };
            newState.selectedTime = newState.availableTimes[0];
            newState.reservations = action.reservations;
            return newState;

        case "UPDATE_SELECTED_TABLE":
            const newState2 = {...state};
            const selectedDate = newState2.selectedDate.replace(/-/g, '/');
            if (action.isSelected) {
                const selReserve = newState2.reservationList.map((element) =>{ return element.split("-")[0]+'-'+element.split("-")[1]+'-'+element.split("-")[2]; });
                const indexRes = selReserve.findIndex(item => item === selectedDate+'-'+newState2.selectedTime+'-'+action.selectedTable);
                newState2.reservationList.splice(indexRes, 1);
                const index = newState2.selectedTables[selectedDate][newState2.selectedTime].findIndex(item => item === action.selectedTable);
                newState2.selectedTables[selectedDate][newState2.selectedTime].splice(index, 1);
                return newState2;
            } else {
                newState2.reservationList.push(selectedDate+'-'+newState2.selectedTime+'-'+action.selectedTable+'-'+newState2.guests+'-'+newState2.occasion);
                if (newState2.selectedTables[selectedDate]) {
                    if (newState2.selectedTables[selectedDate][newState2.selectedTime]) {
                        newState2.selectedTables[selectedDate][newState2.selectedTime].push(action.selectedTable);
                    } else {
                        newState2.selectedTables[selectedDate][newState2.selectedTime] = [action.selectedTable];
                    };
                } else {
                    newState2.selectedTables[selectedDate] = {[newState2.selectedTime]: [action.selectedTable]};
                }
                return newState2;
            };

        case "DELETE_RESERVATION":
            const newState3 = {...state};
            const selection = action.selectedReservation.split("-");
            const selReserve = newState3.reservationList.map((element) =>{ return element.split("-")[0]+'-'+element.split("-")[1]+'-'+element.split("-")[2]; });
            const indexRes = selReserve.findIndex(item => item === action.selectedReservation);
            newState3.reservationList.splice(indexRes, 1);
            const index2 = newState3.selectedTables[selection[0]][selection[1]].findIndex(item => item === selection[2]);
            newState3.selectedTables[selection[0]][selection[1]].splice(index2, 1);

            if ( !newState3.availableTimes.includes(selection[1]) ) {
                newState3.availableTimes.push(selection[1]);
                newState3.availableTimes = newState3.availableTimes.sort();
                newState3.selectedTime = newState3.availableTimes[0];
            } else if (getReservations(newState3.selectedTables).length === 0) {
                newState3.reservations = false;
                newState3.availableTimes = fetchAPI(new Date(newState3.selectedDate.replace(/-/g, '/')));
            }
            return newState3;

        default:
            return state;
    }
}

const BookingPage = () => {
    const init = initializeTimes();
    const [options, dispatch] = useReducer(updateTimes, init);

    return (
        <>
        <BookingForm options={options} dispatch={dispatch}/>
        <BookingSlots elements={options.tables[options.selectedTime]} isReserved={false} options={options} dispatch={dispatch}/>
        <BookingSlots elements={ getReservations(options.selectedTables)} isReserved={true} options={options} dispatch={dispatch}/>
        </>
    )
}

export default BookingPage