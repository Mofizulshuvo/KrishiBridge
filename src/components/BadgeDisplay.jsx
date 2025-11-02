import React from "react";
import { Badge } from "@/components/ui/badge";
import { FARMER_BADGES } from "@/lib/freshness";

export const BadgeDisplay = ({ badges = [], maxDisplay = 3 }) => {
  const displayBadges = badges.slice(0, maxDisplay);
  const remaining = badges.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-2">
      {displayBadges.map((badgeType) => {
        const badge = FARMER_BADGES[badgeType];
        if (!badge) return null; // safety check

        return (
          <Badge key={badgeType} className={badge.color}>
            {badge.icon && <span className="mr-1">{badge.icon}</span>}
            {badge.label}
          </Badge>
        );
      })}
      {remaining > 0 && (
        <Badge variant="outline" className="text-muted-foreground">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
};
