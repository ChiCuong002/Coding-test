import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import MessageModal from '../message.modal';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    function openModal(message) {
        setModalMessage(message);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!EMAIL_REGEX.test(email)) {
            setEmailError('Invalid email');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 8 || password.length > 20) {
            setPasswordError('Password must be between 8 and 20 characters');
            isValid = false;
        }

        if (isValid) {
            setEmailError('');
            setPasswordError('');
            const loginData = { email, password };
            await loginUser(loginData);
        }
    }

    async function loginUser(loginData) {
        try {
            const response = await axios.post('http://localhost:8080/login', loginData);
            console.log(response.data)
            const token = response.data.token;
            localStorage.setItem('token', token);   
            openModal('Login successful');
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                openModal(error.response.data.message);
            } else {
                openModal('An error occurred. Please try again later.');
            }
        }
    }
    return (
        <>
            <div className="login">
                <div className="login-container">
                    <h1>LOGIN</h1>
                    <form onSubmit={handleLogin} className="form-login">
                        <div className="login-fields">
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {emailError && <p>{emailError}</p>}
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p>{passwordError}</p>}
                        </div>
                        <div className="login-p">
                            <a href="#">
                                <p>Sign up</p>
                            </a>
                            <p>Forgot password?</p>
                        </div>
                        <button type="submit">Submit</button>
                    </form>

                </div>
            </div>
            <MessageModal 
                modalIsOpen={modalIsOpen} 
                closeModal={closeModal} 
                modalMessage={modalMessage} 
            />
        </>
    );
}
export default Login;