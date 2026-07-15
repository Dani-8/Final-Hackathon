import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetService } from '../../../services/assetService.js';
import { request } from '../../../services/api.js';

export function useCreateAsset() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('HVAC');
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('New');
    const [assignedTechnician, setAssignedTechnician] = useState('');
    const [lastServiceDate, setLastServiceDate] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
    useEffect(() => {
        async function loadTechnicians() {
            try {
                const response = await request('/users/technicians');
                setTechnicians(response.data || []);
            } catch (err) {
                console.error('Failed to load technicians:', err);
            }
        }
        loadTechnicians();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !location) {
            setError('Please provide all asset specifications.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await assetService.create({
                name,
                category,
                location,
                condition,
                status: 'Operational',
                assignedTechnician: assignedTechnician || null,
                lastServiceDate: lastServiceDate || null,
                nextServiceDate: nextServiceDate || null,
            });
            // Redirect back to inventory list
            navigate('/admin/assets');
        } catch (err) {
            setError(err.message || 'Failed to register new asset.');
        } finally {
            setLoading(false);
        }
    };

    return {
        navigate,
        name,
        setName,
        category,
        setCategory,
        location,
        setLocation,
        condition,
        setCondition,
        assignedTechnician,
        setAssignedTechnician,
        lastServiceDate,
        setLastServiceDate,
        nextServiceDate,
        setNextServiceDate,
        technicians,
        loading,
        error,
        handleSubmit,
    };
}
