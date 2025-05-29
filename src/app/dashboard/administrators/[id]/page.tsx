import { getAdministrator } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Mail,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface AdminProfilePageProps {
  params: {
    id: string;
  };
}

export default async function AdminProfilePage({
  params,
}: AdminProfilePageProps) {
  try {
    const { id } = await params;
    const administrator = await getAdministrator(id);

    if (!administrator) {
      notFound();
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/administrators">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Profil administrateur
            </h1>
            <p className="text-muted-foreground">
              Détails de{" "}
              {administrator.firstName && administrator.lastName
                ? `${administrator.firstName} ${administrator.lastName}`
                : administrator.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informations personnelles */}
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  ID
                </label>
                <p className="font-mono text-sm">{administrator.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Prénom
                </label>
                <p className="font-medium">
                  {administrator.firstName || "Non renseigné"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Nom
                </label>
                <p className="font-medium">
                  {administrator.lastName || "Non renseigné"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p>{administrator.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations système */}
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Informations système
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Rôle
                  </label>
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                      {administrator.role}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Fournisseur d&apos;authentification
                </label>
                <p>{administrator.provider || "Non défini"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métadonnées */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Métadonnées
            </h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date de création
                </label>
                <p>
                  {administrator.createdAt
                    ? new Date(administrator.createdAt).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "Non disponible"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Dernière mise à jour
                </label>
                <p>
                  {administrator.updatedAt
                    ? new Date(administrator.updatedAt).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "Non disponible"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching administrator:", error);
    notFound();
  }
}
