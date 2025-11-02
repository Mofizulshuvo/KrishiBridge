import React from "react";
import { calculateFreshness, getFreshnessColor, getFreshnessGradient, getTimeAgo } from "@/lib/freshness";

export const FreshnessScore = ({ uploadTime, showLabel = true, size = "md" }) => {
  const score = calculateFreshness(uploadTime);
  const timeAgo = getTimeAgo(uploadTime);
  const gradient = getFreshnessGradient(score);
  const textColor = getFreshnessColor(score);

  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  const textClass = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className={`flex justify-between ${textClass}`}>
          <span className="text-muted-foreground">🥦 Freshness Score</span>
          <span className={`font-semibold ${textColor}`}>{score}%</span>
        </div>
      )}
      <div className={`${heightClass} bg-muted rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${gradient} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground">Harvested {timeAgo}</p>
      )}
    </div>
  );
};
