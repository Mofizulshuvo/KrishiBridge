// Utility functions for KrishiBridge Insight Engine™

export const calculateFreshness = (uploadTime) => {
  const now = new Date();
  const uploadDate = new Date(uploadTime);
  const hoursSinceUpload = (now - uploadDate) / (1000 * 60 * 60); // cleaner math

  if (isNaN(hoursSinceUpload)) return 0; // in case uploadTime is invalid

  // Freshness score algorithm
  if (hoursSinceUpload < 4) return 100;
  if (hoursSinceUpload < 12) return Math.max(90, 100 - hoursSinceUpload * 2);
  if (hoursSinceUpload < 24) return Math.max(70, 100 - hoursSinceUpload * 3);
  if (hoursSinceUpload < 48) return Math.max(50, 100 - hoursSinceUpload * 1.5);
  return Math.max(20, 100 - hoursSinceUpload);
};

export const getFreshnessColor = (score) => {
  if (score >= 90) return "text-primary";
  if (score >= 70) return "text-secondary";
  return "text-destructive";
};

export const getFreshnessGradient = (score) => {
  if (score >= 90) return "from-primary to-primary-glow";
  if (score >= 70) return "from-secondary to-secondary-glow";
  return "from-destructive to-destructive/70";
};

export const getTimeAgo = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date)) return "Invalid date"; // safeguard

  const hours = Math.floor((new Date() - date) / (1000 * 60 * 60));

  if (hours < 1) return "Just harvested";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};

// Badge system
export const FARMER_BADGES = {
  top_seller: {
    type: "top_seller",
    label: "Top Seller",
    icon: "🏆",
    color: "bg-secondary/10 text-secondary",
  },
  punctual: {
    type: "punctual",
    label: "Punctual Farmer",
    icon: "⏰",
    color: "bg-primary/10 text-primary",
  },
  freshness_champion: {
    type: "freshness_champion",
    label: "Freshness Champion",
    icon: "🥦",
    color: "bg-primary/10 text-primary",
  },
  trusted: {
    type: "trusted",
    label: "Verified Trusted",
    icon: "✓",
    color: "bg-primary/10 text-primary",
  },
  eco_warrior: {
    type: "eco_warrior",
    label: "Eco Warrior",
    icon: "🌱",
    color: "bg-primary/10 text-primary",
  },
};

// Smart matchmaking
export const calculateDistance = (farmerLocation, buyerLocation) => {
  const locations = {
    Kumira: { lat: 50, lng: 80 },
    GEC: { lat: 48, lng: 82 },
    Agrabad: { lat: 33, lng: 81 },
  };

  const loc1 = locations[farmerLocation] || locations["Kumira"];
  const loc2 = locations[buyerLocation] || locations["GEC"];

  const distance = Math.sqrt(
    Math.pow((loc2.lat - loc1.lat) * 111, 2) +
      Math.pow((loc2.lng - loc1.lng) * 111, 2)
  );

  return Math.round(distance * 10) / 10;
};
