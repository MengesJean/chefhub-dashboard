"use client";

import { getFoodStyles } from "@/actions/food-style";
import { updateUserFoodStyles } from "@/actions/users";
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
import { FoodStyle } from "@/types/food-style.type";
import { UserProfile } from "@/types/users.type";
import { Loader2, Search, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditUserFoodStylesModalProps {
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserFoodStylesModal({
  userProfile,
  isOpen,
  onClose,
  onSuccess,
}: EditUserFoodStylesModalProps) {
  const [allFoodStyles, setAllFoodStyles] = useState<FoodStyle[]>([]);
  const [selectedStyleIds, setSelectedStyleIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingStyles, setIsFetchingStyles] = useState(false);

  // Filter food styles based on search term
  const filteredFoodStyles = allFoodStyles.filter((style) =>
    style.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize selected styles when modal opens
  useEffect(() => {
    if (isOpen && userProfile.foodStyles) {
      const currentStyleIds = userProfile.foodStyles.map((style) =>
        style.id.toString()
      );
      setSelectedStyleIds(currentStyleIds);
      setSearchTerm(""); // Reset search when opening
      fetchAllFoodStyles();
    }
  }, [isOpen, userProfile.foodStyles]);

  const fetchAllFoodStyles = async () => {
    try {
      setIsFetchingStyles(true);
      const styles = await getFoodStyles();
      setAllFoodStyles(styles);
    } catch (error) {
      console.error("Error fetching food styles:", error);
      toast.error("Erreur lors du chargement des styles de cuisine");
    } finally {
      setIsFetchingStyles(false);
    }
  };

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyleIds((prev) => {
      if (prev.includes(styleId)) {
        return prev.filter((id) => id !== styleId);
      } else {
        return [...prev, styleId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserFoodStyles(
        userProfile.userId.toString(),
        selectedStyleIds
      );
      toast.success("Styles de cuisine mis à jour avec succès");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating user food styles:", error);
      toast.error("Erreur lors de la mise à jour des styles de cuisine");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (userProfile.foodStyles) {
      const currentStyleIds = userProfile.foodStyles.map((style) =>
        style.id.toString()
      );
      setSelectedStyleIds(currentStyleIds);
    }
    setSearchTerm(""); // Reset search on close
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Modifier les styles de cuisine
          </DialogTitle>
          <DialogDescription>
            Sélectionnez les styles de cuisine préférés pour{" "}
            {userProfile.user.firstName && userProfile.user.lastName
              ? `${userProfile.user.firstName} ${userProfile.user.lastName}`
              : userProfile.user.email}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4">
            {isFetchingStyles ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Chargement des styles...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    Styles de cuisine disponibles ({allFoodStyles.length})
                  </div>
                  {searchTerm && (
                    <div className="text-xs text-muted-foreground">
                      {filteredFoodStyles.length} résultat
                      {filteredFoodStyles.length !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un style de cuisine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto border rounded-md p-3">
                  {filteredFoodStyles.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchTerm
                        ? "Aucun style trouvé pour votre recherche"
                        : "Aucun style de cuisine disponible"}
                    </div>
                  ) : (
                    filteredFoodStyles.map((style) => (
                      <label
                        key={style.id}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStyleIds.includes(
                            style.id.toString()
                          )}
                          onChange={() =>
                            handleStyleToggle(style.id.toString())
                          }
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="flex-1 text-sm">{style.name}</span>
                      </label>
                    ))
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  {selectedStyleIds.length} style
                  {selectedStyleIds.length !== 1 ? "s" : ""} sélectionné
                  {selectedStyleIds.length !== 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading || isFetchingStyles}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading || isFetchingStyles}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
