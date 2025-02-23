// Demo/home.tsx

import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

                if (!SERVER_URL) {
                    setError("VITE_BACKEND_URL is not defined in your environment variables.");
                    return;
                }

                const response = await fetch(`${SERVER_URL}/hello/`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMessage(data.message); // Assuming the backend returns { "message": "Hello World" }

            } catch (err) {
                setError(`Error fetching data: ${err}`);
                if (err instanceof Error) {
                    console.error(err.message); // Log the error for debugging
                } else {
                    console.error(err);
                }

            } finally {
                setIsLoading(false); // Stop loading, regardless of success or failure
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once, on mount


    return (
        <div>
            <h2>Welcome to the Demo Page!</h2>
            {error && (
                <div style={{ color: 'red' }}>
                    Error: {error}
                </div>
            )}

            {isLoading && !error && (
                <div>
                    Waiting for backend...
                </div>
            )}

            {message && (
                <div>
                    Message from backend: {message}
                </div>
            )}
        </div>
    );
};

export default HomePage;