import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

const MARK_UP = 0.005;

test('renders new components in rates page', () => {
    render(<App />);
    
    const rates = screen.getByTestId('rates');
    const amountInput = screen.getByTestId('amount-input');
    const paytronRate = screen.getByTestId('paytron-rate');
    const trueRate = screen.getByTestId('true-rate');

    expect(rates).toBeInTheDocument();
    expect(rates).toContainElement(amountInput);
    expect(rates).toContainElement(paytronRate);
    expect(rates).toContainElement(trueRate);
});

test('renders calculated rates', () => {
    render(<App />);

    const amountInput = screen.getByTestId('amount-input');
    const paytronRate = screen.getByTestId('paytron-rate');
    const trueRate = screen.getByTestId('true-rate');
    const exchangeRate = screen.getByTestId('exchange-rate');

    const inputValue = 500;
    const trueConversion = 500 * Number(exchangeRate.textContent);
    const paytronConversion = trueConversion * (1 - MARK_UP);

    fireEvent.change(amountInput, {target: {value: inputValue}});
    
    expect(amountInput.value).toBe(inputValue.toString());
    expect(paytronRate.textContent).toBe(paytronConversion.toFixed(2));
    expect(trueRate.textContent).toBe(trueConversion.toFixed(2));
})