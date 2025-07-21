import { useState, useEffect } from "react";
import Login from "@/components/Login";
import JobList from "@/components/JobList";
import AddJob from "@/components/AddJob";
import Navbar from "@/components/Navbar";
//import '@/styles/App.css';

export default function App() {
  const [user, setUser] = useState("");
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState("jobs");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setUser(username);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Greška pri dohvatanju poslova", err);
      }
    };

    fetchJobs();
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <Navbar setView={setView} />
      {view === "jobs" ? (
        <JobList user={user} />
      ) : (
        <AddJob user={user} setView={setView} />
      )}
    </div>
  );
}
