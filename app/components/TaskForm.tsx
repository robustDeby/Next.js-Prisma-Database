import { useState } from "react";
import { createTask } from "../../lib/action/task";

export default function TaskModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement); // Convert the form to FormData object
    
    // Pass FormData to createTask
    createTask(formData).then(() => {
      handleCloseModal(); // Close the modal after task is created
    });
  };

  return (
    <>
      <button className="btn btn-primary modal-btn" id = "modal-btn" onClick={handleOpenModal}>
        Add Task  
      </button>

      {isModalOpen && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="taskTitle"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      name="taskDesc"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="taskDueDate" className="form-label">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="taskDueDate"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
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
