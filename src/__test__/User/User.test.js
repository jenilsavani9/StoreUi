import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Users from '../../pages/Users';
import { AddUsers, DeleteUsers, GetUsers } from '../../services/User';

jest.mock('../../services/User', () => ({
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
