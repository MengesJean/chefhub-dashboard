"use client";

import { updateUserProfile } from "@/actions/users";
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
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/types/users.type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EditUserProfileModalProps {
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserProfileModal({
  userProfile,
  isOpen,
  onClose,
  onSuccess,
}: EditUserProfileModalProps) {
  const [formData, setFormData] = useState({
    description: userProfile.description || "",
    dateOfBirth: userProfile.dateOfBirth
      ? new Date(userProfile.dateOfBirth).toISOString().split("T")[0]
      : "",
    phoneNumber: userProfile.phoneNumber || "",
    address: userProfile.address || "",
    city: userProfile.city || "",
    postalCode: userProfile.postalCode || "",
    country: userProfile.country || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const profileData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : undefined,
      };

      await updateUserProfile(userProfile.userId.toString(), profileData);
      toast.success("Profil utilisateur mis à jour avec succès");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Erreur lors de la mise à jour du profil utilisateur");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le profil utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de profil de l&apos;utilisateur.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Entrez une description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date de naissance</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Téléphone</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="Entrez le numéro de téléphone"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Entrez l'adresse"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Entrez la ville"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  placeholder="Entrez le code postal"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="Entrez le pays"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
