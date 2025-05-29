# Système de Gestion des Styles de Cuisine

Ce module fournit un système complet de gestion CRUD (Create, Read, Update, Delete) pour les styles de cuisine avec des modales Shadcn/UI.

## 🎯 Fonctionnalités

- ✅ **Affichage** : Tableau avec recherche et export
- ✅ **Création** : Modal de création avec validation
- ✅ **Édition** : Modal d'édition pré-rempli
- ✅ **Suppression** : Modal de confirmation
- ✅ **Actions** : Boutons d'action dans chaque ligne
- ✅ **Gestion d'état** : Loading states et gestion d'erreurs

## 📁 Structure des fichiers

```
src/components/food-style/
├── food-style-data-table.tsx      # Composant principal avec modales
├── food-style-table-config.tsx    # Configuration du tableau avec actions
├── food-style-form-modal.tsx      # Modal de création/édition
├── food-style-delete-modal.tsx    # Modal de confirmation de suppression
├── index.ts                       # Exports
└── README.md                      # Documentation
```

## 🚀 Utilisation

### Composant principal

```tsx
import FoodStyleDataTable from "@/components/food-style/food-style-data-table";

<FoodStyleDataTable foodStyles={foodStyles} loading={false} />;
```

### Fonctionnalités intégrées

1. **Header avec bouton d'ajout**

   - Titre et description
   - Bouton "Ajouter un style" avec icône Plus

2. **Tableau avec actions**

   - Colonnes : ID, Nom (avec badge), Actions
   - Boutons Éditer et Supprimer dans chaque ligne
   - Recherche et export CSV

3. **Modales automatiques**
   - Modal de création (vide)
   - Modal d'édition (pré-rempli)
   - Modal de suppression (confirmation)

## 🎨 Interface utilisateur

### Tableau

- **ID** : Police monospace, petite taille
- **Nom** : Badge bleu avec style arrondi
- **Actions** : Boutons icônes (Edit/Trash)

### Modales

- **Création** : Titre "Créer un style de cuisine"
- **Édition** : Titre "Modifier le style de cuisine"
- **Suppression** : Confirmation avec nom du style

### États

- **Loading** : Spinners sur les boutons
- **Erreurs** : Messages d'erreur en rouge
- **Validation** : Champ requis avec feedback

## 🔧 Configuration technique

### Actions serveur

```tsx
// src/actions/food-style.ts
export async function createFoodStyle(formData: FormData);
export async function updateFoodStyle(id: string, formData: FormData);
export async function deleteFoodStyle(id: string);
```

### Configuration du tableau

```tsx
// Fonction factory pour injecter les callbacks
export const createFoodStyleTableConfig = ({
  onEdit: (foodStyle: FoodStyle) => void,
  onDelete: (foodStyle: FoodStyle) => void,
}) => TableConfig<FoodStyle>
```

### Gestion d'état

```tsx
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedFoodStyle, setSelectedFoodStyle] = useState<FoodStyle | null>(
  null
);
```

## 🎭 Modales

### FoodStyleFormModal

- **Props** : `isOpen`, `onClose`, `foodStyle?`, `mode`
- **Modes** : `"create"` | `"edit"`
- **Validation** : Nom requis, trim automatique
- **États** : Loading, erreurs, succès

### FoodStyleDeleteModal

- **Props** : `isOpen`, `onClose`, `foodStyle`
- **Confirmation** : Affiche le nom du style
- **Sécurité** : Action irréversible mentionnée

## 🔄 Flux de données

1. **Création**

   ```
   Bouton "Ajouter" → Modal création → Action serveur → Revalidation → Fermeture
   ```

2. **Édition**

   ```
   Bouton "Éditer" → Modal édition (pré-rempli) → Action serveur → Revalidation → Fermeture
   ```

3. **Suppression**
   ```
   Bouton "Supprimer" → Modal confirmation → Action serveur → Revalidation → Fermeture
   ```

## 🛡️ Gestion d'erreurs

- **Validation côté client** : Champs requis
- **Erreurs serveur** : Affichage dans les modales
- **États de chargement** : Désactivation des boutons
- **Revalidation** : Mise à jour automatique des données

## 🎨 Personnalisation

### Styles

- Badges bleus pour les noms
- Boutons d'action avec icônes Lucide
- Messages d'erreur avec fond rouge
- Animations de chargement

### Responsive

- Modales adaptatives (max-width sur mobile)
- Boutons empilés sur petits écrans
- Tableau scrollable horizontalement

## 🔮 Extensions possibles

1. **Validation avancée** : Schémas Zod
2. **Toast notifications** : Ajout de Sonner
3. **Optimistic updates** : Mise à jour immédiate
4. **Bulk actions** : Sélection multiple
5. **Drag & drop** : Réorganisation
6. **Filtres avancés** : Par date de création, etc.

## 📝 Exemple complet

```tsx
// Page complète avec le système
import { getFoodStyles } from "@/actions/food-style";
import FoodStyleDataTable from "@/components/food-style/food-style-data-table";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";
import { Suspense } from "react";

export default async function FoodStylePage() {
  const foodStyles = await getFoodStyles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Styles de cuisine</h1>
        <p className="text-muted-foreground">
          Gérez et consultez la liste des styles de cuisine.
        </p>
      </div>

      <Suspense fallback={<DataTableSkeleton columns={3} rows={5} />}>
        <FoodStyleDataTable foodStyles={foodStyles} />
      </Suspense>
    </div>
  );
}
```

Ce système peut être facilement adapté pour d'autres entités en suivant le même pattern !
