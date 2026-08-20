import React, { useState } from "react";
import WaiterStats from "../../components/admin/waiter/WaiterStats";
import WaiterToolbar from "../../components/admin/waiter/WaiterToolbar";
import WaiterGrid from "../../components/admin/waiter/WaiterGrid";
import ActivityLog from "../../components/admin/waiter/ActivityLog";
import ViewWaiterModal from "../../components/admin/waiter/ViewWaiterModal";
import WaiterFormModal from "../../components/admin/waiter/WaiterFormModal";

const Waiters = () => {

  const [waiters, setWaiters] = useState([
    {
      id: 1,
      name: "Arun",
      status: "Active",
      orders: 12,
      phone: "+91 98765 43210",
      email: "waiter@dineqr.com",
      password: "dineqr123",
      joined: "12 Jan 2026",
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "Maria",
      status: "Not Active",
      orders: 8,
      phone: "+91 98765 43211",
      email: "waiter@dineqr.com",
      password: "dineqr123",
      joined: "18 Feb 2026",
      lastActive: "8 min ago",
    },
    {
      id: 3,
      name: "David",
      status: "Active",
      orders: 15,
      phone: "+91 98765 43212",
      email: "waiter@dineqr.com",
      password: "dineqr123",
      joined: "05 Mar 2026",
      lastActive: "1 min ago",
    },
    {
      id: 4,
      name: "Rahul",
      status: "Not Active",
      orders: 6,
      phone: "+91 98765 43213",
      email: "waiter@dineqr.com",
      password: "dineqr123",
      joined: "21 Apr 2026",
      lastActive: "1 hour ago",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    status: "Not Active",
    phone: "",
  });


  // =========================
  // FILTER
  // =========================

  const filteredWaiters = waiters.filter((waiter) => {

    const matchesSearch =
      waiter.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Online" && waiter.status === "Active") ||
      (filter === "Offline" && waiter.status === "Not Active");

    return matchesSearch && matchesFilter;
  });


  // =========================
  // STATS
  // =========================

  const activeCount = waiters.filter(
    (waiter) => waiter.status === "Active"
  ).length;

  const totalOrders = waiters.reduce(
    (total, waiter) => total + waiter.orders,
    0
  );


  // =========================
  // VIEW
  // =========================

  const openViewModal = (waiter) => {
    setSelectedWaiter(waiter);
    setModalType("view");
  };


  // =========================
  // EDIT
  // =========================

  const openEditModal = (waiter) => {

    setSelectedWaiter(waiter);

    setEditForm({
      name: waiter.name,
      status: waiter.status,
      phone: waiter.phone,
    });

    setModalType("edit");
  };


  // =========================
  // ADD
  // =========================

  const openAddModal = () => {

    setSelectedWaiter(null);

    setEditForm({
      name: "",
      status: "Not Active",
      phone: "",
    });

    setModalType("add");
  };


  // =========================
  // CLOSE
  // =========================

  const closeModal = () => {
    setModalType(null);
    setSelectedWaiter(null);
  };


  // =========================
  // TOGGLE ONLINE
  // =========================

  const toggleStatus = (id) => {

    setWaiters((current) =>
      current.map((waiter) => {

        if (waiter.id !== id) {
          return waiter;
        }

        const newStatus =
          waiter.status === "Active"
            ? "Not Active"
            : "Active";

        return {
          ...waiter,
          status: newStatus,
          lastActive: "Just now",
        };
      })
    );
  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to remove this waiter?"
    );

    if (!confirmed) return;

    setWaiters((current) =>
      current.filter(
        (waiter) => waiter.id !== id
      )
    );
  };


  // =========================
  // FORM CHANGE
  // =========================

  const handleFormChange = (e) => {

    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };


  // =========================
  // SAVE EDIT
  // =========================

  const handleSave = () => {

    if (!editForm.name.trim()) {
      alert("Please enter waiter name");
      return;
    }

    setWaiters((current) =>
      current.map((waiter) =>
        waiter.id === selectedWaiter.id
          ? {
              ...waiter,
              name: editForm.name,
              status: editForm.status,
              phone: editForm.phone,
            }
          : waiter
      )
    );

    closeModal();
  };


  // =========================
  // ADD WAITER
  // =========================

  const handleAdd = () => {

    if (!editForm.name.trim()) {
      alert("Please enter waiter name");
      return;
    }

    const newWaiter = {
      id: Date.now(),
      name: editForm.name,
      status: editForm.status,
      orders: 0,
      phone: editForm.phone,
      email: "waiter@dineqr.com",
      password: "dineqr123",
      joined: "Today",
      lastActive: "Just now",
    };

    setWaiters((current) => [
      ...current,
      newWaiter,
    ]);

    closeModal();
  };


  return (
    <div className="min-h-full bg-[#080B12] px-4 py-5 text-[#F8FAFC] sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-1 flex items-center gap-3">

            <h1 className="text-2xl font-semibold">
              Waiters
            </h1>

            <span className="rounded-md border border-[#252D38] bg-[#111722] px-2.5 py-1 text-[11px] text-[#7F8A99]">
              {waiters.length} Staff
            </span>

          </div>

          <p className="text-sm text-[#7F8A99]">
            Manage restaurant staff and monitor their activity.
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="flex h-11 items-center justify-center rounded-lg bg-[#FF7A18] px-5 text-sm font-semibold text-white transition hover:bg-[#FF8A32]"
        >
          + Add Waiter
        </button>

      </div>


      {/* STATS */}

      <WaiterStats
        total={waiters.length}
        active={activeCount}
        orders={totalOrders}
      />


      {/* MAIN */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">

        <div>

          <WaiterToolbar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          <WaiterGrid
            waiters={filteredWaiters}
            onToggleStatus={toggleStatus}
            onView={openViewModal}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />

        </div>


        {/* ACTIVITY */}

        <ActivityLog
          waiters={waiters}
        />

      </div>


      {/* VIEW MODAL */}

      {modalType === "view" && selectedWaiter && (
        <ViewWaiterModal
          waiter={selectedWaiter}
          onClose={closeModal}
          onEdit={() => {
            openEditModal(selectedWaiter);
          }}
        />
      )}


      {/* ADD / EDIT */}

      {(modalType === "add" || modalType === "edit") && (
        <WaiterFormModal
          type={modalType}
          form={editForm}
          onChange={handleFormChange}
          onClose={closeModal}
          onSave={
            modalType === "add"
              ? handleAdd
              : handleSave
          }
        />
      )}

    </div>
  );
};

export default Waiters;