import AllUsers from "@/components/admin/AllUsers";
import CarrucelOfOfter from "@/components/CarrucelOfOfter";
import MovementsList from "@/components/MovementsList";

const AdminDashboard = () => {
  return (
    <>
      <CarrucelOfOfter admin={true} />

      <AllUsers />

      <MovementsList admin={true} />
    </>
  );
};

export default AdminDashboard;
