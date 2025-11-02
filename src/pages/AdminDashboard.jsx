import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Users,
  ShoppingCart,
  TrendingUp,
  CheckCircle,
  X,
  LogOut,
  Bell,
  BarChart3,
  PieChart
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart as RPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const AdminDashboard = () => {
  // Mock data
  const pendingApprovals = [
    { id: "Karim Miah", role: "Farmer", location: "Kumira", nid: "1234567890" },
    { id: "Rahim Store", role: "Buyer", location: "GEC", contact: "01712345678" }
  ];

  const recentActivity = [
    { id: 1, action: "New farmer registration", user: "Fatima Begum", time: "5 mins ago" },
    { id: 2, action: "Order completed", details: "Abdul Karim → Shahed Alam", time: "12 mins ago" },
    { id: 3, action: "Product added", user: "Jasim Uddin", time: "1 hour ago" }
  ];

  const topFarmers = [
    { name: "Abdul Karim", sales: "৳15,400", rating: 9, orders: 120 },
    { name: "Rahima Begum", sales: "৳12,200", rating: 8, orders: 95 },
    { name: "Jasim Uddin", sales: "৳9,800", rating: 7, orders: 80 }
  ];

  const salesData = [
    { day: "Mon", sales: 5000 },
    { day: "Tue", sales: 7200 },
    { day: "Wed", sales: 6100 },
    { day: "Thu", sales: 8500 },
    { day: "Fri", sales: 4000 },
    { day: "Sat", sales: 9500 },
    { day: "Sun", sales: 7000 }
  ];

  const productCategoryData = [
    { name: "Vegetables", value: 40, color: "#3b82f6" },
    { name: "Fruits", value: 25, color: "#f97316" },
    { name: "Dairy", value: 20, color: "#14b8a6" },
    { name: "Grains", value: 15, color: "#a3a3a3" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KrishiBridge</span>
            <span className="text-sm text-muted-foreground">| Admin Dashboard</span>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">687</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+8</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">৳45,280 total value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.5%</div>
              <p className="text-xs text-muted-foreground">Order completion rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Weekly Sales Trend
                  </CardTitle>
                  <CardDescription>Total sales by day (৳)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Product Categories
                  </CardTitle>
                  <CardDescription>Sales distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RPieChart>
                      <Pie
                        data={productCategoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                      >
                        {productCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Review and approve new user registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingApprovals.map((user) => (
                  <div key={user.id} className="flex flex-col gap-2 border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{user.id}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{user.role}</Badge>
                        <span>• {user.location}</span>
                        {user.nid && <span>• NID: {user.nid}</span>}
                        {user.contact && <span>• {user.contact}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events and transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user || activity.details}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View All Orders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Broadcast
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
