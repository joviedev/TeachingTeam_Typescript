import React, { useEffect, useState } from 'react';

type Application = {
  fullName: string;
  preferredName: string;
  email: string;
  field: string;
  experience: string;
  availability: { [key: string]: string };
  submittedAt: string;
};

const Inbox: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("applications") || "[]");
    setApplications(saved);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '1rem' }}>📬 Inbox – Your Submitted Applications</h2>
      {applications.length === 0 ? (
        <p style={{ color: '#64748b' }}>No applications submitted yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {applications.map((app, idx) => (
            <li key={idx} style={{
              backgroundColor: '#f1f5f9',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1rem'
            }}>
              <strong>{app.preferredName || app.fullName}</strong> applied for <strong>{app.field}</strong> on{' '}
              <em>{new Date(app.submittedAt).toLocaleString()}</em>.
              <br />
              Experience: {app.experience}
              <br />
              Availability:
              <ul>
                {Object.entries(app.availability).map(([day, time]) => (
                  <li key={day}>{day}: {time}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
