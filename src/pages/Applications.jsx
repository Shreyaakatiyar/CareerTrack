import { useState } from "react";
import { useApplications } from "../context/ApplicationsContext";
import AddApplicationModal from "../components/AddApplicationModal";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const statuses = ["Applied", "Interviewing", "Offer", "Rejected"];

const statusStyles = {
  Applied: {
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  Interviewing: {
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  Offer: {
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  Rejected: {
    bg: "bg-red-50",
    text: "text-red-500",
  },
};

const Applications = () => {
  const {
    applications,
    addApplication,
    deleteApplication,
    updateApplication,
    loading,
  } = useApplications();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // 🔥 GROUP DATA
  const groupedApplications = statuses.reduce((acc, status) => {
    acc[status] = applications.filter((app) => app.status === status);
    return acc;
  }, {});

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus === destStatus) return;

    const movedApp = groupedApplications[sourceStatus][source.index];

    await updateApplication(movedApp.id, {
      ...movedApp,
      status: destStatus,
    });
  };

  const handleAddApplication = async (formData) => {
    await addApplication(formData);
    setIsModalOpen(false);
  };

  const handleEditApplication = (app) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleUpdateApplication = async (id, formData) => {
    await updateApplication(id, formData);
    setEditingApp(null);
    setIsModalOpen(false);
  };

  const handleDeleteApplication = async (id) => {
    await deleteApplication(id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100">
        <div className="ml-64 px-8 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Applications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your job applications visually
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Add Application
          </button>
        </div>
      </div>

      {/* KANBAN */}
      <div className="ml-64 p-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300">
            {statuses.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-2xl p-5 min-h-125 ${statusStyles[status].bg}`}
                  >
                    {/* COLUMN HEADER */}
                    <div className="flex justify-between items-center mb-6">
                      <h3
                        className={`text-xs font-semibold uppercase tracking-wider ${statusStyles[status].text}`}
                      >
                        {status}
                      </h3>

                      <span className="text-xs bg-white px-2.5 py-1 rounded-full shadow-sm text-gray-600">
                        {groupedApplications[status].length}
                      </span>
                    </div>

                    {/* CARDS */}
                    <div className="space-y-4">
                      {groupedApplications[status].map((app, index) => (
                        <Draggable
                          draggableId={app.id.toString()}
                          index={index}
                          key={app.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                transition: "transform 0.2s ease",
                              }}
                              className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer active:scale-[0.97]"
                            >
                              {/* DATE */}
                              <div className="flex justify-between mb-2">
                                <span className="text-[11px] text-gray-400">
                                  {app.dateApplied}
                                </span>
                              </div>

                              {/* ROLE */}
                              <h4 className="font-semibold text-gray-900 text-sm leading-snug">
                                {app.jobRole}
                              </h4>

                              {/* COMPANY */}
                              <p className="text-sm text-gray-500 mt-1">
                                {app.companyName}
                              </p>

                              {/* STATUS TAG */}
                              <div className="mt-3">
                                <span
                                  className={`text-[11px] px-2 py-1 rounded-full ${statusStyles[app.status].bg} ${statusStyles[app.status].text}`}
                                >
                                  {app.status}
                                </span>
                              </div>

                              {/* ACTIONS */}
                              <div className="flex justify-end gap-3 mt-4 opacity-0 group-hover:opacity-100 transition">
                                <MdEdit
                                  onClick={() => handleEditApplication(app)}
                                  className="text-gray-400 hover:text-blue-500 cursor-pointer"
                                />
                                <MdDelete
                                  onClick={() =>
                                    handleDeleteApplication(app.id)
                                  }
                                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* MODAL */}
      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApp(null);
        }}
        onSave={handleAddApplication}
        editingApp={editingApp}
        onUpdate={handleUpdateApplication}
      />
    </div>
  );
};

export default Applications;