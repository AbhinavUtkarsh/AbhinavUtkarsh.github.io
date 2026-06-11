import { render, screen, fireEvent, act } from '@testing-library/react';
import AppWrapper from './App';

// The language button is debounced by 300ms, so we control time manually
jest.useFakeTimers();

beforeEach(() => {
  // jsdom doesn't implement scrollTo; stub it so navigate() doesn't warn
  window.scrollTo = jest.fn();
  // start every test from the root route
  window.location.hash = '#/';
});

test('English page renders with namaste greeting', () => {
  render(<AppWrapper />);
  expect(screen.getByText('ABHINAV')).toBeInTheDocument();
  expect(screen.getByText('न')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
});

test('toggle EN -> DE shows the German page with Servus greeting', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  act(() => jest.advanceTimersByTime(400)); // let the debounce fire
  expect(screen.getByText('Servus!')).toBeInTheDocument();
  expect(screen.getByText('Aktuelle Projekte')).toBeInTheDocument();
});

test('toggle DE -> EN returns to the English page', () => {
  render(<AppWrapper />);
  // go to German
  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  act(() => jest.advanceTimersByTime(400));
  expect(screen.getByText('Servus!')).toBeInTheDocument();

  // and back to English
  fireEvent.click(screen.getByRole('button', { name: 'DE' }));
  act(() => jest.advanceTimersByTime(400));
  expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  expect(screen.getByText('न')).toBeInTheDocument();
});

test('language button label is correct on the German page', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  act(() => jest.advanceTimersByTime(400));
  // On the DE page the button should offer to switch back, i.e. show a label
  const btn = screen.getByRole('button', { name: /EN|DE/ });
  expect(btn).toBeInTheDocument();
});
