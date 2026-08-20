import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
//   employeeCode: "",
  fullName: "",
  email: "",
  phone: "",
  role: "",
//   department: "",
  shift: "",
  status: "Active",
  joiningDate: "",
};

function StaffForm({ staff, onSubmit, onClose, saving }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (staff) {
      setForm({
        // employeeCode: staff.employeeCode || "",
        fullName: staff.fullName || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role || "",
        // department: staff.department || "",
        shift: staff.shift || "",
        status: staff.status || "Active",
        joiningDate: staff.joiningDate
          ? staff.joiningDate.substring(0, 10)
          : "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [staff]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(form);
  }

  const editing = Boolean(staff);

  return (
    <div className="modal-backdrop">
      <div className="form-panel">
        <div className="form-header">
          <div>
            <h2>
              {editing ? "Edit staff member" : "Add staff member"}
            </h2>

            <p>
              {editing
                ? "Update the staff details below."
                : "Enter the details for the new staff member."}
            </p>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* <div className="field">
              <label htmlFor="employeeCode">
                Employee code
              </label>

              <input
                id="employeeCode"
                name="employeeCode"
                value={form.employeeCode}
                onChange={handleChange}
                placeholder="HTL-132"
                disabled={editing}
              />
            </div> */}

            <div className="field">
              <label htmlFor="fullName">
                Full name *
              </label>

              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">
                Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="employee@example.com"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="phone">
                Phone *
              </label>

              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="role">
                Role *
              </label>

              <input
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Front Desk"
                required
              />
            </div>

            {/* <div className="field">
              <label htmlFor="department">
                Department *
              </label>

              <input
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Front Office"
                required
              />
            </div> */}

            <div className="field">
              <label htmlFor="shift">
                Shift *
              </label>

              <select
                id="shift"
                name="shift"
                value={form.shift}
                onChange={handleChange}
                required
              >
                <option value="">Select shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="joiningDate">
                Joining date *
              </label>

              <input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editing
                ? "Update staff"
                : "Add staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffForm;