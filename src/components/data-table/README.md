# Système de Tableau Générique

Ce système fournit des composants de tableau réutilisables et configurables pour afficher et filtrer n'importe quel type de données.

## 🎯 Avantages

- **Générique** : Fonctionne avec n'importe quel type de données TypeScript
- **Configurable** : Colonnes, filtres et comportements personnalisables
- **Réutilisable** : Un seul composant pour tous vos besoins de tableaux
- **Type-safe** : Entièrement typé avec TypeScript
- **Fonctionnalités complètes** : Recherche, filtrage, export, pagination

## 📁 Structure

```
src/
├── components/data-table/
│   ├── data-table.tsx           # Composant principal générique
│   ├── data-table-skeleton.tsx  # Composant de chargement
│   └── index.ts                 # Exports
├── hooks/
│   └── use-generic-table-filters.ts  # Hook pour la gestion des filtres
├── types/
│   └── table.types.ts           # Types TypeScript
└── examples/
    └── products-table-example.tsx  # Exemple d'utilisation
```

## 🚀 Utilisation de base

### 1. Définir votre type de données

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
```

### 2. Créer une configuration

```tsx
import { TableConfig } from "@/types/table.types";

const usersTableConfig: TableConfig<User> = {
  columns: [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-sm",
    },
    {
      key: "name",
      label: "Nom",
      className: "font-medium",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Rôle",
      render: (value) => <span className="badge">{String(value)}</span>,
    },
  ],
  searchFields: ["name", "email", "id"],
  filters: [
    {
      field: "role",
      type: "select",
      label: "Rôle",
      placeholder: "Tous les rôles",
    },
  ],
  exportable: true,
  exportFilename: "utilisateurs.csv",
};
```

### 3. Utiliser le composant

```tsx
import { DataTable } from "@/components/data-table";

const UsersPage = ({ users }: { users: User[] }) => {
  return (
    <DataTable
      data={users}
      config={usersTableConfig}
      emptyMessage="Aucun utilisateur trouvé."
      noResultsMessage="Aucun utilisateur ne correspond aux critères."
    />
  );
};
```

## 🔧 Configuration avancée

### Types de colonnes

```tsx
{
  key: "fieldName",
  label: "Libellé affiché",
  className: "classes CSS optionnelles",
  render: (value, item) => {
    // Rendu personnalisé
    return <CustomComponent value={value} item={item} />;
  }
}
```

### Types de filtres

#### Select (dropdown)

```tsx
{
  field: "status",
  type: "select",
  label: "Statut",
  options: [
    { value: "active", label: "Actif" },
    { value: "inactive", label: "Inactif" },
  ],
}
```

#### Text (recherche textuelle)

```tsx
{
  field: "description",
  type: "text",
  label: "Description",
  placeholder: "Rechercher dans la description...",
}
```

#### Number (valeur numérique)

```tsx
{
  field: "price",
  type: "number",
  label: "Prix minimum",
  placeholder: "Prix en €",
}
```

#### Date

```tsx
{
  field: "createdAt",
  type: "date",
  label: "Date de création",
}
```

## 🎨 Composant Skeleton

Pour les états de chargement :

```tsx
import { DataTableSkeleton } from "@/components/data-table";

<Suspense fallback={<DataTableSkeleton columns={4} rows={5} />}>
  <DataTable data={data} config={config} />
</Suspense>;
```

## 🪝 Hook personnalisé

Utilisez directement le hook pour des besoins spécifiques :

```tsx
import { useGenericTableFilters } from "@/hooks/use-generic-table-filters";

const {
  searchTerm,
  setSearchTerm,
  activeFilters,
  setFilter,
  clearFilters,
  filteredData,
  hasActiveFilters,
  exportToCSV,
} = useGenericTableFilters({
  data: myData,
  searchFields: ["name", "email"],
  filters: myFilters,
});
```

## 📝 Exemples complets

### Tableau d'utilisateurs

Voir : `src/components/users/users-data-table.tsx`

### Tableau de produits

Voir : `src/examples/products-table-example.tsx`

## 🔄 Migration depuis l'ancien système

1. **Remplacer les imports** :

   ```tsx
   // Avant
   import DataTable from "@/components/users/data-table";

   // Après
   import { DataTable } from "@/components/data-table";
   ```

2. **Créer une configuration** :

   ```tsx
   // Extraire la logique des colonnes dans une config
   const config: TableConfig<YourType> = { ... };
   ```

3. **Mettre à jour l'utilisation** :

   ```tsx
   // Avant
   <DataTable users={users} />

   // Après
   <DataTable data={users} config={config} />
   ```

## 🎯 Bonnes pratiques

1. **Séparer la configuration** : Créez des fichiers de config séparés
2. **Typer vos données** : Utilisez des interfaces TypeScript strictes
3. **Réutiliser les configs** : Une config par type de données
4. **Personnaliser le rendu** : Utilisez la fonction `render` pour les cas complexes
5. **Optimiser les performances** : Mémoïsez les configurations lourdes

## 🐛 Dépannage

### Erreurs de type communes

1. **"Type not assignable"** : Vérifiez que votre type étend `Record<string, unknown>`
2. **"Property does not exist"** : Assurez-vous que les clés existent dans votre type
3. **"Render function error"** : Utilisez `String(value)` pour convertir les valeurs

### Performance

- Les filtres sont mémoïsés automatiquement
- Utilisez `React.memo` pour les composants de rendu personnalisés
- Limitez le nombre de colonnes pour de gros datasets
