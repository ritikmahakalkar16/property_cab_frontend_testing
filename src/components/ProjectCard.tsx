import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Layers, Home, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UnitConfig {
  type: string;
  area: string;
  price: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  projectName?: string;
  price: string;
  location: string;
  totalTowers?: number;
  totalUnits?: number;
  unitConfigurations?: UnitConfig[];
  constructionStatus?: string;
  possessionDate?: string;
  reraNumber?: string;
  imageUrl: string;
  type: "buy" | "rent" | "sale";
  featured?: boolean;
  projectHighlights?: string[];
}

const ProjectCard = ({
  id,
  title,
  projectName,
  price,
  location,
  totalTowers,
  totalUnits,
  unitConfigurations,
  constructionStatus,
  possessionDate,
  reraNumber,
  imageUrl,
  type,
  featured = false,
  projectHighlights,
}: ProjectCardProps) => {
  const listingTypeText = type === 'rent' ? 'Rent' : 'Sale';

  // Get unit types summary
  const unitTypesSummary = unitConfigurations?.map(u => u.type).join(', ') || '';

  return (
    <Link href={`/projects/${id}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-border hover:-translate-y-2 bg-card">
        {/* Image Section */}
        <div className="relative overflow-hidden h-56 w-full">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={imageUrl?.startsWith('http')} // Skip optimization for external URLs initially to avoid config issues
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {featured && (
              <Badge className="bg-accent text-accent-foreground shadow-lg">
                Featured
              </Badge>
            )}
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
              Project
            </Badge>
          </div>

          <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground capitalize backdrop-blur-sm z-10">
            For {listingTypeText}
          </Badge>

          {constructionStatus && (
            <Badge className="absolute bottom-3 left-3 bg-secondary/95 text-secondary-foreground backdrop-blur-sm z-10">
              {constructionStatus}
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Project Name */}
          {projectName && (
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {projectName}
            </p>
          )}

          <h3 className="font-bold text-lg text-card-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 text-accent shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {totalTowers !== undefined && (
              <div className="flex flex-col items-center bg-secondary/50 px-2 py-2 rounded-lg">
                <Building2 className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Towers</span>
                <span className="text-sm font-semibold text-card-foreground">{totalTowers}</span>
              </div>
            )}
            {totalUnits !== undefined && (
              <div className="flex flex-col items-center bg-secondary/50 px-2 py-2 rounded-lg">
                <Home className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Units</span>
                <span className="text-sm font-semibold text-card-foreground">{totalUnits}</span>
              </div>
            )}
            {unitTypesSummary && (
              <div className="flex flex-col items-center bg-secondary/50 px-2 py-2 rounded-lg">
                <Layers className="h-4 w-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Config</span>
                <span className="text-sm font-semibold text-card-foreground line-clamp-1">{unitTypesSummary}</span>
              </div>
            )}
          </div>

          {/* Unit Configurations Preview */}
          {unitConfigurations && unitConfigurations.length > 0 && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-medium text-muted-foreground mb-2">Starting From</p>
              <div className="flex flex-wrap gap-2">
                {unitConfigurations.slice(0, 3).map((unit, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {unit.type} - {unit.area}
                  </Badge>
                ))}
                {unitConfigurations.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{unitConfigurations.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Possession & RERA */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            {possessionDate && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{possessionDate}</span>
              </div>
            )}
            {reraNumber && (
              <div className="flex items-center gap-1 text-green-600">
                <Shield className="h-3.5 w-3.5" />
                <span className="text-xs">RERA Approved</span>
              </div>
            )}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <span className="text-xl font-bold text-primary">{price}</span>
            </div>
            <span className="text-sm text-accent font-medium group-hover:underline">
              View Project →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
