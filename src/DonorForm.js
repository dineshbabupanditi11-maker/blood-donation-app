import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import styles from './DonorForm.module.css';

function DonorForm() {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!name || !bloodType || !location || !contact) {
      setMessage({ text: '❌ Please fill out all fields.', type: 'error' });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('donors')
      .insert([{ name, blood_type: bloodType, location, contact_info: contact }]);

    if (error) {
      setMessage({ text: 'Error submitting data: ' + error.message, type: 'error' });
    } else {
      setMessage({ text: '✅ Thank you! You have been registered as a donor.', type: 'success' });
      setName('');
      setBloodType('');
      setLocation('');
      setContact('');
    }

    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Become a Blood Donor</h2>
      <p>Fill out the form below to join our network of heroes.</p>
      
      <form onSubmit={handleSubmit} className={styles.donorForm}>
        <label>
          Full Name
          <input 
            type="text" 
            placeholder="Enter your full name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </label>
        
        <label>
          Blood Type
          <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
            <option value="" disabled>Select your blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>
        
        <label>
          City / Location
          <input 
            type="text" 
            placeholder="e.g., Vijayawada" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </label>
        
        <label>
          Contact Info (Phone or Email)
          <input 
            type="text" 
            placeholder="Your contact information" 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
            required 
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register as Donor'}
        </button>
      </form>
      
      {message.text && (
        <p className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}

export default DonorForm;