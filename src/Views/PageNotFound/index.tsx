import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h3>Página não encontrada</h3>
      <p>
        <Link to="/">Ir para a página inicial</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
