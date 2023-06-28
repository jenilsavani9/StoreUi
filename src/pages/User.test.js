import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from './Login';
import { GetUserInfoData, LoginResponse } from '../services/User';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('../services/User', () => ({
    GetUserInfoData: jest.fn(),
    LoginResponse: jest.fn(),
}));

describe('Login component', () => {
    test('renders login form', () => {
        render(<Login />);

        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('displays error toast when email is empty', () => {
        render(<Login />);

        fireEvent.click(screen.getByText('Submit'));

        expect(toast.error).toHaveBeenCalledWith("🦄 Email Can't be null!", expect.any(Object));
    });

    test('displays error toast when password is invalid', () => {
        render(<Login />);

        fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'jenilsavani1@gmail.com' } });
        fireEvent.click(screen.getByText('Submit'));

        expect(toast.error).toHaveBeenCalledWith("🦄 Password is not valid!", expect.any(Object));
    });

    test('navigates to home page on successful login', async () => {
        useNavigate.mockReturnValue(jest.fn());
        GetUserInfoData.mockResolvedValue({ data: { IPv4: '192.168.0.1' } });
        LoginResponse.mockResolvedValue({ data: { status: 200, payload: { token: 'token', user: { id: 1 } } } });

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'jenilsavani1@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token');
            expect(localStorage.setItem).toHaveBeenCalledWith('UserId', 1);
            expect(useNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('displays error toast on invalid credentials', async () => {
        useNavigate.mockReturnValue(jest.fn());
        GetUserInfoData.mockResolvedValue({ data: { IPv4: '192.168.0.1' } });
        LoginResponse.mockRejectedValue(new Error('Invalid credentials'));

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'jenilsavani1@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('🦄 Invalid Credentials', expect.any(Object));
        });
    });
});
