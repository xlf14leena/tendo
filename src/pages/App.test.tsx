import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import App from './App';

function wait(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
const WAIT_TIME: number = 30;

describe('App component', () => {
  test('UI is displayed correctly', async () => {
    render(<App />);
    //heading is displayed
    await waitFor(() => {
      const linkElement = screen.getByText(/Patient Care Experience Feedback/i);
      expect(linkElement).toBeInTheDocument();

      //options are displayed
      const inputElements = screen.getAllByRole('radio');
      expect(inputElements).toHaveLength(10);

      //button is displayed
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
    });

  });
  test('Option Buttons is clickable', async () => {
    render(<App />);
    await waitFor(async () => {
      //click the first radio button
      const inputElements = screen.getAllByRole('radio');
      user.click(inputElements[0]);
    });

  });
  test('Next Button is clickable', async () => {
    render(<App />);
    await waitFor(async () => {
      //click the next button
      const next_button = screen.getByRole('button', { name: "Next" });
      user.click(next_button);
    });
  });

})