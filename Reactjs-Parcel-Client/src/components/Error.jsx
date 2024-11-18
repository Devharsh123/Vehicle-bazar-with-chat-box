import { useRouteError } from "react-router-dom";
const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <h1>This is react series</h1>
      <h3>{err}</h3>
    </div>
  );
};

export default Error;
