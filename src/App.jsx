import "./App.css";
import { WeatherAppControllerProvider } from "./context";
import SideNav from "./components/SideNav/index.jsx";
import Home from "./components/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import { useState } from "react";

function App() {

  const [content, setContent] = useState(<Home />)

  const getRoute = (routes) => {
    return routes.map((route) => {
      return <Route key={route.id} path={route.path} element={route.component} />;
    });
  }

  return (
    <>
      <WeatherAppControllerProvider>
        
        <SideNav setContent={setContent} content={content}/>
        <div className="content w-3/4 text-start rounded-lg bg-white p-10 h-fit m-4" style={{ marginLeft: "20%" }}>
        <Routes>
          {getRoute(routes)}
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        </div>
      </WeatherAppControllerProvider>
    </>
  );
}

export default App;
