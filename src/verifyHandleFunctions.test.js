import { render, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import BookingPage from './components/BookingPage';
import {initializeTimes, updateTimes} from './components/BookingPage';
import { useReducer } from "react";

describe ('Validate Form', () => {
    test (' validate that the correct attributes are applied to the HTML element', () => {
        
        const {getByLabelText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );
        /*const dateInput = getByLabelText('Choose date');
        expect(dateInput).toHaveAttribute('type', 'date');
        expect(dateInput).toHaveAttribute('required', '');

        const timeInput = getByLabelText('Choose time');
        expect(timeInput).toHaveAttribute('type', 'text');
        expect(timeInput).toHaveAttribute('required', '');*/

        const guestsInput = getByLabelText('Number of guest');
        fireEvent.change(guestsInput, { target: { value: "3" } });
        expect(guestsInput.value).toBe("3");

        /*const occasionInput = getByLabelText('Occasion');
        expect(occasionInput).toHaveAttribute('type', 'text');
        expect(occasionInput).toHaveAttribute('required', '');*/
    });
});