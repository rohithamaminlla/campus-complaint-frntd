
import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:8080";

function App() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInRole, setLoggedInRole] = useState("");
  const [loginError, setLoginError] = useState("");

  const [studentName, setStudentName] = useState("");
  const [category, setCategory] = useState("Classroom");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  async function login(event) {
    event.preventDefault();
    setLoginError("");

    if (!role) {
      setLoginError("Please select Student or Admin.");
      return;
    }

    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, username, password }),
      });

      if (!response.ok) {
        setLoginError("Invalid role, username, or password.");
        return;
      }

      const data = await response.json();
      setLoggedInRole(data.role);
      setUsername("");
      setPassword("");
    } catch (error) {
      setLoginError("Cannot connect to backend. Check if it is running.");
    }
  }

  async function loadComplaints() {
    try {
      const response = await fetch(`${API}/complaints`);
      if (!response.ok) throw new Error("Failed to load complaints");
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error loading complaints:", error);
    }
  }

  useEffect(() => {
    if (loggedInRole) {
      loadComplaints();
    }
  }, [loggedInRole]);

  async function submitComplaint(event) {
    event.preventDefault();

    const newComplaint = {
      studentName,
      category,
      location,
      description,
    };

    try {
      const response = await fetch(`${API}/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComplaint),
      });

      if (!response.ok) throw new Error("Failed to submit complaint");

      await loadComplaints();
      setStudentName("");
      setCategory("Classroom");
      setLocation("");
      setDescription("");
      alert("Complaint submitted successfully!");
    } catch (error) {
      alert("Could not submit complaint. Check the backend.");
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(`${API}/complaints/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      await loadComplaints();
      alert("Work status updated successfully!");
    } catch (error) {
      alert("Status update failed. We need to add the backend status API.");
    }
  }

  function logout() {
    setLoggedInRole("");
    setRole("");
    setUsername("");
    setPassword("");
    setLoginError("");
  }

  if (!loggedInRole) {
    return (
      <div className="app">
        <header>
          <h1>Campus Complaint Management System</h1>
          <p>Login Portal</p>
        </header>

        <main>
          <section className="form-section">
            <h2>Login</h2>

            <form onSubmit={login}>
              <label>Select Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>

              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />

              <button type="submit">Login</button>
              {loginError && <p>{loginError}</p>}
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Campus Complaint Management System</h1>
        <p>{loggedInRole === "student" ? "Student Dashboard" : "Admin Dashboard"}</p>
        <button onClick={logout}>Logout</button>
      </header>

      <main>
        {loggedInRole === "student" && (
          <section className="form-section">
            <h2>Submit a Complaint</h2>

            <form onSubmit={submitComplaint}>
              <label>Student Name</label>
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                required
              />

              <label>Complaint Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Classroom</option>
                <option>Laboratory</option>
                <option>Internet</option>
                <option>Electrical</option>
                <option>Cleanliness</option>
                <option>Other</option>
              </select>

              <label>Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Example: ECE Lab 2"
                required
              />

              <label>Complaint Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the problem"
                required
              />

              <button type="submit">Submit Complaint</button>
            </form>
          </section>
        )}

        <section className="complaints-section">
          <h2>{loggedInRole === "student" ? "My Complaints" : "All Student Complaints"}</h2>

          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((complaint) => (
              <div className="complaint-card" key={complaint.id}>
                <h3>Complaint #{complaint.id}</h3>
                <p><strong>Student:</strong> {complaint.studentName}</p>
                <p><strong>Category:</strong> {complaint.category}</p>
                <p><strong>Location:</strong> {complaint.location}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Work Status:</strong> {complaint.status}</p>

                {loggedInRole === "admin" && (
                  <div>
                    <label>Update Work Status</label>
                    <select
                      value={complaint.status}
                      onChange={(e) => updateStatus(complaint.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
