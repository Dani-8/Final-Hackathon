import { useState, useEffect } from 'react';
import { userService } from '../../../services/userService.js';
import { useAuth } from '../../../context/AuthContext.jsx';

export function useManageTeam() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('technician');
    const [specialty, setSpecialty] = useState('General Maintenance');
    const [password, setPassword] = useState('');


    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch team members.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);


    const generateSecurePassword = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
        let newPassword = '';

        for (let i = 0; i < 10; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(newPassword);
        setSuccess('Generated secure temporary password!');
    };

    const handleEditClick = (userToEdit) => {
        setEditingUser(userToEdit);
        setName(userToEdit.name || '');
        setEmail(userToEdit.email || '');
        setRole(userToEdit.role || 'technician');
        setSpecialty(userToEdit.specialty || 'General Maintenance');
        setPassword(''); // optional for edit
        setShowForm(true);
        setError('');
        setSuccess('');

        // Scroll to form smoothly
        setTimeout(() => {
            const formEl = document.getElementById('team-form-container')

            if (formEl) {
                formEl.scrollIntoView({ behavior: 'smooth' });
            }
        }, 50);
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('technician');
        setSpecialty('General Maintenance');
        setEditingUser(null);
        setShowForm(false);
    };


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || (!editingUser && !password.trim()) || !role) {
            setError('Please fill out all required fields.');
            return;
        }

        try {
            setActionLoading(true);
            setError('');
            setSuccess('');

            const payload = {
                name: name.trim(),
                email: email.trim(),
                role,
                specialty: role === 'admin' ? 'Administrative Support' : (role === 'supervisor' ? 'Management & Supervision' : specialty)
            };

            if (password.trim() !== '') {
                payload.password = password.trim();
            }

            if (editingUser) {
                const userId = editingUser._id || editingUser.id;
                await userService.updateUser(userId, payload);
                setSuccess(`Team member "${name}" was updated successfully!`);
            } else {
                await userService.createUser(payload);
                setSuccess(`Team member "${name}" registered successfully!`);
            }

            resetForm();
            await fetchUsers();
        } catch (err) {
            setError(err.message || 'Failed to process team member action.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteUser = async (id, userName) => {
        if (String(id) === String(currentUser?.id || currentUser?._id)) {
            setError('You cannot delete your own account.');
            return;
        }

        if (!window.confirm(`Are you sure you want to remove ${userName} from the team?`)) {
            return;
        }

        try {
            setActionLoading(true);
            setError('');
            setSuccess('');

            await userService.deleteUser(id);
            setSuccess(`${userName} was successfully removed.`)

            await fetchUsers();
        } catch (err) {
            setError(err.message || 'Failed to remove team member.');
        } finally {
            setActionLoading(false);
        }
    }


    return {
        currentUser, users, loading, actionLoading, error, setError, success, setSuccess,
        showForm, setShowForm, editingUser, setEditingUser, name, setName, email, setEmail,
        role, setRole, specialty, setSpecialty, password, setPassword,
        handleEditClick, handleSubmitForm, handleDeleteUser,
        resetForm, generateSecurePassword 
    };
}
