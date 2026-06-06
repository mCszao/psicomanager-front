# Comando: /pr-frontend

Prepara um Pull Request do psicomanager-front com checklist completo de qualidade antes do merge.

## Como usar

```
/pr-frontend branch=<nome-da-branch> titulo=<titulo-do-pr>
```

Exemplo: `/pr-frontend branch=feat/session-archive titulo="feat: adiciona ação de arquivar sessão"`

## O que este comando executa

### Passo 1 — Verificações automáticas

Execute em ordem e mostre o resultado de cada uma:

```bash
# 1. Typecheck
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Testes
npm run test

# 4. Build (valida que não há erros de produção)
npm run build
```

Se qualquer verificação falhar, **pare e corrija antes de continuar**.

---

### Passo 2 — Checklist de revisão manual

Percorra os arquivos alterados (`git diff main...HEAD --name-only`) e verifique:

**Tokens e estilos:**
- [ ] Nenhuma cor bruta (`text-gray-*`, `bg-white`, `border-gray-*`) sem ser em badge/status
- [ ] Tokens semânticos usados: `text-content-primary`, `bg-surface`, `border-border-default`

**Tipagem:**
- [ ] Sem `any` explícito sem comentário justificando
- [ ] Interfaces de novas entidades criadas em `src/interface/`
- [ ] `BaseResponse<T>` tipado corretamente nas chamadas de API

**Formulários:**
- [ ] React Hook Form + zodResolver em todos os formulários
- [ ] Datas `datetime-local` com `:00` concatenado antes do envio
- [ ] `extractApiError()` usado no catch
- [ ] `router.refresh()` após sucesso

**Componentes:**
- [ ] `components/ui/` sem imports de negócio
- [ ] Modais destrutivos usando `ConfirmDialog`

**Nova ação de sessão (se aplicável):**
- [ ] Todas as 6 camadas do checklist implementadas
- [ ] `CONFIRM_CONFIG` atualizado
- [ ] Stage adicionado a `CLOSED_STAGES` se encerra a sessão

---

### Passo 3 — Gerar descrição do PR

Produza um texto pronto para colar no GitHub:

```markdown
## O que muda
<resumo das alterações em bullet points>

## Tipo de mudança
- [ ] Bug fix
- [ ] Nova feature
- [x] <marcar o correto>

## Checklist
- [x] tsc --noEmit passou
- [x] npm run lint passou
- [x] npm run test passou
- [x] npm run build passou
- [x] Tokens Tailwind corretos
- [x] Tipagem sem `any`
- [x] Formulários com RHF + Zod

## Screenshots (se houver mudança visual)
<adicionar se necessário>
```

---

### Passo 4 — Commit e push (aguardar confirmação do usuário)

```bash
git add .
git commit -m "<titulo-do-pr>"
git push origin <branch>
```

**Aguarde confirmação antes de executar o push.**
