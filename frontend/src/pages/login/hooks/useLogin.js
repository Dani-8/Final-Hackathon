import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

export function useLogin() {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('technician');
    const [specialty, setSpecialty] = useState('General Maintenance');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please provide all credentials.');
            return;
        }

        if (isSignUp && !name) {
            setError('Please provide your full name.');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isSignUp) {
                const finalSpecialty = role === 'admin' ? 'Administrative Support' : (role === 'supervisor' ? 'Management & Supervision' : specialty);
                const user = await register(name, email, password, role, finalSpecialty);

                setSuccess('Registration successful! Logging you in...');
                setTimeout(() => {
                    if (user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/technician');
                    }
                }, 1200);
            } else {
                const user = await login(email, password);

                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/technician');
                }
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please verify your details.');
        } finally {
            setLoading(false);
        }
    };


    const loadDemoCredentials = (targetRole) => {
        setIsSignUp(false);
        setError('');
        setSuccess('');
        if (targetRole === 'admin') {
            setEmail('admin@maintainiq.com');
            setPassword('admin123');
        } else {
            setEmail('tech@maintainiq.com');
            setPassword('tech123');
        }
    };

    return {
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
    };
}
