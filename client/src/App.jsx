import { useContext } from "react";
import { UserSessionContext } from "./contexts/UserSession";
import Greet from "./components/Greet";
import "./App.css";

function App() {
  const session = useContext(UserSessionContext);
  return (
    <div>
      <Greet />
    </div>
  );
}

export default App;
