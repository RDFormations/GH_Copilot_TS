# Exercices — Chat et modes d interaction

> **Contexte** — Un module de calcul de dates contient un bug. Les tests échouent : la deadline est parfois antérieure à createdAt.

## Exercice — Ask puis Edit sur un bug SLA

**Prérequis :** module 3 lu ; Copilot Chat opérationnel.

### Énoncé

1. Créez `src/utils/dateUtils.ts` avec l échantillon buggy :

```ts
export type TicketPriority = "low" | "normal" | "critical";

const SLA_HOURS: Record<TicketPriority, number> = { low: 72, normal: 48, critical: 4 };

export function addHoursToDate(createdAt: Date, priority: TicketPriority): Date {
 const hours = SLA_HOURS[priority];
 const deadline = new Date(createdAt);
 deadline.setHours(deadline.getHours() - hours); // BUG
 return deadline;
}
```

2. **Ask** — sélectionnez la fonction, demandez : « Pourquoi la deadline peut être antérieure à createdAt ? » Notez la ligne fautive.
3. **Ask** — demandez la modification minimale sans appliquer le patch.
4. **Edit** — demandez : « Ajouter les heures SLA à createdAt, pas les soustraire. » Acceptez le diff après relecture.
5. Vérifiez : createdAt = 2026-01-10T10:00:00Z, priority normal (48 h) → deadline ≈ +48 h.
6. **Bonus** — utilisez `/tests` pour générer deux cas de test.

**Critère de réussite :** diagnostic Ask correct ; correction Edit avec addition ; test manuel OK.

> **Correction** : [Accéder à la correction](../correction/fr/correction-03-chat-modes.md)
