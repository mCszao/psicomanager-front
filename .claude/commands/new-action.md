# Comando: /new-action

Scaffolda todas as camadas necessárias para adicionar uma nova ação de sessão no psicomanager-front.

## Como usar

```
/new-action nome=<nome_da_acao>
```

Exemplo: `/new-action nome=reschedule` (já existe) ou `/new-action nome=archive`

## O que este comando faz

Dada uma nova ação `<nome>` (ex: `archive`), implementa as 6 camadas obrigatórias em ordem:

---

## Camada 1 — `src/types/session-action.types.ts`

Adicionar `'<nome>'` ao union type `PendingAction`:
```typescript
export type PendingAction = 'conclude' | 'cancel' | 'absent' | 'reschedule' | '<nome>' | null;
```

---

## Camada 2 — `src/util/sessionActionsConfig.ts`

Adicionar ao `CONFIRM_CONFIG`:
```typescript
<nome>: {
  title: "<Título em português>",
  description: "Tem certeza que deseja <ação> esta sessão? Esta ação não poderá ser desfeita.",
  confirmLabel: "<Label do botão>",
  confirmClassName: "bg-<cor>-600 hover:bg-<cor>-700 text-white",
},
```

Se a ação encerra a sessão (não é reversível para OPENED), adicionar o stage resultante em `CLOSED_STAGES`.

---

## Camada 3 — `src/services/api/schedule-service.ts`

Adicionar função:
```typescript
export async function <nome>Session(scheduleId: string): Promise<BaseResponse<string>> {
  return patch(`/schedules/${scheduleId}/<nome>`);
}
```

---

## Camada 4 — `src/hooks/useSessionActions.ts`

No `handleConfirm`, adicionar bloco:
```typescript
if (pendingAction === '<nome>') {
  await <nome>Session(scheduleId);
  toast.success('<Mensagem de sucesso>');
}
```

---

## Camada 5 — `src/components/session-action-buttons.tsx`

Adicionar botão (habilitado apenas para stage OPENED):
```tsx
<ActionButton
  onClick={() => setPendingAction('<nome>')}
  disabled={stage !== 'OPENED'}
  variant="<variante visual>"
>
  <Ícone /> <Label>
</ActionButton>
```

---

## Camada 6 — `src/components/session-closed-state.tsx`

Adicionar `case '<NOME_EM_MAIUSCULO>'` no switch:
```tsx
case '<NOME_EM_MAIUSCULO>':
  return (
    <ClosedState
      icon={<Ícone className="..." />}
      title="<Título do estado>"
    >
      <InfoRow label="<Label>" value={<valor>} />
    </ClosedState>
  );
```

---

## Instruções de execução

1. Leia os arquivos das 6 camadas antes de editar qualquer um.
2. Implemente na ordem das camadas (1→6) — cada camada depende das anteriores.
3. Após implementar, rode `tsc --noEmit` e corrija erros de tipo antes de continuar.
4. Use o agente `type-guard` para validar o resultado final.
5. Confirme com o usuário o nome da ação em português e o comportamento esperado antes de implementar se não estiverem claros.
