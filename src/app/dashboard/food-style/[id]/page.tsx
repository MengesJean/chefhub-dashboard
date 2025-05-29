"use client";

import { getFoodStyle } from "@/actions/food-style";
import { Button } from "@/components/ui/button";
import { FoodStyle } from "@/types/food-style.type";
import { ArrowLeft, Hash, Settings, Utensils } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface FoodStyleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function FoodStyleDetailPage({
  params,
}: FoodStyleDetailPageProps) {
  const [id, setId] = useState<string>("");
  const [foodStyle, setFoodStyle] = useState<FoodStyle | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the id from params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  const fetchFoodStyle = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getFoodStyle(id);
      setFoodStyle(data);
    } catch (error) {
      console.error("Error fetching food style:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodStyle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Chargement...</div>
    );
  }

  if (!foodStyle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/food-style">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Style de cuisine
          </h1>
          <p className="text-muted-foreground">
            Détails du style de cuisine &ldquo;{foodStyle.name}&rdquo;
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations principales */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Informations principales
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  ID
                </label>
                <p className="font-mono text-sm">{foodStyle.id}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nom du style
              </label>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800">
                  {foodStyle.name}
                </span>
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
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Statut
              </label>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  Actif
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Type
              </label>
              <p>Style de cuisine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
