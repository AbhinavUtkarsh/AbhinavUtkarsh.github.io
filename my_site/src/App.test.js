import { render, screen, fireEvent, act } from '@testing-library/react';
import AppWrapper from './App';

// the language button is throttled, so time is stepped manually
jest.useFakeTimers();

beforeEach(() => {
  window.scrollTo = jest.fn();
  window.location.hash = '#/';
});

const advance = () => act(() => jest.advanceTimersByTime(400));

test('English page renders name, greeting and toggle', () => {
  render(<AppWrapper />);
  expect(screen.getByText('ABHINAV')).toBeInTheDocument();
  expect(screen.getByText('UTKARSH')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /namaste/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Deutsch/i })).toBeInTheDocument();
  expect(screen.getByText('Recent Projects')).toBeInTheDocument();
});

test('toggle EN -> DE switches language and html lang', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: /Deutsch/i }));
  advance();

  expect(screen.getByText('Aktuelle Projekte')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('de');
});

test('toggle DE -> EN returns to the English page', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: /Deutsch/i }));
  advance();
  fireEvent.click(screen.getByRole('button', { name: /English/i }));
  advance();

  expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
});

test('intro renders as two paragraphs, marked up for hyphenation', () => {
  const { container } = render(<AppWrapper />);
  expect(container.querySelectorAll('.intro-text p')).toHaveLength(2);
  expect(container.querySelector('.intro-text').getAttribute('lang')).toBe('en');
});

test('greeting is grouped with the first name so it centres on it', () => {
  const { container } = render(<AppWrapper />);
  const line = container.querySelector('.name-line');
  expect(line.querySelector('.greeting')).toBeTruthy();
  expect(line.querySelector('.name').textContent).toBe('ABHINAV');
});

test('proper nouns are shielded from hyphenation', () => {
  const { container } = render(<AppWrapper />);
  const shielded = [...container.querySelectorAll('.intro-text .no-hyphen')]
    .map((el) => el.textContent);
  expect(shielded).toContain('GaussianAvatars');
  expect(shielded).toContain('PyTorch');
});

test('project cards use the German text on the German page', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: /Deutsch/i }));
  advance();

  const paragraphs = document.querySelectorAll('.description');
  expect(paragraphs.length).toBeGreaterThan(0);
  paragraphs.forEach((p) => expect(p.getAttribute('lang')).toBe('de'));
});

test('footer shows a copyright range and links to the Impressum', () => {
  render(<AppWrapper />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`© 2024-${year} Abhinav Utkarsh`)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Impressum' })).toBeInTheDocument();
});

test('Impressum carries the required headings and blanks for missing data', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('link', { name: 'Impressum' }));
  advance();

  expect(screen.getByText(/§ 5 DDG/)).toBeInTheDocument();
  expect(screen.getByText(/§ 18 \(2\) MStV/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /tum\.de/ })).toBeInTheDocument();
  // address and phone are not filled in yet
  expect(document.querySelectorAll('.legal-pending').length).toBeGreaterThan(0);
});

test('German Impressum is reachable from the German page', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: /Deutsch/i }));
  advance();
  fireEvent.click(screen.getByRole('link', { name: 'Impressum' }));
  advance();

  expect(screen.getByText(/Angaben gemäß § 5 DDG/)).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('de');
});

test('View More keeps the language', () => {
  render(<AppWrapper />);
  fireEvent.click(screen.getByRole('button', { name: /Deutsch/i }));
  advance();
  fireEvent.click(screen.getByRole('button', { name: 'Mehr anzeigen' }));
  advance();

  expect(screen.getByText('Projekte')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Zurück/ })).toBeInTheDocument();
});

test('search with no match reports it', () => {
  window.location.hash = '#/projects';
  render(<AppWrapper />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzzz' } });
  expect(screen.getByText('No projects match your search.')).toBeInTheDocument();
});

test('unknown route falls back to the English home page', () => {
  window.location.hash = '#/does-not-exist';
  render(<AppWrapper />);
  expect(screen.getByText('ABHINAV')).toBeInTheDocument();
});
