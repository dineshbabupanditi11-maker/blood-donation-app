import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import styles from './SearchPage.module.css';

function SearchPage() {
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [debouncedLocation, setDebouncedLocation] = useState('');
  const [loading, setLoading] = useState(true);

  // This effect debounces the location input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedLocation(location);
    }, 500); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(timerId); // Cleanup the timer
    };
  }, [location]);

  // This effect fetches the data when filters change
  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      let query = supabase.from('donors').select('*');

      if (bloodGroup) {
        query = query.eq('blood_type', bloodGroup);
      }
      if (debouncedLocation) {
        query = query.ilike('location', `%${debouncedLocation}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching donors:', error);
      } else {
        setDonors(data);
      }
      setLoading(false);
    };

    fetchDonors();
  }, [bloodGroup, debouncedLocation]); // Re-run when blood group or *debounced* location changes

  return (
    <div className={styles.searchContainer}>
      <div className={styles.filters}>
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          <option value="">Any Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <input 
          type="text" 
          placeholder="Enter City/Location (e.g., Vijayawada)" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
      </div>

      {loading ? (
        <p className={styles.infoMessage}>Loading donors...</p>
      ) : (
        <div className={styles.donorList}>
          {donors.length > 0 ? (
            donors.map(donor => (
              <div key={donor.id} className={styles.donorCard}>
                <h3>{donor.name}</h3>
                <p><strong>Blood Type:</strong> {donor.blood_type}</p>
                <p><strong>Location:</strong> {donor.location}</p>
                <p><strong>Contact:</strong> {donor.contact_info}</p>
              </div>
            ))
          ) : (
            <p className={styles.infoMessage}>No donors found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;