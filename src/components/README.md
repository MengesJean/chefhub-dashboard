# Composants de Tableau

Ce dossier contient les composants pour afficher et filtrer les données des utilisateurs dans un tableau.

## Composants disponibles

### 1. `DataTable` - Tableau de base avec filtres

Un composant de tableau simple avec fonctionnalités de recherche et filtrage par rôle.

**Utilisation :**

```tsx
import DataTable from "@/components/data-table";
import { User } from "@/types/users.type";

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  // ...
];

<DataTable users={users} />;
```

**Fonctionnalités :**

- Recherche textuelle (nom, email, ID)
- Filtrage par rôle
- Interface responsive
- Compteur de résultats
- Messages d'état (aucun résultat, etc.)

### 2. `AdvancedDataTable` - Tableau avancé

Version améliorée avec fonctionnalités supplémentaires et utilisation du hook personnalisé.

**Utilisation :**

```tsx
import AdvancedDataTable from "@/components/advanced-data-table";

<AdvancedDataTable users={users} />;
```

**Fonctionnalités supplémentaires :**

- Export CSV
- Gestion avancée des filtres
- Interface utilisateur améliorée
- Utilise le hook `useTableFilters`

### 3. `DataTableSkeleton` - État de chargement

Composant skeleton pour afficher un état de chargement pendant la récupération des données.

**Utilisation :**

```tsx
import DataTableSkeleton from "@/components/data-table-skeleton";

<Suspense fallback={<DataTableSkeleton />}>
  <DataTable users={users} />
</Suspense>;
```

## Hook personnalisé

### `useTableFilters`

Hook réutilisable pour gérer les filtres de tableau.

**Utilisation :**

```tsx
import { useTableFilters } from "@/hooks/use-table-filters";

const {
  searchTerm,
  setSearchTerm,
  filters,
  setFilter,
  clearFilters,
  filteredData,
  hasActiveFilters,
} = useTableFilters({
  data: users,
  searchFields: ["name", "email", "id"],
});
```

## Composants UI de base

Les composants de tableau utilisent les composants UI de base situés dans `src/components/ui/table.tsx` :

- `Table` - Conteneur principal du tableau
- `TableHeader` - En-tête du tableau
- `TableBody` - Corps du tableau
- `TableRow` - Ligne du tableau
- `TableHead` - Cellule d'en-tête
- `TableCell` - Cellule de données

## Exemple d'intégration

Voir `src/app/dashboard/users/page.tsx` pour un exemple complet d'intégration avec Next.js et Suspense.

## Styles

Les composants utilisent Tailwind CSS pour le styling et suivent les conventions de design du projet avec les classes utilitaires appropriées.
