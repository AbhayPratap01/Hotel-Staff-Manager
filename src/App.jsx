import { useEffect, useState } from "react";
import { Hotel, Plus, Search, Edit2, Trash2 } from "lucide-react";

import "./App.css";

import {  getStaff,  createStaff,  updateStaff} from "./service/StaffApi";

import StaffForm from "./components/StaffForm";

function App() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    try {
      setLoading(true);
      setError("");

      const response = await getStaff();

      setStaff(response.data || []);
    } catch (err) {
      setError(err.message || "Unable to load staff.");
    } finally {
      setLoading(false);
    }
  }

  function openAddForm() {
    setEditingStaff(null);
    setShowForm(true);
  }

  function openEditForm(person) {
    setEditingStaff(person);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingStaff(null);
  }

  async function handleSave(formData) {
    try {
      setSaving(true);
      setError("");

      if (editingStaff) {
        await updateStaff(
          editingStaff.id,
          formData
        );
      } else {
        await createStaff(formData);
      }

      closeForm();

      await loadStaff();
    } catch (err) {
      setError(
        err.message || "Unable to save staff member."
      );
    } finally {
      setSaving(false);
    }
  }

  const filteredStaff = staff.filter((person) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      person.fullName?.toLowerCase().includes(query) ||
      person.employeeCode?.toLowerCase().includes(query) ||
      person.email?.toLowerCase().includes(query) ||
      person.phone?.includes(query) ||
      person.role?.toLowerCase().includes(query) ||
      person.department?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app">

      <header className="topbar">
        <div className="brand">

          <div className="brand-icon">
            <Hotel size={20} />
          </div>

          <div>
            <h1>Hotel Staff</h1>
            <p>Staff management</p>
          </div>

        </div>
      </header>

      <main className="container">

        <section className="page-heading">

          <div>
            <p className="eyebrow">
              HOTEL OPERATIONS
            </p>

            <h2>Staff directory</h2>

            <p className="subtitle">
              Manage your hotel's staff information
              from one place.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={openAddForm}
          >
            <Plus size={18} />
            Add staff
          </button>

        </section>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="content-card">

          <div className="toolbar">

            <div className="staff-count">
              <strong>{filteredStaff.length}</strong>

              <span>
                {filteredStaff.length === 1
                  ? "staff member"
                  : "staff members"}
              </span>
            </div>

            <div className="search-box">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search staff..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

          </div>

          {loading ? (

            <div className="empty-state">
              <h3>Loading staff...</h3>
              <p>
                Please wait while we fetch the staff list.
              </p>
            </div>

          ) : filteredStaff.length === 0 ? (

            <div className="empty-state">
              <h3>No staff found</h3>
              <p>
                Try changing your search.
              </p>
            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Shift</th>
                    <th>Status</th>
                    <th>Phone</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>

                  {filteredStaff.map((person) => (

                    <tr key={person.id}>

                      <td>
                        <div className="employee">

                          <div className="avatar">
                            {person.fullName
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {person.fullName}
                            </strong>

                            <span>
                              {person.employeeCode}
                            </span>
                          </div>

                        </div>
                      </td>

                      <td>{person.role}</td>

                      <td>{person.department}</td>

                      <td>{person.shift}</td>

                      <td>
                        <span
                          className={`status ${person.status
                            ?.toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {person.status}
                        </span>
                      </td>

                      <td>{person.phone}</td>

                      <td>
                        <div className="row-actions">

                          <button
                            className="edit-button"
                            onClick={() =>
                              openEditForm(person)
                            }
                            title="Edit staff"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            className="delete-button"
                            title="Delete staff"
                          >
                            <Trash2 size={16} />
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

      {showForm && (
        <StaffForm
          staff={editingStaff}
          onSubmit={handleSave}
          onClose={closeForm}
          saving={saving}
        />
      )}

    </div>
  );
}

export default App;