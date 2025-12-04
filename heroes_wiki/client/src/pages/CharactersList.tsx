import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function CharactersList() {
  const { data: characters, isLoading, error } = trpc.characters.list.useQuery();

  if (isLoading) {
    return (
      <div className="comic-bg min-h-screen d-flex flex-column">
        <div className="comic-header text-center">
          <h1>Heroes Wiki</h1>
        </div>
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
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Loader2 className="animate-spin" size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comic-bg min-h-screen d-flex flex-column">
        <div className="comic-header text-center">
          <h1>Heroes Wiki</h1>
        </div>
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
        <div className="container my-5">
          <div className="alert alert-danger" role="alert">
            Erro ao carregar personagens: {error.message}
          </div>
        </div>
      </div>
    );
  }

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
        <h2 className="comic-card-title mb-5 text-center">Enciclopédia de Heróis</h2>

        {!characters || characters.length === 0 ? (
          <div className="alert alert-info" role="alert">
            Nenhum personagem encontrado. Comece adicionando alguns heróis!
          </div>
        ) : (
          <div className="row g-3">
            {characters.map((character) => (
              <div key={character.id} className="col-md-6 col-lg-4">
                <div className="comic-card h-100">
                  {character.imageUrl && (
                    <img
                      src={character.imageUrl}
                      className="card-img-top"
                      alt={character.name}
                      style={{ height: "250px", objectFit: "cover", borderBottom: "3px solid #000" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="comic-card-title">{character.name}</h5>
                    <p className="card-text">
                      <span className="badge bg-danger">{character.affiliation}</span>
                    </p>
                    {character.powers && (
                      <p className="card-text" style={{ fontSize: "0.9rem" }}>
                        <strong>Poderes:</strong> {character.powers.substring(0, 80)}...
                      </p>
                    )}
                  </div>
                  <div className="card-footer" style={{ borderTop: "2px solid #000", backgroundColor: "#fff" }}>
                    <Link href={`/character/${character.id}`} className="btn comic-btn w-100">
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="comic-footer mt-auto text-center">
        <h3>Mais Personagens em Breve!</h3>
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
