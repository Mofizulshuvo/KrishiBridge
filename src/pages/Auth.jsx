import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, UserCircle, ShoppingBasket, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = (e) => {
    e.preventDefault();

    toast({
      title: isLogin ? "Login Successful!" : "Account Created!",
      description: `Welcome to KrishiBridge ${selectedRole} portal`,
    });

    if (selectedRole === "farmer") navigate("/farmer");
    else if (selectedRole === "buyer") navigate("/buyer");
    else navigate("/admin");
  };

  const roles = [
    { id: "farmer", title: "Farmer", subtitle: "কৃষক", icon: UserCircle, description: "Sell your produce directly" },
    { id: "buyer", title: "Buyer", subtitle: "ক্রেতা", icon: ShoppingBasket, description: "Buy fresh local produce" },
    { id: "admin", title: "Admin", subtitle: "প্রশাসক", icon: Shield, description: "Platform management" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">KrishiBridge</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Choose your role and continue</p>
        </div>

        {/* Role Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? "border-2 border-primary shadow-[var(--shadow-hover)] scale-105"
                    : "hover:bg-primary/5 hover:shadow-[var(--shadow-card)]"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className={`h-8 w-8 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <CardTitle>{role.title}</CardTitle>
                  <CardDescription>{role.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Auth Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>
              {isLogin ? "Login" : "Create Account"} as{" "}
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to continue"
                : "Fill in your details to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name / পূর্ণ নাম</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email / Phone / ইমেইল / ফোন</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="name@example.com or 01XXXXXXXXX"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password / পাসওয়ার্ড</Label>
                <Input id="password" type="password" placeholder="Enter password" required />
              </div>

              {!isLogin && selectedRole === "farmer" && (
                <div className="space-y-2">
                  <Label htmlFor="nid">NID Number / জাতীয় পরিচয়পত্র নম্বর</Label>
                  <Input id="nid" placeholder="Enter your NID" />
                </div>
              )}

              <Button type="submit" className="w-full" variant="hero">
                {isLogin ? "Login / লগইন" : "Create Account / অ্যাকাউন্ট তৈরি করুন"}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Login"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          By continuing, you agree to KrishiBridge's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
