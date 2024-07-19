import { useContext } from "react";
import { UserSessionContext } from "../contexts/UserSession";

function Greet() {
  const session = useContext(UserSessionContext);
  return <h3>Hola - {session ? session.name : "No hay sesion"}</h3>;
}

export default Greet;
