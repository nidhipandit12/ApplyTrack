import { useState, useEffect } from "react";
import "../App.css";

import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";

const initialFormData = {
  company: "",
  role: "",
  date: "",
  status: "Applied",
  jobLocation: "",
  jobType: "",
  salary: "",
  jobLink: "",
  notes: "",
  followUpDate: "",
};

function Dashboard({ user, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateApplication(editingId, formData);
      } else {
        await createApplication(formData);
      }

      await fetchApplications();
      closeForm();
      alert(editingId ? "Application updated!" : "Application added!");
    } catch (error) {
      console.error("Error saving application:", error);
      alert("Unable to save application. Please try again.");
    }
  };

  const handleEdit = (app) => {
    setFormData({
      company: app.company || "",
      role: app.role || "",
      date: app.date ? app.date.slice(0, 10) : "",
      status: app.status || "Applied",
      jobLocation: app.jobLocation || "",
      jobType: app.jobType || "",
      salary: app.salary || "",
      jobLink: app.jobLink || "",
      notes: app.notes || "",
      followUpDate: app.followUpDate
        ? app.followUpDate.slice(0, 10)
        : "",
    });

    setEditingId(app._id);
    setShowForm(true);

    document.querySelector(".form-container")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await deleteApplication(id);
      await fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Unable to delete application.");
    }
  };
  const handleViewDetails = (app) => {
  setSelectedApplication(app);
};

  const filteredApplications = applications
    .filter((app) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        app.company?.toLowerCase().includes(searchText) ||
        app.role?.toLowerCase().includes(searchText) ||
        app.jobLocation?.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" || app.status === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      if (sort === "company") {
        return a.company.localeCompare(b.company);
      }

      return new Date(b.date) - new Date(a.date);
    });

  const total = applications.length;

  const interviewCount = applications.filter(
    (a) => a.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (a) => a.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  const upcomingFollowUps = applications.filter(
    (a) =>
      a.followUpDate &&
      new Date(a.followUpDate) >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content" id="dashboard">
        <Navbar
          title="Dashboard"
          subtitle="Track and manage your job applications."
          onAddClick={() => {
            setEditingId(null);
            setFormData(initialFormData);
            setShowForm(true);
          }}
          userName={user.name}
          onLogout={onLogout}
        />

        {/* Statistics */}
        <section className="stats">
          <StatCard
            title="Total Applications"
            value={total}
            percentage={total > 0 ? 100 : 0}
            color="#4f46e5"
          />

          <StatCard
            title="Interviews"
            value={interviewCount}
            percentage={total ? Math.round((interviewCount / total) * 100) : 0}
            color="#f59e0b"
          />

          <StatCard
            title="Offers"
            value={selectedCount}
            percentage={total ? Math.round((selectedCount / total) * 100) : 0}
            color="#16a34a"
          />

          <StatCard
            title="Rejected"
            value={rejectedCount}
            percentage={total ? Math.round((rejectedCount / total) * 100) : 0}
            color="#dc2626"
          />
        </section>

        {/* Analytics */}
        <section className="analytics-section">
          <h2>Application Analytics</h2>
          <p className="analytics-subtitle">
            Track your application status distribution.
          </p>

          {["Applied", "Interview", "Selected", "Rejected"].map((status) => {
            const count = applications.filter(
              (app) => app.status === status
            ).length;

            const percentage = total
              ? Math.round((count / total) * 100)
              : 0;

            return (
              <div className="analytics-item" key={status}>
                <div className="analytics-info">
                  <span>{status}</span>
                  <span>{count} ({percentage}%)</span>
                </div>

                <div className="analytics-bar">
                  <div
                    className={`analytics-fill analytics-${status.toLowerCase()}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {/* Follow-up reminders */}
        <section className="analytics-section">
          <h2>Follow-up Reminders</h2>
          <p className="analytics-subtitle">
            Applications with upcoming follow-up dates: {upcomingFollowUps.length}
          </p>

          {upcomingFollowUps.length > 0 ? (
            upcomingFollowUps.map((app) => (
              <div className="analytics-info" key={app._id}>
                <span>{app.company} - {app.role}</span>
                <span>{app.followUpDate.slice(0, 10)}</span>
              </div>
            ))
          ) : (
            <p>No upcoming follow-ups.</p>
          )}
        </section>

        {/* Add/Edit Form */}
        {showForm && (
          <section className="form-container">
            <h2>
              {editingId ? "Edit Application" : "Add New Application"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                required
              />

              <input
                name="role"
                placeholder="Job Role"
                value={formData.role}
                onChange={handleChange}
                required
              />

              <label>Application Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>

              <input
                name="jobLocation"
                placeholder="Job Location (e.g. Kolkata)"
                value={formData.jobLocation}
                onChange={handleChange}
              />

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">Select Job Type</option>
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>

              <input
                name="salary"
                placeholder="Salary / Stipend (e.g. ₹15,000/month)"
                value={formData.salary}
                onChange={handleChange}
              />

              <input
                type="url"
                name="jobLink"
                placeholder="Job Application Link (https://...)"
                value={formData.jobLink}
                onChange={handleChange}
              />

              <label>Follow-up Date</label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Interview notes, recruiter details, etc."
                value={formData.notes}
                onChange={handleChange}
                rows="4"
              />

              <button className="add-btn" type="submit">
                {editingId ? "Update Application" : "Save Application"}
              </button>

              <button
                className="cancel-btn"
                type="button"
                onClick={closeForm}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        {selectedApplication && (
          <div className="details-overlay">
            <div className="details-modal">
              <h2>Application Details</h2>

              <p><strong>Company:</strong> {selectedApplication.company}</p>
              <p><strong>Role:</strong> {selectedApplication.role}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              <p><strong>Applied Date:</strong> {selectedApplication.date?.slice(0, 10)}</p>
              <p><strong>Location:</strong> {selectedApplication.jobLocation || "Not specified"}</p>
              <p><strong>Job Type:</strong> {selectedApplication.jobType || "Not specified"}</p>
              <p><strong>Salary:</strong> {selectedApplication.salary || "Not specified"}</p>
              <p><strong>Follow-up:</strong> {selectedApplication.followUpDate?.slice(0, 10) || "Not scheduled"}</p>
              <p><strong>Notes:</strong> {selectedApplication.notes || "No notes added"}</p>

              {selectedApplication.jobLink && (
                <p>
                  <strong>Job Link:</strong>{" "}
                  <a href={selectedApplication.jobLink} target="_blank" rel="noreferrer">
                    Open Job Link
                  </a>
                </p>
              )}

              <button
                className="cancel-btn"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Applications Table */}
        <section className="applications" id="applications">
          <div>
            <h2>Recent Applications</h2>
            <p>Manage and track all your job applications.</p>
          </div>

          <div className="table-controls">
            <input
              className="search-input"
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Applications</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>

            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="company">Company A-Z</option>
            </select>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              <h3>No applications found</h3>
              <p>Add an application or try another search.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="application-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Job Role</th>
                    <th>Location</th>
                    <th>Job Type</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app._id}>
                      <td className="company-name">{app.company}</td>
                      <td>{app.role}</td>
                      <td>{app.jobLocation || "-"}</td>
                      <td>{app.jobType || "-"}</td>
                      <td>{app.date.slice(0, 10)}</td>

                      <td>
                        <span className={`status status-${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button onClick={() => handleEdit(app)}>
                            Edit
                          </button>

                          <button onClick={() => handleViewDetails(app)}>
                            View
                          </button>

                          <button onClick={() => handleDelete(app._id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;