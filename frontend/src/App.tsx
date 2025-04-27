// App.tsx

import React, { Suspense } from 'react';
import {
    useRoutes,
} from 'react-router-dom';
import routes from '~react-pages';

const App: React.FC = () => {
    const element = useRoutes(routes);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            {element}
        </Suspense>
    );
};

export default App;