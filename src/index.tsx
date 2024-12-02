import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './routes/AppRoutes';
import { store } from './redux/store';
import { Content } from 'antd/es/layout/layout';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <AppRoutes />
            </Content>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
