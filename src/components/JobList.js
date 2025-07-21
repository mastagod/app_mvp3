import React, { useEffect, useState } from "react";

const JobList = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Greška prilikom dohvata poslova:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Greška prilikom brisanja:", err);
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Učitavanje poslova...</p>;
  if (jobs.length === 0)
    return <p style={{ textAlign: "center" }}>Nema oglasa.</p>;

  return (
    <div className="job-list">
      <h2 style={{ textAlign: "center" }}>Pregled poslova</h2>
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <div className="job-header">
            <strong>{job.title}</strong>
            <span>{job.price} KM</span>
          </div>
          <p>{job.description}</p>
          <p>
            <strong>Datum:</strong> {job.date} | <strong>Vrijeme:</strong>{" "}
            {job.time}
          </p>
          <p>
            <strong>Kontakt:</strong> {job.contact}
          </p>
          <p>
            <strong>Postavio:</strong> {job.user}
          </p>
          {user === job.user && (
            <button onClick={() => handleDelete(job.id)}>Obriši</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;
