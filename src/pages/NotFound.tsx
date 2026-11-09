
import { Link } from "react-router";

function NotFound() {
  return (
    <section className="page-section">
      <h1>404</h1>
      <p>A página que você tentou acessar não existe.</p>

      <Link to="/dashboard">Voltar ao início</Link>
    </section>
  );
}

export default NotFound;
