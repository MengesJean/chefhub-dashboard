"use client";

import { createFoodStyle, updateFoodStyle } from "@/actions/food-style";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodStyle } from "@/types/food-style.type";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface FoodStyleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodStyle?: FoodStyle | null;
  mode: "create" | "edit";
}

const FoodStyleFormModal = ({
  isOpen,
  onClose,
  foodStyle,
  mode,
}: FoodStyleFormModalProps) => {
  const [name, setName] = useState(foodStyle?.name || "");
  const [isPending, startTransition] = useTransition();

  // Synchroniser l'état local avec les props quand elles changent
  useEffect(() => {
    setName(foodStyle?.name || "");
  }, [foodStyle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Le nom du style de cuisine est requis");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());

    startTransition(async () => {
      try {
        if (mode === "create") {
          await createFoodStyle(formData);
          toast.success("Style de cuisine créé avec succès");
        } else if (mode === "edit" && foodStyle) {
          await updateFoodStyle(foodStyle.id, formData);
          toast.success("Style de cuisine modifié avec succès");
        }
        handleClose();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      }
    });
  };

  const handleClose = () => {
    setName(foodStyle?.name || "");
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create"
                ? "Créer un style de cuisine"
                : "Modifier le style de cuisine"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Ajoutez un nouveau style de cuisine à votre application."
                : "Modifiez les informations du style de cuisine."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Cuisine française"
                className="col-span-3"
                disabled={isPending}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {mode === "create" ? "Création..." : "Modification..."}
                </>
              ) : mode === "create" ? (
                "Créer"
              ) : (
                "Modifier"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodStyleFormModal;
