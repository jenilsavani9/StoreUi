import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Users from './Users';
import { AddUsers, DeleteUsers, GetUsers } from '../services/User';

jest.mock('../services/User', () => ({
    AddUsers: jest.fn(),
    DeleteUsers: jest.fn(),
    GetUsers: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));


describe('Users Component', () => {
    beforeEach(() => {
        AddUsers.mockReset();
        DeleteUsers.mockReset();
        GetUsers.mockReset();
        mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders Users component properly', () => {
        render(<Users />);
        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByLabelText('First name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    test('handles form submission correctly', async () => {
        AddUsers.mockResolvedValueOnce({ data: { message: 'User Added successfully!' } });
        GetUsers.mockResolvedValueOnce({ data: { payload: { userList: [], userCount: 0 } } });

        render(<Users />);
        fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Save'));
        expect(AddUsers).toHaveBeenCalledWith('John', 'Doe', 'john.doe@example.com', 'password');

        await waitFor(() => {
            expect(screen.getByText('🦄 User Added successfully!')).toBeInTheDocument();
        });

        expect(GetUsers).toHaveBeenCalledTimes(1);
    });

    test('handles form submission error correctly', async () => {

        render(<Users />);

        fireEvent.click(screen.getByText('Save'));

        expect(AddUsers).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(screen.getByText(`🦄 User Already Registerd!!`)).toBeInTheDocument();
        });

        expect(GetUsers).not.toHaveBeenCalled();
    });

    test('loads users data on component mount', async () => {
        const userList = [
            { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active', role: 'customer' },
        ];
        const userCount = 1;
        GetUsers.mockResolvedValueOnce({ data: { payload: { userList, userCount } } });

        render(<Users />);

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Doe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('Active')).toBeInTheDocument();
            expect(screen.getByText('Customer')).toBeInTheDocument();
        });
    });
});
