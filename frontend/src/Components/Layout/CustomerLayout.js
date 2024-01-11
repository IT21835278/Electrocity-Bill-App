import React from "react";
import CustomerNavBar from "../NavBar/CustomerNavBar";
import Header from "../Header/Header";



const CusromerLayout = ({ children }) => {
  return (
    <>
    <Header/>
      <CustomerNavBar />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>
    </>
  );
};

export default CusromerLayout;