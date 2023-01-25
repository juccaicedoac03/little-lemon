import { updateTimes } from "./components/BookingPage";

test('Test initializeTimes function', () => {
    expect(updateTimes(
        {times: [
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
        ]}
    )).toEqual(
        {times: [
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
      ]}
      );
  });