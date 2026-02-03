import { useState } from "react";
import { createHabit } from "../../lib/action/habit";

export default function HabitModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement); // Convert the form to FormData object

    // Pass FormData to createTask
    createHabit(formData).then(() => {
      handleCloseModal(); // Close the modal after task is created
    });
  };

  return (
    <>
      <button
        className="btn btn-primary modal-btn"
        id="modal-btn"
        onClick={handleOpenModal}
      >
        Add Habit
      </button>

      {isModalOpen && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Habit</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="habitTitle" className="form-label">
                      Habit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="habitFrequency" className="form-label">
                      Frequency
                    </label>
                    <select
                      className="form-control"
                      name="habitFrequency"
                      defaultValue="DAILY"
                    >
                      <option value="DAILY">DAILY</option>
                      <option value="WEEKLY">WEEKLY</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal} // Cancel button behavior
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {isModalOpen && (
        <div
          className="modal-backdrop fade show"
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        ></div>
      )}
    </>
  );
}
