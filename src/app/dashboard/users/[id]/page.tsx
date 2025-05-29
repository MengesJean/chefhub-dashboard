"use client";

import { getUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import EditUserFoodStylesModal from "@/components/users/edit-user-food-styles-modal";
import EditUserInfoModal from "@/components/users/edit-user-info-modal";
import EditUserProfileModal from "@/components/users/edit-user-profile-modal";
import { Review, UserProfile } from "@/types/users.type";
import {
  ArrowLeft,
  Calendar,
  Edit,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Star,
  TrendingUp,
  User,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const [id, setId] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showFoodStylesModal, setShowFoodStylesModal] = useState(false);

  // Get the id from params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  const fetchUserProfile = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getUser(id);
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const handleUserInfoUpdate = () => {
    fetchUserProfile();
  };

  const handleUserProfileUpdate = () => {
    fetchUserProfile();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Chargement...</div>
    );
  }

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
    reviews,
    reviewStats,
  } = userProfile;

  // Create BaseUser object for the modal
  const baseUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    provider: user.provider,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations utilisateur
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUserInfoModal(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations profil
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUserProfileModal(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Prénom
              </label>
              <p className="font-medium">{user.firstName || "Non renseigné"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nom de famille
              </label>
              <p className="font-medium">{user.lastName || "Non renseigné"}</p>
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Styles de cuisine préférés
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFoodStylesModal(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
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

      {/* Section vide si pas de styles pour permettre la modification quand même */}
      {(!foodStyles || foodStyles.length === 0) && (
        <div className="border rounded-lg p-6 bg-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Styles de cuisine préférés
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFoodStylesModal(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Aucun style de cuisine sélectionné pour le moment.
          </p>
        </div>
      )}

      {/* Avis et évaluations */}
      {reviewStats && (
        <div className="space-y-6">
          {/* Statistiques globales */}
          <div className="border rounded-lg p-6 bg-card">
            <div className="mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Statistiques des avis
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {reviewStats.totalReviews}
                </div>
                <p className="text-sm text-muted-foreground">
                  Avis total{reviewStats.totalReviews !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-3xl font-bold text-primary">
                    {reviewStats.averageRating}
                  </span>
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-sm text-muted-foreground">Note moyenne</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Répartition des notes</p>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-4">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${
                            reviewStats.totalReviews > 0
                              ? ((reviewStats.ratingDistribution[rating] || 0) /
                                  reviewStats.totalReviews) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {reviewStats.ratingDistribution[rating] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Liste des avis */}
          {reviews && reviews.length > 0 && (
            <div className="border rounded-lg p-6 bg-card">
              <div className="mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Avis des clients ({reviews.length})
                </h2>
              </div>
              <div className="space-y-4">
                {reviews.map((review: Review) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {review.reviewerName}
                          </span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.reviewerEmail && (
                          <p className="text-sm text-muted-foreground">
                            {review.reviewerEmail}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Service le{" "}
                          {new Date(review.serviceDate).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Publié le{" "}
                          {new Date(review.createdAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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

      {/* Modals */}
      {userProfile && (
        <>
          <EditUserInfoModal
            user={baseUser}
            isOpen={showUserInfoModal}
            onClose={() => setShowUserInfoModal(false)}
            onSuccess={handleUserInfoUpdate}
          />
          <EditUserProfileModal
            userProfile={userProfile}
            isOpen={showUserProfileModal}
            onClose={() => setShowUserProfileModal(false)}
            onSuccess={handleUserProfileUpdate}
          />
          <EditUserFoodStylesModal
            userProfile={userProfile}
            isOpen={showFoodStylesModal}
            onClose={() => setShowFoodStylesModal(false)}
            onSuccess={handleUserInfoUpdate}
          />
        </>
      )}
    </div>
  );
}
