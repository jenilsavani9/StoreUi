import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RouterConfig from './RouterConfig';
const axios = require('axios');

describe('RouterConfig', () => {
    test('renders Login component on /login route', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <RouterConfig />
            </MemoryRouter>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Navbar')).not.toBeInTheDocument();
        expect(screen.queryByText('EmailValidation')).not.toBeInTheDocument();
    });

    test('renders EmailValidation component on /verify route', () => {
        render(
            <MemoryRouter initialEntries={['/verify']}>
                <RouterConfig />
            </MemoryRouter>
        );
        expect(screen.getByText('EmailValidation')).toBeInTheDocument();
        expect(screen.queryByText('Navbar')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    test('renders Navbar and Store components on root route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <RouterConfig />
            </MemoryRouter>
        );
        expect(screen.getByText('Navbar')).toBeInTheDocument();
        expect(screen.getByText('Store')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    test('renders PageNotFound component on /404 route', () => {
        render(
            <MemoryRouter initialEntries={['/404']}>
                <RouterConfig />
            </MemoryRouter>
        );
        expect(screen.getByText('PageNotFound')).toBeInTheDocument();
        expect(screen.queryByText('Navbar')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    test('redirects to /404 for unknown routes', () => {
        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <RouterConfig />
            </MemoryRouter>
        );
        expect(screen.getByText('PageNotFound')).toBeInTheDocument();
        expect(screen.queryByText('Navbar')).not.toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });
});
