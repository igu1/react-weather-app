import { createContext, useContext, useReducer, useMemo } from "react";

const WeatherApp = createContext(null);

WeatherApp.displayName = "WeatherAppContext";

function reducer(state, action) {
  switch (action.type) {
    case "THEME":
      return { ...state, theme: action.payload };
    default:
      throw new Error("Unhandled action");
  }
}

function WeatherAppControllerProvider({ children }) {
  const intialState = { theme: "light" };

  const [controller, dispatch] = useReducer(reducer, intialState);
  const value = useMemo(() => [controller, dispatch], [controller]);
  return <WeatherApp.Provider value={value}>{children}</WeatherApp.Provider>;
}

function useWeatherAppController() {
  const context = useContext(WeatherApp);
  if (!context) {
    throw new Error("useWeatherAppController Should be inside the WeatherAppControllerProvider");
  }
  return context;
}


const setTheme = (dispatch, value ) => dispatch({ type: "THEME", payload: value });


export { WeatherAppControllerProvider, useWeatherAppController, setTheme };