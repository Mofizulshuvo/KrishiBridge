// src/pages/FarmerDashboard.jsx
import { useState, useEffect } from "react";
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
import { db } from "../Firebase/firebase.config";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";

const FarmerDashboard = () => {
  const name = localStorage.getItem("userName") || "Farmer";
  const uid = localStorage.getItem("userUid"); // make sure uid is stored on login/signup
  const role = localStorage.getItem("userRole") || "farmer";

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  const farmerBadges = ["freshness_champion", "punctual", "trusted"];

  const suggestedBuyers = [
    { id: "Shahed Restaurant", name: "Shahed Restaurant", location: "GEC", preferredProducts: ["Tomatoes", "Cucumbers"], distance: calculateDistance("Kumira", "GEC") },
    { id: "Karim Hotel", name: "Karim Hotel", location: "Agrabad", preferredProducts: ["Green Chili", "Tomatoes"], distance: calculateDistance("Kumira", "Agrabad") },
  ];

  const mockOrders = [
    { id: "1", buyer: "Shahed Alam", product: "Tomatoes", quantity: 5, status: "pending", total: 225 },
    { id: "2", buyer: "Karim Hotel", product: "Cucumbers", quantity: 10, status: "delivered", total: 350 },
  ];

  const mockStats = {
    salesToday: "৳1,450",
    activeProducts: 8,
    pendingOrders: 3,
    avgFreshness: "96%"
  };

  // Fetch existing products from Firestore
  const fetchProducts = async () => {
    try {
      if (!uid) return;
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("farmerId", "==", uid), orderBy("uploadTime", "desc"));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({ title: "Error", description: "Failed to fetch products" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      name: form.productName.value.trim(),
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      unit: "kg",
      category: form.category.value,
      description: form.description.value,
      uploadTime: serverTimestamp(),
      status: "active",
      farmerId: uid,
    };

    try {
      // Save product to Firestore
      const docRef = await addDoc(collection(db, "products"), newProduct);
      toast({ title: "Product Added!", description: "Your product is now live on the marketplace" });

      // Update local state immediately
      setProducts([{ id: docRef.id, ...newProduct, uploadTime: Date.now() }, ...products]);
      setShowAddProduct(false);
      form.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({ title: "Error", description: "Failed to add product" });
    }
  };

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
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <Link to="/auth">
              <Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Welcome & Badges */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {name}</h1>
            <p className="text-muted-foreground">Manage your products and track your sales</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Your Achievements</span>
            <BadgeDisplay badges={farmerBadges} />
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
              <div className="text-2xl font-bold">{mockStats.salesToday}</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeProducts}</div>
              <p className="text-xs text-muted-foreground">{products.length} products listed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Awaiting delivery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Freshness</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.avgFreshness}</div>
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
                <Plus className="h-4 w-4 mr-2" /> Add Product
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
                      <Label htmlFor="productName">Product Name</Label>
                      <Input id="productName" name="productName" placeholder="Fresh Tomatoes" required />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (৳/kg)</Label>
                        <Input id="price" name="price" type="number" placeholder="45" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity Available</Label>
                        <Input id="quantity" name="quantity" type="number" placeholder="50" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select name="category">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                          <SelectItem value="grains">Grains</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" placeholder="Brief description..." />
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
              {products.map(product => (
                <Card key={product.id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ৳{product.price}/{product.unit} • {product.quantity} {product.unit} available
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                          {product.status === "active" ? "Active" : "Low Stock"}
                        </span>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <FreshnessScore uploadTime={product.uploadTime?.seconds ? product.uploadTime.seconds * 1000 : product.uploadTime} size="sm" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Orders Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{order.buyer}</h3>
                          <p className="text-sm text-muted-foreground">{order.product} • {order.quantity} kg</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">৳{order.total}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${order.status === "delivered" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
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
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Smart Matchmaking</CardTitle>
                <CardDescription>AI-suggested buyers near you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedBuyers.map(buyer => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
