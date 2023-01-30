import {initializeTimes} from './components/BookingPage';
import { fetchAPI } from './api/api';

test('Test initializeTimes function', () => {
    expect(initializeTimes().availableTimes).toEqual(
      fetchAPI(new Date())
    );
  });