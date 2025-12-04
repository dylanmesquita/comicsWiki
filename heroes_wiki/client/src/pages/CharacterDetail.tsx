import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function CharacterDetail() {
  const [match, params] = useRoute("/character/:id");
  const characterId = params?.id ? parseInt(params.id) : null;

  const { data: character, isLoading, error } = trpc.characters.getById.useQuery(
    { id: characterId! },
    { enabled: !!characterId }
  );

  if (!characterId) {
    return (
      <div className="comic-bg min-h-screen d-flex flex-column">
        <div className="comic-header text-center">
          <h1>Heroes Wiki</h1>
        </div>
        <div className="container my-5">
          <div className="alert alert-danger" role="alert">
            ID do personagem inválido.
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="comic-bg min-h-screen d-flex flex-column">
        <div className="comic-header text-center">
          <h1>Heroes Wiki</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Loader2 className="animate-spin" size={48} />
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="comic-bg min-h-screen d-flex flex-column">
        <div className="comic-header text-center">
          <h1>Heroes Wiki</h1>
        </div>
        <div className="container my-5">
          <div className="alert alert-danger" role="alert">
            Erro ao carregar personagem: {error?.message || "Personagem não encontrado"}
          </div>
        </div>
      </div>
    );
  }

  const powers = character.powers ? JSON.parse(character.powers) : [];

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
        <Link href="/characters" className="btn comic-btn mb-4">
          ← Voltar para Lista
        </Link>

        <div className="row">
          <div className="col-md-4 mb-4">
            {character.imageUrl && (
              <img
                src={character.imageUrl}
                className="img-fluid rounded"
                alt={character.name}
                style={{ border: "4px solid #000", boxShadow: "3px 3px 0 #000" }}
              />
            )}
          </div>

          <div className="col-md-8">
            <div className="comic-biography">
              <h2>{character.name}</h2>

              <div className="mb-4">
                <span className="badge bg-danger" style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
                  {character.affiliation}
                </span>
              </div>

              <dl>
                <dt>Afiliação</dt>
                <dd>{character.affiliation}</dd>

                <dt>Data de Criação</dt>
                <dd>{new Date(character.createdAt).toLocaleDateString("pt-BR")}</dd>

                {Array.isArray(powers) && powers.length > 0 && (
                  <>
                    <dt>Poderes e Habilidades</dt>
                    <dd>
                      <div className="d-flex flex-wrap gap-2">
                        {powers.map((power: string, index: number) => (
                          <span key={index} className="badge bg-success">
                            {power}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </>
                )}

                {character.history && (
                  <>
                    <dt>História</dt>
                    <dd>{character.history}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="comic-footer mt-auto text-center">
        <h3>Mais Detalhes em Breve!</h3>
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
