import Home from "./components/Home/index";
import { FaHome, FaCloud, FaUser } from "react-icons/fa";
import Weather from './components/Weather/index';
import Profile from './components/Profile/index';
const routes = [
    {
        id: 1,
        path: "/",
        component: <Home />,
        icon: <FaHome className="text-xl" />,
        text: "Home"
        
    },
    {
        id: 2,
        path: "/weather",
        component: <Weather />,
        icon: <FaCloud className="text-xl" />,
        text: "Weather"
    },
    {
        id: 3,
        path: "/profile",
        component: <Profile />,
        icon: <FaUser className="text-xl" />,
        text: "User"
    }
]

export default routes