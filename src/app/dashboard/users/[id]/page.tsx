import { getUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  try {
    const userProfile = await getUser(params.id);

    if (!userProfile) {
      notFound();
    }

    // La structure réelle est différente : userProfile contient directement les données du profil
    // avec un objet user intégré
    const {
      user,
      description,
      dateOfBirth,
      phoneNumber,
      address,
      city,
      postalCode,
      country,
      foodStyles,
    } = userProfile;
    console.log(user);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/users">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Profil utilisateur
            </h1>
            <p className="text-muted-foreground">
              Détails du profil de{" "}
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.email || "l'utilisateur"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations utilisateur */}
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations utilisateur
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  ID
                </label>
                <p className="font-mono text-sm">{user?.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p>{user?.email || "Non renseigné"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Rôle
                  </label>
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                      {user?.role || "Non défini"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Fournisseur
                </label>
                <p>{user?.provider || "Non renseigné"}</p>
              </div>
            </div>
          </div>

          {/* Informations profil */}
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations profil
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Prénom
                </label>
                <p className="font-medium">
                  {user.firstName || "Non renseigné"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Nom de famille
                </label>
                <p className="font-medium">
                  {user.lastName || "Non renseigné"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Téléphone
                  </label>
                  <p>{phoneNumber || "Non renseigné"}</p>
                </div>
              </div>
              {dateOfBirth && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Date de naissance
                    </label>
                    <p>{new Date(dateOfBirth).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adresse
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Adresse
              </label>
              <p>{address || "Non renseignée"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Ville
              </label>
              <p>{city || "Non renseignée"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Code postal
              </label>
              <p>{postalCode || "Non renseigné"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Pays
              </label>
              <p>{country || "Non renseigné"}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Description
              </h2>
            </div>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>
        )}

        {/* Styles de cuisine préférés */}
        {foodStyles && foodStyles.length > 0 && (
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Styles de cuisine préférés
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {foodStyles.map((style: { id: number; name: string }) => (
                <span
                  key={style.id}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border"
                >
                  {style.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Métadonnées */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Métadonnées</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date de création
                </label>
                <p>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Non disponible"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Dernière mise à jour
                </label>
                <p>
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Non disponible"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  ID du profil
                </label>
                <p className="font-mono text-sm">{userProfile.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Lien utilisateur (userId)
                </label>
                <p className="font-mono text-sm">{userProfile.userId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    notFound();
  }
}
