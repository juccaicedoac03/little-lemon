import { updateTimes } from "./components/BookingPage";
import {initializeTimes} from './components/BookingPage';


test('Test initializeTimes function', () => {
    const init = initializeTimes();
    expect(updateTimes(
        init,{type: "UPDATE_SELECTED_TIME", time: "17:00"}
    ).selectedTime
    ).toEqual(
        init.availableTimes[0]
      );
  });