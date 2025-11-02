import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, User } from "lucide-react";

export const QRTraceability = ({ data }) => {
  const qrData = JSON.stringify({
    orderId: data.orderId,
    farmer: data.farmerName,
    location: data.farmLocation,
    product: data.productName,
    harvest: data.harvestDate.toISOString(),
    freshness: data.freshnessScore,
    verified: "KrishiBridge Insight Engine™",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📦 Product Traceability
        </CardTitle>
        <CardDescription>
          Scan to verify product origin and freshness
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 bg-background rounded-lg">
          <QRCodeSVG value={qrData} size={180} level="H" includeMargin />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">Farmer:</span> {data.farmerName}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">Location:</span> {data.farmLocation}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Harvested:</span> {data.harvestDate.toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Freshness:</span>
            <Badge className="bg-primary">🥦 {data.freshnessScore}%</Badge>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground pt-2 border-t">
          Powered by KrishiBridge Insight Engine™
        </div>
      </CardContent>
    </Card>
  );
};
