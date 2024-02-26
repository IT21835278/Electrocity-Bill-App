import React from "react";
import AdminHeader from "../Header/AdminHeader";
import AdminNavBar from "../NavBar/AdminNavBar";



const AdminLayout = ({ children }) => {
  return (
    <>
    <AdminHeader/>
      <AdminNavBar />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;