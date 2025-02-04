import AllUsers from "@/components/admin/AllUsers";
import MovementsList from "@/components/MovementsList";


const AdminDashboard = () => {
  return (
    <>
      <AllUsers />

      <MovementsList admin={true} />
    </>
  );
};

export default AdminDashboard;
