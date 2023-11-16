import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import ProfilePage from "./components/ProfilePage";
import SuccessPage from './components/SuccessPage';
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AuthGuard from "./components/utils/AuthGuard";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/register" element={<AuthGuard type="guest"><RegistrationForm /></AuthGuard>} />
                    <Route path="/login" element={<AuthGuard type="guest"><LoginForm /></AuthGuard>} />
                    <Route path="/profile" element={<AuthGuard type="private"><ProfilePage /></AuthGuard>} />
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
