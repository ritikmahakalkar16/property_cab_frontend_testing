import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Property } from "@/types";

interface PropertyDescriptionProps {
  property: Property;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ property }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {property.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Property Type</p>
            <p className="font-medium">{property.property_type}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Listing Type</p>
            <p className="font-medium capitalize">{property.listing_type}</p>
          </div>

          {property.furnishing && (
            <div>
              <p className="text-sm text-muted-foreground">Furnishing</p>
              <p className="font-medium capitalize">{property.furnishing}</p>
            </div>
          )}

          {property.facing && (
            <div>
              <p className="text-sm text-muted-foreground">Facing</p>
              <p className="font-medium">{property.facing}</p>
            </div>
          )}

          {property.age_of_property && (
            <div>
              <p className="text-sm text-muted-foreground">Property Age</p>
              <p className="font-medium">{property.age_of_property}</p>
            </div>
          )}

          {property.construction_status && (
            <div>
              <p className="text-sm text-muted-foreground">
                Construction Status
              </p>
              <p className="font-medium">
                {property.construction_status}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDescription;
