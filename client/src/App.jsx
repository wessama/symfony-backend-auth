import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import SuccessPage from './components/SuccessPage';
import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/success" element={
                        <ProtectedRoute>
                            <SuccessPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
