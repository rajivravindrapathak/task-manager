import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const TaskList = lazy(() => import('./components/TaskList'));

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Suspense fallback={<div>Loading...</div>}>
                    <TaskList />
                </Suspense>
            </div>
        </Provider>
    );
}

export default App;
