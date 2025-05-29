"use client";

import { deleteFoodStyle } from "@/actions/food-style";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FoodStyle } from "@/types/food-style.type";
import { useTransition } from "react";
import { toast } from "sonner";

interface FoodStyleDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodStyle: FoodStyle | null;
}

const FoodStyleDeleteModal = ({
  isOpen,
  onClose,
  foodStyle,
}: FoodStyleDeleteModalProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!foodStyle) return;

    startTransition(async () => {
      try {
        await deleteFoodStyle(foodStyle.id);
        toast.success(
          `Style de cuisine "${foodStyle.name}" supprimé avec succès`
        );
        onClose();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      }
    });
  };

  const handleClose = () => {
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
        <DialogHeader>
          <DialogTitle>Supprimer le style de cuisine</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le style de cuisine{" "}
            <span className="font-semibold">{foodStyle?.name}</span> ? Cette
            action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Suppression...
              </>
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FoodStyleDeleteModal;
