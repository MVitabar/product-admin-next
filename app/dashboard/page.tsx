"use client";

import { Button } from "@/components/ui/button";
import { signOutAccount } from "@/lib/firebase";

const Dashboard = () => {
  return (
    <div>
      <Button
        onClick={() => {
          signOutAccount();
        }}
      >
        Cerrar Sesión
      </Button>{" "}
    </div>
  );
};

export default Dashboard;
