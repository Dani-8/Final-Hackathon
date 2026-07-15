import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assetService } from '../../../services/assetService.js';
import { request } from '../../../services/api.js';

export function useAssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [history, setHistory] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Editing form states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTechnician, setAssignedTechnician] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const formatDateToInput = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
  };

  async function loadAllData() {
    setLoading(true);
    try {
      const assetData = await assetService.getById(id);
      setAsset(assetData);
      setName(assetData.name);
      setLocation(assetData.location);
      setCondition(assetData.condition);
      setStatus(assetData.status);
      setAssignedTechnician(assetData.assignedTechnician?._id || assetData.assignedTechnician || '');
      setLastServiceDate(formatDateToInput(assetData.lastServiceDate));
      setNextServiceDate(formatDateToInput(assetData.nextServiceDate));

      const histData = await assetService.getHistory(id);
      setHistory(histData);

      const techsResponse = await request('/users/technicians');
      setTechnicians(techsResponse.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load asset specifics.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAllData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setEditLoading(true);

    try {
      const updatePayload = {
        name,
        location,
        condition,
        status,
        assignedTechnician: assignedTechnician || null,
        lastServiceDate: lastServiceDate || null,
        nextServiceDate: nextServiceDate || null
      };
      await assetService.update(id, updatePayload);
      setIsEditing(false);
      loadAllData();
    } catch (err) {
      setError(err.message || 'Failed to update asset specifications.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleRetire = async () => {
    if (!window.confirm('Are you absolutely sure you want to retire this asset? This soft-deletes the asset and locks any subsequent public reporting on it.')) {
      return;
    }
    try {
      await assetService.retire(id);
      loadAllData();
    } catch (err) {
      setError(err.message || 'Failed to retire asset.');
    }
  };

  return {
    id,
    asset,
    history,
    technicians,
    loading,
    error,
    isEditing,
    setIsEditing,
    name,
    setName,
    location,
    setLocation,
    condition,
    setCondition,
    status,
    setStatus,
    assignedTechnician,
    setAssignedTechnician,
    lastServiceDate,
    setLastServiceDate,
    nextServiceDate,
    setNextServiceDate,
    editLoading,
    handleUpdate,
    handleRetire,
    navigate,
  };
}
