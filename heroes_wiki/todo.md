# Heroes Wiki - TODO

## Funcionalidades Planejadas

### Estrutura Base
- [ ] Definir esquema do banco de dados para personagens (nome, afiliação, poderes, história, imagem, favorito)
- [ ] Configurar Bootstrap no frontend
- [ ] Criar componentes reutilizáveis com Bootstrap

### Listagem de Personagens
- [ ] Implementar endpoint GET `/api/trpc/characters.list` para listar personagens
- [ ] Criar página `CharactersList.tsx` com tabela Bootstrap
- [ ] Adicionar paginação na listagem
- [ ] Estilizar com Bootstrap (cards ou tabela)

### Página de Detalhes
- [ ] Implementar endpoint GET `/api/trpc/characters.getById` para detalhes de um personagem
- [ ] Criar página `CharacterDetail.tsx` com Bootstrap
- [ ] Exibir imagem, nome, afiliação, poderes e história
- [ ] Adicionar botão de voltar

### Favoritos
- [ ] Implementar endpoint POST `/api/trpc/characters.toggleFavorite` para marcar/desmarcar favorito
- [ ] Adicionar campo `isFavorite` na listagem
- [ ] Mostrar ícone de favorito nas páginas
- [ ] Implementar filtro de favoritos

### Busca e Filtros
- [ ] Implementar busca por nome de personagem
- [ ] Implementar filtro por afiliação (Herói, Vilão, Neutro, etc.)
- [ ] Implementar filtro por poderes
- [ ] Adicionar componentes de filtro no frontend

### Testes
- [ ] Criar testes Vitest para procedures de characters
- [ ] Testar endpoints de listagem, detalhes e favoritos
- [ ] Testar lógica de busca e filtros

### Melhorias de UX
- [ ] Adicionar loading states
- [ ] Adicionar mensagens de erro
- [ ] Adicionar navegação clara entre páginas
- [ ] Adicionar responsividade mobile com Bootstrap

### Dados Iniciais
- [ ] Criar seed data com alguns personagens de exemplo
- [ ] Adicionar imagens de exemplo

---

## Status de Implementação

- [x] Inicializar projeto web full-stack (web-db-user)
- [x] Analisar estrutura de referência
- [x] Definir esquema do banco de dados para personagens
- [x] Instalar Bootstrap no frontend
- [x] Implementar listagem de personagens (backend + frontend)
- [x] Implementar página de detalhes de personagem (backend + frontend)
- [x] Implementar funcionalidade de favoritos (backend + frontend)
- [x] Implementar busca e filtros de personagens (backend + frontend)
- [x] Criar testes Vitest para funcionalidades principais
- [x] Criar página inicial com navegação
- [x] Integrar Bootstrap com HTML e CSS


## Redesign Cômico (Inspirado em marvelCharacters)

- [x] Aplicar fundo amarelo (#ffe600) com padrão de quadrinhos
- [x] Redesenhar header com estilo #1e2029 e fontes Bangers
- [x] Aplicar estilo de cards com bordas pretas (4px) e sombras
- [x] Redesenhar página inicial com novo layout
- [x] Redesenhar listagem de personagens com novo layout
- [x] Redesenhar página de detalhes com novo layout
- [x] Adicionar fontes cômicas (Bangers e Comic Neue)
- [x] Validar todos os testes Vitest
- [x] Atualizar fontes para usar as mesmas do marvelCharacters
- [x] Carregar fontes do Google Fonts no index.html

## Bugs Reportados

- [x] Corrigir erro de <a> aninhado dentro de outro <a> na página inicial
