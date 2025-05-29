"use client";

import { updateUserInfo } from "@/actions/users";
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
import { BaseUser } from "@/types/users.type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EditUserInfoModalProps {
  user: BaseUser;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserInfoModal({
  user,
  isOpen,
  onClose,
  onSuccess,
}: EditUserInfoModalProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserInfo(user.id.toString(), formData);
      toast.success("Informations utilisateur mises à jour avec succès");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Erreur lors de la mise à jour des informations utilisateur");
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier les informations utilisateur</DialogTitle>
          <DialogDescription>
            Modifiez les informations de base de l&apos;utilisateur.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Entrez le prénom"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Nom de famille</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Entrez le nom de famille"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Entrez l'email"
                required
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
