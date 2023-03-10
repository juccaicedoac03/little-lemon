import { render } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import {initializeTimes} from './components/BookingPage';

describe ('Validate Form', () => {
    test (' validate that the correct attributes are applied to the HTML element', () => {
        const options = initializeTimes();
        const {getByLabelText} = render(
            <BookingForm options={options}/>
        );
        const nameInput = getByLabelText('First name');
        expect(nameInput).toHaveAttribute('type', 'text');
        expect(nameInput).toHaveAttribute('required', '');

        const lastnameInput = getByLabelText('Last name');
        expect(lastnameInput).toHaveAttribute('type', 'text');
        expect(lastnameInput).toHaveAttribute('required', '');

        const emailInput = getByLabelText('Email');
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('required', '');

        const phoneInput = getByLabelText('Phone number');
        expect(phoneInput).toHaveAttribute('type', 'tel');
        expect(phoneInput).toHaveAttribute('required', '');

        const dateInput = getByLabelText('Choose date');
        expect(dateInput).toHaveAttribute('type', 'date');
        expect(dateInput).toHaveAttribute('required', '');

        const timeInput = getByLabelText('Choose time');
        expect(timeInput).toHaveAttribute('type', 'text');
        expect(timeInput).toHaveAttribute('required', '');

        const guestsInput = getByLabelText('Number of guest');
        expect(guestsInput).toHaveAttribute('type', 'number');
        expect(guestsInput).toHaveAttribute('required', '');

        const occasionInput = getByLabelText('Occasion');
        expect(occasionInput).toHaveAttribute('type', 'text');
        expect(occasionInput).toHaveAttribute('required', '');
    });
});