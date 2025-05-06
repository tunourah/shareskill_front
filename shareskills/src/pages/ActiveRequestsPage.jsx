import React, { useState, useEffect } from 'react';
import { getServiceRequests, updateServiceRequest } from '../utilities/serviceRequestService';

export default function ActiveRequestsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getServiceRequests({ provider: 'current', status: 'accepted' })
      .then(data => {
        const arr = Array.isArray(data) ? data : data.results || [];
        setJobs(arr);
      });
  }, []);

  const markComplete = async (id) => {
    await updateServiceRequest(id, { status: 'completed' });
    setJobs(js => js.filter(j => j.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Active Jobs</h2>
      {jobs.map(job => (
        <div key={job.id} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
          <div>
            <p><strong>{job.client}</strong> requested on {new Date(job.created_at).toLocaleString()}</p>
            <p className="text-gray-700">{job.message}</p>
          </div>
          <button
            onClick={() => markComplete(job.id)}
            className="px-4 py-2 bg-brightBlue text-white rounded-lg"
          >
            Mark Complete
          </button>
        </div>
      ))}
      {jobs.length === 0 && <p>No active jobs.</p>}
    </div>
  );
}
