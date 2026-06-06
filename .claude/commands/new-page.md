# Comando: /new-page

Scaffolda uma nova página no psicomanager-front seguindo os padrões do App Router do Next.js 14.

## Como usar

```
/new-page rota=<caminho> descricao=<o que a página faz>
```

Exemplo: `/new-page rota=(app)/reports descricao="Listagem de relatórios financeiros do psicólogo"`

## O que este comando faz

Leia os arquivos de uma página existente similar antes de implementar. Boas referências:
- `src/app/(app)/patients/page.tsx` — listagem com fetch server-side
- `src/app/(app)/schedules/[id]/page.tsx` — detalhe com parâmetro dinâmico

---

## Arquivos a criar

### 1. `src/app/<rota>/page.tsx` — Server Component (padrão)

```tsx
import { get } from '@/services/api/http';
import { BaseResponse } from '@/interface/IBase'; // ajustar import real

export default async function <NomeDaPagina>Page() {
  const data = await get<BaseResponse<TipoDeDado>>('/endpoint');

  return (
    <main className="p-6">
      <h1 className="text-content-primary text-2xl font-semibold mb-6">
        <Título da página>
      </h1>
      {/* conteúdo */}
    </main>
  );
}
```

### 2. `src/services/api/<dominio>-service.ts` (se não existir)

```typescript
import { get, post, patch } from './http';
import { BaseResponse } from '@/interface/IBase';
import { TipoDeDado } from '@/interface/ITipo';

export async function getAll<Dominio>(): Promise<BaseResponse<TipoDeDado[]>> {
  return get('/<endpoint>');
}
```

### 3. `src/interface/I<Entidade>.ts` (se não existir)

```typescript
export default interface <Entidade> {
  id: string;
  // campos da entidade
}
```

### 4. `src/components/<componente-da-pagina>.tsx` (se necessário)

Para lógica client-side (`'use client'`), criar componente separado e importar na page.

---

## Regras obrigatórias

- Pages são Server Components por padrão — só adicionar `'use client'` se absolutamente necessário.
- Lógica client-side (useState, eventos, formulários) vai em componentes filhos com `'use client'`.
- Usar tokens Tailwind: `text-content-primary`, `bg-surface`, etc. — nunca cores brutas.
- Após criar, rodar `tsc --noEmit` e corrigir erros.
- Usar agente `ui-reviewer` para validar componentes criados.
