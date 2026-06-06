# Psicomanager — Frontend

## Stack
- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- React Hook Form + Zod (todos os formulários)
- Lucide React (ícones)
- Vitest + Testing Library (testes)

## Comandos essenciais
```bash
npm run dev          # porta 3000
npm run build        # build de produção
npm run lint         # ESLint
npm run test         # vitest run
tsc --noEmit         # typecheck sem emitir arquivos
```

## Estrutura de pastas relevante
```
src/
├── app/                   # Rotas Next.js (App Router)
├── components/ui/         # Primitivos genéricos sem lógica de negócio
├── components/            # Componentes de domínio (SRP)
├── contexts/              # Context API (ToastContext, AuthContext)
├── hooks/                 # Custom hooks (useSessionActions, etc.)
├── interface/             # Interfaces TypeScript
├── services/api/          # http.ts + services por domínio
├── services/validation/   # Schemas Zod
├── types/                 # Enums e tipos (StageEnum, PendingAction)
└── util/                  # Utilitários (DateUtils, calendarUtils, etc.)
```

## Tokens Tailwind (obrigatório)
Use sempre os tokens semânticos do projeto — nunca cores brutas como `text-gray-700`:
- Texto: `text-content-primary`, `text-content-secondary`, `text-content-disabled`
- Superfície: `bg-surface`, `bg-surface-raised`, `bg-surface-sunken`, `bg-surface-hover`
- Borda: `border-border-default`
- Destaque: `royalBlue` (ex: `text-royalBlue`, `bg-royalBlue`)

## Convenções de componentes
- `components/ui/` → apenas primitivos sem lógica de negócio (Input, Button, Dialog, InfoRow, ClosedState)
- `components/` → componentes de domínio com responsabilidade única (SRP)
- Modais de confirmação usam sempre `ConfirmDialog` (overlay fixo + backdrop blur) — nunca o `Dialog` genérico
- Formulários sempre com `<form method="post">` para evitar dados sensíveis na URL

## Formulários
- React Hook Form + zodResolver em todos os formulários
- Schemas Zod em `services/validation/`
- Inputs `datetime-local` retornam `HH:mm` — sempre concatenar `:00` antes de enviar para a API
- Datas para a API passam por `formatDate()` de `DateUtils.ts`: converte `yyyy-MM-ddTHH:mm:ss` → `dd-MM-yyyy HH:mm:ss`

## Chamadas de API
```typescript
import { get, post, patch, del } from '@/services/api/http';

get('/patients')
post('/patients/register', body)
patch(`/schedules/${id}/conclude`)          // sem body
patch(`/schedules/${id}/reschedule`, body)  // com body
```
A API retorna sempre `BaseResponse<T> = { success: boolean; object: T }`.
Erros extraídos com `extractApiError()` de `util/feedback.ts`.

## Feedback ao usuário
- Sucesso/erro via `useToast()` do `ToastContext`
- Após ação bem-sucedida: `router.refresh()` para revalidar dados server-side

## Checklist ao adicionar nova ação de sessão (PATCH /{id}/xxx)
1. `types/session-action.types.ts` — adicionar `'xxx'` ao `PendingAction`
2. `util/sessionActionsConfig.ts` — entry em `CONFIRM_CONFIG` e em `CLOSED_STAGES`
3. `services/api/schedule-service.ts` — função `xxxSession(id)`
4. `hooks/useSessionActions.ts` — bloco `if (pendingAction === 'xxx')` no `handleConfirm`
5. `components/session-action-buttons.tsx` — novo `ActionButton`
6. `components/session-closed-state.tsx` — novo `case 'XXX'` no switch

## Formato de data da API
`dd-MM-yyyy HH:mm:ss` — com segundos obrigatórios.
StageEnum: `OPENED | CONCLUDED | CANCELLED | ABSENT | RESCHEDULED`
AttendanceTypeEnum: `PRESENTIAL | REMOTE`
