import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('ToastContainer')).toBeInTheDocument();
    expect(screen.getByTestId('router-config')).toBeInTheDocument();
});
