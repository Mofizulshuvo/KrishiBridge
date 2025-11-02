import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Plus, Package, DollarSign, Bell, LogOut, Upload, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { FreshnessScore } from "@/components/FreshnessScore";
import { calculateDistance } from "@/lib/freshness";
import { Badge } from "@/components/ui/badge";

const FarmerDashboard = () => {

 
    const name = localStorage.getItem("userName") || "Farmer";
    const role = localStorage.getItem("userRole") || "farmer";


  const [showAddProduct, setShowAddProduct] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = (e) => {
    e.preventDefault();
    toast({
      title: "Product Added! / পণ্য যোগ করা হয়েছে!",
      description: "Your product is now live on the marketplace",
    });
    setShowAddProduct(false);
  };

  const farmerBadges = ["freshness_champion", "punctual", "trusted"];

  const mockProducts = [
    { id: "Fresh Tomatoes / টমেটো", price: 45, unit: "kg", status: "active", quantity: 50, uploadTime: Date.now() - 3 * 60 * 60 * 1000 },
    { id: "Cucumbers / শসা", price: 35, unit: "kg", status: "active", quantity: 40, uploadTime: Date.now() - 6 * 60 * 60 * 1000 },
    { id: "Green Chili / কাঁচা মরিচ", price: 60, unit: "kg", status: "low_stock", quantity: 10, uploadTime: Date.now() - 1 * 60 * 60 * 1000 },
  ];

  const suggestedBuyers = [
    { id: "Shahed Restaurant", name: "Shahed Restaurant", location: "GEC", preferredProducts: ["Tomatoes", "Cucumbers"], distance: calculateDistance("Kumira", "GEC") },
    { id: "Karim Hotel", name: "Karim Hotel", location: "Agrabad", preferredProducts: ["Green Chili", "Tomatoes"], distance: calculateDistance("Kumira", "Agrabad") },
  ];

  const mockOrders = [
    { id: "1", buyer: "Shahed Alam", product: "Tomatoes", quantity: 5, status: "pending", total: 225 },
    { id: "2", buyer: "Karim Hotel", product: "Cucumbers", quantity: 10, status: "delivered", total: 350 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KrishiBridge</span>
            <span className="text-sm text-muted-foreground">| Farmer Portal</span>
          </Link>
          <div className="flex items-center gap-4">
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
        {/* Welcome Section with Badges */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcomem,{name}</h1>
              <p className="text-muted-foreground">Manage your products and track your sales</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">Your Achievements</span>
              <BadgeDisplay badges={farmerBadges} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳1,450</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 products listed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting delivery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Freshness</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">96%</div>
              <p className="text-xs text-muted-foreground">🥦 Excellent quality</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">My Products / আমার পণ্য</h2>
              <Button onClick={() => setShowAddProduct(!showAddProduct)} variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {showAddProduct && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Upload your fresh produce to the marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name / পণ্যের নাম</Label>
                      <Input id="product-name" placeholder="e.g., Fresh Tomatoes" required />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (৳/kg)</Label>
                        <Input id="price" type="number" placeholder="45" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity Available</Label>
                        <Input id="quantity" type="number" placeholder="50" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category / বিভাগ</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables / সবজি</SelectItem>
                          <SelectItem value="fruits">Fruits / ফল</SelectItem>
                          <SelectItem value="dairy">Dairy / দুগ্ধজাত</SelectItem>
                          <SelectItem value="grains">Grains / শস্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Brief description of your product..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Product Photo</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" variant="hero" className="flex-1">Add Product</Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="space-y-4">
              {mockProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          ৳{product.price}/{product.unit} • {product.quantity} {product.unit} available
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                        }`}>
                          {product.status === "active" ? "Active" : "Low Stock"}
                        </span>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <FreshnessScore uploadTime={product.uploadTime} size="sm" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Orders Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Recent Orders / সাম্প্রতিক অর্ডার</h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{order.buyer}</h3>
                          <p className="text-sm text-muted-foreground">{order.product} • {order.quantity} kg</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">৳{order.total}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "delivered" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                          }`}>
                            {order.status === "delivered" ? "Delivered" : "Pending"}
                          </span>
                        </div>
                      </div>
                      {order.status === "pending" && <Button variant="outline" size="sm" className="w-full">Mark as Delivered</Button>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> 🤖 Smart Matchmaking</CardTitle>
                <CardDescription>AI-suggested buyers near you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedBuyers.map((buyer) => (
                  <div key={buyer.id} className="p-3 border rounded-lg bg-background">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{buyer.name}</h4>
                      <p className="text-xs text-muted-foreground">{buyer.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">📍 {buyer.distance} km</Badge>
                    <p className="text-xs text-muted-foreground mb-2">Interested in {buyer.preferredProducts.join(", ")}</p>
                    <Button size="sm" variant="secondary" className="w-full">Contact Buyer</Button>
                  </div>
                ))}
                <div className="text-xs text-center text-muted-foreground pt-2 border-t">
                  Powered by KrishiBridge Insight Engine™
                </div>
              </CardContent>
            </Card>

            {/* Impact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🌍 Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Local Sales</span><span className="font-bold">148 kg</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">CO₂ Saved</span><span className="font-bold text-primary">12.4 kg</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Distance Saved</span><span className="font-bold">245 km</span></div>
                <p className="text-xs text-muted-foreground pt-2 border-t">By selling locally, you're reducing transport emissions and supporting your community! 🌱</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
