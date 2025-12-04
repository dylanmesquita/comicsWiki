import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="comic-bg min-h-screen d-flex flex-column">
      {/* Header */}
      <div className="comic-header text-center">
        <h1>Heroes Wiki</h1>
      </div>

      {/* Navigation */}
      <nav className="comic-nav">
        <div className="d-flex justify-content-center">
          <Link href="/" className="comic-nav-link">
            Home
          </Link>
          <Link href="/characters" className="comic-nav-link">
            Personagens
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="comic-card p-5 mb-5">
              <h2 className="comic-card-title mb-4">Bem-vindo à Heroes Wiki</h2>
              <p className="lead mb-4">
                Descubra a maior enciclopédia de heróis e personagens de quadrinhos. Explore poderes, histórias e afiliações de seus super-heróis favoritos.
              </p>
              <Link href="/characters" className="btn comic-btn">
                Explorar Personagens
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <div className="comic-card p-4 text-center h-100">
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>
                <i className="bi bi-people-fill"></i>
              </div>
              <h5 className="comic-card-title">Personagens</h5>
              <p className="card-text">Explore uma vasta coleção de heróis e vilões de quadrinhos.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="comic-card p-4 text-center h-100">
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>
                <i className="bi bi-lightning-fill"></i>
              </div>
              <h5 className="comic-card-title">Poderes</h5>
              <p className="card-text">Descubra os poderes e habilidades especiais de cada personagem.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="comic-card p-4 text-center h-100">
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>
                <i className="bi bi-book-fill"></i>
              </div>
              <h5 className="comic-card-title">Histórias</h5>
              <p className="card-text">Leia as histórias e origens de seus personagens favoritos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="comic-footer mt-auto text-center">
        <h3>Obrigado por visitar!</h3>
        <p>Mais em breve!</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <a href="https://github.com/dylanmesquita" className="link-light">
            <i className="bi bi-github me-2"></i>Dylan Mesquita
          </a>
          <span>|</span>
          <a href="https://getbootstrap.com/" className="link-light">
            <i className="bi bi-bootstrap me-2"></i>Bootstrap
          </a>
        </div>
      </footer>
    </div>
  );
}
