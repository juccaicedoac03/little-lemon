import { render, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import BookingPage from './components/BookingPage';
import {initializeTimes, updateTimes} from './components/BookingPage';
import { useReducer } from "react";

describe ('Validate Form', () => {
    test ('Validate handle functions to track input variables', () => {

        const {getByLabelText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const dateInput = getByLabelText('Choose date');
        fireEvent.change(dateInput, { target: { value: "2023-05-01" } });
        expect(dateInput.value).toBe("2023-05-01");

        const timeInput = getByLabelText('Choose time');
        fireEvent.change(timeInput, { target: { value: "17:00" } });
        expect(timeInput.value).toBe("17:00");

        const guestsInput = getByLabelText('Number of guest');
        fireEvent.change(guestsInput, { target: { value: "3" } });
        expect(guestsInput.value).toBe("3");

        const occasionInput = getByLabelText('Occasion');
        fireEvent.change(occasionInput, { target: { value: "birthday" } });
        expect(occasionInput.value).toBe("birthday");
    });

    test ('Validate submit function with correct values in input fields', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const dateInput = getByLabelText('Choose date');
        fireEvent.change(dateInput, { target: { value: "2023-05-01" } });

        const timeInput = getByLabelText('Choose time');
        fireEvent.change(timeInput, { target: { value: "17:00" } });

        const guestsInput = getByLabelText('Number of guest');
        fireEvent.change(guestsInput, { target: { value: "3" } });

        const occasionInput = getByLabelText('Occasion');
        fireEvent.change(occasionInput, { target: { value: "birthday" } });

        const buttons = getAllByText(/Table/i);
        const button = buttons[0];
        fireEvent.click(button);

        const submitButton = getByText('Make you reservation');

        expect(submitButton.disabled).toBe(false);

        fireEvent.click(button);

        expect(submitButton.disabled).toBe(true);
    });

    test ('Validate disable submit function with incorrect date', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const dateInput = getByLabelText('Choose date');
        fireEvent.change(dateInput, { target: { value: "2021-05-01" } });

        const timeInput = getByLabelText('Choose time');
        fireEvent.change(timeInput, { target: { value: "17:00" } });

        const guestsInput = getByLabelText('Number of guest');
        fireEvent.change(guestsInput, { target: { value: "3" } });

        const occasionInput = getByLabelText('Occasion');
        fireEvent.change(occasionInput, { target: { value: "birthday" } });

        const buttons = getAllByText(/Table/i);
        const button = buttons[0];
        fireEvent.click(button);

        const submitButton = getByText('Make you reservation');

        expect(submitButton.disabled).toBe(true);

        fireEvent.change(dateInput, { target: { value: "2023-05-01" } });

        expect(submitButton.disabled).toBe(false);
    });

    test ('Validate disable submit function with incorrect number of guest', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const dateInput = getByLabelText('Choose date');
        fireEvent.change(dateInput, { target: { value: "2021-05-01" } });

        const timeInput = getByLabelText('Choose time');
        fireEvent.change(timeInput, { target: { value: "17:00" } });

        const guestsInput = getByLabelText('Number of guest');
        fireEvent.change(guestsInput, { target: { value: "0" } });

        const occasionInput = getByLabelText('Occasion');
        fireEvent.change(occasionInput, { target: { value: "birthday" } });

        const buttons = getAllByText(/Table/i);
        const button = buttons[0];
        fireEvent.click(button);

        const submitButton = getByText('Make you reservation');

        expect(submitButton.disabled).toBe(true);

    });
});