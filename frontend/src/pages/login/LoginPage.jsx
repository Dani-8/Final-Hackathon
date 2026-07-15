import React from 'react';
import { useLogin } from './hooks/useLogin.js';
import { LoginHero } from './components/LoginHero.jsx';
import { LoginForm } from './components/LoginForm.jsx';

export function LoginPage() {
    const {
        isSignUp,
        setIsSignUp,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        specialty,
        setSpecialty,
        error,
        setError,
        success,
        setSuccess,
        loading,
        handleSubmit,
        loadDemoCredentials,
    } = useLogin();


    return (
        <div id="login-page-container" className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
            <LoginHero />
            
            <LoginForm
                isSignUp={isSignUp}
                setIsSignUp={setIsSignUp}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                role={role}
                setRole={setRole}
                specialty={specialty}
                setSpecialty={setSpecialty}
                error={error}
                setError={setError}
                success={success}
                setSuccess={setSuccess}
                loading={loading}
                handleSubmit={handleSubmit}
                loadDemoCredentials={loadDemoCredentials}
            />
        </div>
    );
}

export default LoginPage;
