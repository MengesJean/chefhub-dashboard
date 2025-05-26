# Guide de Migration - Nouveaux Tableaux Génériques

Ce guide explique les changements apportés aux pages pour utiliser le nouveau système de tableaux génériques.

## 🔄 Pages mises à jour

### 1. Page des Utilisateurs (`/dashboard/users`)

**Avant :**

```tsx
import DataTable from "@/components/users/data-table";
import DataTableSkeleton from "@/components/users/data-table-skeleton";

<DataTable users={users} />;
```

**Après :**

```tsx
import UsersDataTable from "@/components/users/users-data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

<UsersDataTable users={users} />;
```

### 2. Page des Administrateurs (`/dashboard/administrators`)

**Avant :**

```tsx
import DataTable from "@/components/users/data-table";
import DataTableSkeleton from "@/components/users/data-table-skeleton";

<DataTable users={users} />;
```

**Après :**

```tsx
import AdministratorsDataTable from "@/components/administrators/administrators-data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

<AdministratorsDataTable administrators={administrators} />;
```

### 3. Page des Styles de Cuisine (`/dashboard/food-style`)

**Avant :**

```tsx
import DataTable from "@/components/food-style/data-table";
import DataTableSkeleton from "@/components/food-style/data-table-skeleton";

{
  foodStyles.length > 0 ? (
    <DataTable foodStyles={foodStyles} />
  ) : (
    <div>Aucun style de cuisine trouvé.</div>
  );
}
```

**Après :**

```tsx
import FoodStyleDataTable from "@/components/food-style/food-style-data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

<FoodStyleDataTable foodStyles={foodStyles} />;
```

## 🎯 Améliorations apportées

### ✅ Composants spécialisés

- **UsersDataTable** : Tableau optimisé pour les utilisateurs
- **AdministratorsDataTable** : Tableau avec style spécifique pour les admins (badge rouge)
- **FoodStyleDataTable** : Tableau simplifié pour les styles de cuisine (badge bleu)

### ✅ Configurations personnalisées

- **usersTableConfig** : 4 colonnes, filtres par rôle, export CSV
- **administratorsTableConfig** : 4 colonnes, style admin, export CSV
- **foodStyleTableConfig** : 2 colonnes, pas de filtres, export CSV

### ✅ Skeleton unifié

- Un seul composant `DataTableSkeleton` pour toutes les pages
- Configurable : `columns` et `rows` personnalisables
- Cohérent avec le design system

### ✅ Gestion des états améliorée

- Messages d'erreur personnalisés par type de données
- Gestion automatique des états vides
- Pas besoin de conditions manuelles

## 🎨 Styles spécifiques

### Utilisateurs

- Badge gris pour les rôles
- 4 colonnes : ID, Nom, Email, Rôle

### Administrateurs

- Badge rouge pour les rôles (distinction visuelle)
- 4 colonnes : ID, Nom, Email, Rôle

### Styles de cuisine

- Badge bleu pour les noms
- 2 colonnes : ID, Nom du style

## 📦 Structure des fichiers

```
src/components/
├── data-table/              # Système générique
│   ├── data-table.tsx
│   ├── data-table-skeleton.tsx
│   └── index.ts
├── users/                   # Spécifique aux utilisateurs
│   ├── users-data-table.tsx
│   ├── users-table-config.tsx
│   └── index.ts
├── administrators/          # Spécifique aux admins
│   ├── administrators-data-table.tsx
│   ├── administrators-table-config.tsx
│   └── index.ts
└── food-style/             # Spécifique aux styles
    ├── food-style-data-table.tsx
    ├── food-style-table-config.tsx
    └── index.ts
```

## 🚀 Avantages

1. **Réutilisabilité** : Un système pour tous les types de données
2. **Maintenabilité** : Configuration centralisée par type
3. **Consistance** : Interface utilisateur uniforme
4. **Extensibilité** : Facile d'ajouter de nouveaux types
5. **Performance** : Optimisations automatiques (mémoïsation, filtres)

## 🔧 Ajout d'un nouveau type

Pour ajouter un nouveau type de données :

1. **Créer le type** dans `src/types/`
2. **Créer la configuration** dans `src/components/[type]/[type]-table-config.tsx`
3. **Créer le wrapper** dans `src/components/[type]/[type]-data-table.tsx`
4. **Créer l'index** dans `src/components/[type]/index.ts`
5. **Utiliser dans la page** :

```tsx
import MyDataTable from "@/components/my-type/my-data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

<Suspense fallback={<DataTableSkeleton columns={3} rows={5} />}>
  <MyDataTable data={myData} />
</Suspense>;
```

## 🧹 Nettoyage

Les anciens composants peuvent maintenant être supprimés :

- `src/components/users/data-table.tsx` (ancien)
- `src/components/users/data-table-skeleton.tsx` (ancien)
- `src/components/food-style/data-table.tsx` (ancien)
- `src/components/food-style/data-table-skeleton.tsx` (ancien)
- `src/components/food-style/advanced-data-table.tsx` (ancien)
