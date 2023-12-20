import React, { useState } from "react";
import "./App.css";
import { color } from "./Utils/Colors";
import Outlet from "./Outlet";
import { Button } from "@mui/material";
import "animate.css";

function App() {
  const [destroy, setDestroy] = useState(false);

  const className = !destroy ? "App" : "App animate__animated animate__hinge ";

  return (
    <div className={className}>
      <div className="flex flex-col ">
        {/* NAVBAR */}
        <div
          className="flex justify-start"
          style={{ backgroundColor: color.green, minHeight: "7vh" }}
        >
          {/* <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setDestroy(true);
            }}
          >
            no lo presiones Machi !!!!
          </Button> */}
          <div className="ml-4 flex items-center">
            <label className="text-white">
              Exploración Gráfica de Datos Multivariados
            </label>
          </div>
        </div>
        {/* OUTLET */}
        <div
          className="flex justify-center"
          style={{ backgroundColor: color.clarito, height: "93vh" }}
        >
          <div
            style={{
              width: "1200px",
              maxWidth: "90vw",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
