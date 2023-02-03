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

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "John" } });
        expect(nameInput.value).toBe("John");

        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });
        expect(lastnameInput.value).toBe("Doe");

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });
        expect(emailInput.value).toBe("example@little-lemon.com");

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });
        expect(phoneInput.value).toBe("+01 1234567890");

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

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "John" } });

        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });

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
        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "John" } });

        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });

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

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "John" } });

        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });

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

    test ('Validate disable submit function without first name', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "" } });

        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });

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

    test ('Validate disable submit function without last name', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "John" } });
        
        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });

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

    test ('Validate disable submit function with invalid email address', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "" } });
        
        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "+01 1234567890" } });

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

    test ('Validate disable submit function with invalid number phone', () => {
        const {getByLabelText,getByText,getAllByText} = render(
            <BookingPage>
                <BookingForm />
            </BookingPage>
        );

        const nameInput = getByLabelText('First name');
        fireEvent.change(nameInput, { target: { value: "" } });
        
        const lastnameInput = getByLabelText('Last name');
        fireEvent.change(lastnameInput, { target: { value: "Doe" } });

        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: "example@little-lemon.com" } });

        const phoneInput = getByLabelText('Phone number');
        fireEvent.change(phoneInput, { target: { value: "123456" } });

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