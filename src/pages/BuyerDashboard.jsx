import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Leaf, ShoppingCart, Search, Star, MapPin, LogOut, Bell, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import produceImage from "../assets/fresh-produce.jpg";
import { FreshnessScore } from "../components/FreshnessScore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// Firestore imports
import { db } from "../Firebase/firebase.config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const BuyerDashboard = () => {
  const [cart, setCart] = useState([]);
  const [freshnessFilter, setFreshnessFilter] = useState("all");
  const [sortBy, setSortBy] = useState("freshness");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  const name = localStorage.getItem("userName") || "Buyer";

  // Fetch products from Firestore in real-time
  useEffect(() => {
    const productsRef = collection(db, "products"); // <- updated collection name
    const q = query(productsRef, orderBy("uploadTime", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prodData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unknown Product",
          nameBangla: data.nameBangla || "",
          farmer: data.farmer || "Unknown Farmer",
          location: data.location || "Unknown",
          distance: data.distance || 0,
          price: data.price || 0,
          rating: data.rating || 0,
          freshness: data.freshness || 0,
          verified: data.verified || false,
          uploadTime: data.uploadTime?.toDate ? data.uploadTime.toDate() : new Date(),
        };
      });
      console.log("Products fetched:", prodData);
      setProducts(prodData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (productId) => {
    setCart([...cart, productId]);
    toast({
      title: "Added to Cart!",
      description: "Product has been added to your cart",
    });
  };

  // Filter & sort logic
  const filteredProducts = products
    .filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameBangla.includes(searchQuery) ||
        product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
      if (!searchMatch) return false;

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

  // Mock orders for sidebar
  const mockOrders = [
    { id: "order1", items: "Tomatoes (10kg), Cucumbers (5kg)", status: "confirmed", delivery: "Today, 8", total: 500 },
    { id: "order2", items: "Green Chili (2kg)", status: "dispatched", delivery: "Tomorrow, 7", total: 140 },
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
          <h1 className="text-3xl font-bold mb-2">Welcome, {name}</h1>
          <p className="text-muted-foreground">Browse fresh produce from Kumira's local farmers</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for products... পণ্য অনুসন্ধান করুন"
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                      {product.verified && <Badge className="absolute top-2 right-2 bg-primary">✓ Verified Fresh</Badge>}
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
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
                    <Badge variant={order.status === "dispatched" ? "secondary" : "default"} className="text-xs">
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
