import { render, screen } from '@testing-library/react';
import App from './App';
import BookingForm from './components/BookingForm';
import BookingPage from './components/BookingPage';

test('Render the BookingForm label', () => {
  render(<BookingPage />);
  const labelElement = screen.getByText("Choose date");
  expect(labelElement).toBeInTheDocument();
});