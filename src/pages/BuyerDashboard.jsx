import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Leaf, ShoppingCart, Search, Star, Clock, MapPin, LogOut, Bell, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import produceImage from "@/assets/fresh-produce.jpg";
import { FreshnessScore } from "@/components/FreshnessScore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BuyerDashboard = () => {
  const [cart, setCart] = useState([]);
  const [freshnessFilter, setFreshnessFilter] = useState("all");
  const [sortBy, setSortBy] = useState("freshness");
  const { toast } = useToast();

  const handleAddToCart = (productId) => {
    setCart([...cart, productId]);
    toast({
      title: "Added to Cart!",
      description: "Product has been added to your cart",
    });
  };

  const mockProducts = [
    {
      id: "Fresh Tomatoes",
      nameBangla: "টমেটো",
      farmer: "Abdul Karim",
      farmerBadges: ["freshness_champion", "punctual"],
      location: "Kumira",
      distance: 3,
      price: 8,
      freshness: 97,
      verified: true,
      uploadTime: Date.now() - 2 * 60 * 60 * 1000,
      rating: 4.5,
    },
    {
      id: "Cucumbers",
      nameBangla: "শসা",
      farmer: "Rahima Begum",
      farmerBadges: ["trusted"],
      location: "Kumira",
      distance: 5,
      price: 9,
      freshness: 90,
      verified: true,
      uploadTime: Date.now() - 4 * 60 * 60 * 1000,
      rating: 4.2,
    },
    {
      id: "Green Chili",
      nameBangla: "কাঁচা মরিচ",
      farmer: "Jasim Uddin",
      farmerBadges: ["top_seller", "eco_warrior"],
      location: "Kumira",
      distance: 8,
      price: 7,
      freshness: 95,
      verified: true,
      uploadTime: Date.now() - 1 * 60 * 60 * 1000,
      rating: 4.8,
    },
    {
      id: "Leafy Greens",
      nameBangla: "শাক সবজি",
      farmer: "Fatima Khatun",
      farmerBadges: ["freshness_champion"],
      location: "Kumira",
      distance: 1,
      price: 9,
      freshness: 92,
      verified: true,
      uploadTime: Date.now() - 3 * 60 * 60 * 1000,
      rating: 4.6,
    },
  ];

  const filteredProducts = mockProducts
    .filter((product) => {
      if (freshnessFilter === "ultra") return product.freshness >= 95;
      if (freshnessFilter === "high") return product.freshness >= 85;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "freshness") return b.freshness - a.freshness;
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      return 0;
    });

  const mockOrders = [
    {
      id: "order1",
      items: "Tomatoes (10kg), Cucumbers (5kg)",
      status: "confirmed",
      delivery: "Today, 8",
      total: 500,
    },
    {
      id: "order2",
      items: "Green Chili (2kg)",
      status: "dispatched",
      delivery: "Tomorrow, 7",
      total: 140,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KrishiBridge</span>
            <span className="text-sm text-muted-foreground">| Buyer Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-xs flex items-center justify-center text-secondary-foreground">
                  {cart.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">স্বাগতম, Shahed Alam</h1>
          <p className="text-muted-foreground">
            Browse fresh produce from Kumira's local farmers
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for products... পণ্য অনুসন্ধান করুন" className="pl-10 h-12" />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={freshnessFilter} onValueChange={setFreshnessFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Freshness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Freshness</SelectItem>
                <SelectItem value="ultra">🥦 Ultra Fresh (95%+)</SelectItem>
                <SelectItem value="high">Fresh (85%+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshness">Sort by Freshness</SelectItem>
                <SelectItem value="distance">Sort by Distance</SelectItem>
                <SelectItem value="price_low">Price Low</SelectItem>
                <SelectItem value="price_high">Price High</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="text-xs">
              Showing {filteredProducts.length} products
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Marketplace */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              Fresh from the Farm / তাজা পণ্য
              <span className="text-sm font-normal text-muted-foreground ml-2">
                🤖 AI-Powered by KrishiBridge Insight Engine™
              </span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover-[var(--shadow-hover)] transition-[var(--transition-smooth)]">
                  <CardHeader className="pb-3">
                    <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                      <img src={produceImage} alt={product.name} className="h-full w-full object-cover" />
                      {product.verified && (
                        <Badge className="absolute top-2 right-2 bg-primary">✓ Verified Fresh</Badge>
                      )}
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.id}</CardTitle>
                        <CardDescription>{product.nameBangla}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">৳{product.price}</p>
                        <p className="text-xs text-muted-foreground">per kg</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{product.farmer}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        📍 {product.distance} km
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{product.location}</span>
                    </div>

                    <FreshnessScore uploadTime={product.uploadTime} size="sm" />

                    <Button onClick={() => handleAddToCart(product.id)} variant="secondary" className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Orders */}
            <Card>
              <CardHeader>
                <CardTitle>My Orders / আমার অর্ডার</CardTitle>
                <CardDescription>Track your recent purchases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{order.items}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.delivery}</p>
                      </div>
                      <p className="font-bold">৳{order.total}</p>
                    </div>
                    <Badge
                      variant={order.status === "dispatched" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {order.status === "confirmed" ? "Confirmed" : "Dispatched"}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Spent</span>
                  <span className="font-bold">৳3,240</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Orders Placed</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Favorite Farmer</span>
                  <span className="font-medium text-sm">Abdul Karim</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
