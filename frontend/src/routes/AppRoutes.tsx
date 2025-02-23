// routes/AppRoutes.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DocPage from '../Doc/DocPage';

// Example Components
const HomePage = () => <h1>Home Page</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>;

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />

                {/* Other paths, without MenuLayout */}
                <Route path="/doc" element={<DocPage />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
