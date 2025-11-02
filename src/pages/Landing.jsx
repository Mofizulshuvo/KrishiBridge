import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ShoppingBasket, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";
import produceImage from "@/assets/fresh-produce.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KrishiBridge</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Login / সাইন ইন</Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Agricultural fields at sunrise" 
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        </div>
        
        <div className="container relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">
              <Leaf className="h-4 w-4 text-primary" />
              <span>From Kumira Fields to GEC Markets • কুমিরা থেকে জিইসি</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Connecting Farmers & Buyers
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Digitally, Locally, Directly
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              KrishiBridge brings fresh produce from Kumira's farms directly to GEC's buyers. 
              No middlemen. Fair prices. Verified freshness. Built for our community.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" variant="hero" className="w-full sm:w-auto">
                  Start Selling <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse Fresh Produce
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 border-t pt-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Active Farmers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Daily Orders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How KrishiBridge Works</h2>
            <p className="text-muted-foreground text-lg">
              Three simple portals connecting our agricultural community
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Farmer Portal */}
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Farmer Portal</CardTitle>
                <CardDescription>কৃষক পোর্টাল</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Upload products with photos and prices</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Receive instant order notifications</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Manage inventory & track earnings</p>
                </div>
                <Link to="/auth">
                  <Button variant="outline" className="w-full mt-4">Join as Farmer</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Buyer Portal */}
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <ShoppingBasket className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Buyer Portal</CardTitle>
                <CardDescription>ক্রেতা পোর্টাল</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Browse verified fresh produce</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Order with delivery tracking</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Rate farmers & build trust</p>
                </div>
                <Link to="/auth">
                  <Button variant="outline" className="w-full mt-4">Join as Buyer</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Dashboard */}
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Platform Management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Verify and approve users</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Monitor platform activity</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Analytics & dispute resolution</p>
                </div>
                <Link to="/auth">
                  <Button variant="outline" className="w-full mt-4">Admin Access</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <img src={produceImage} alt="Fresh local produce" className="rounded-lg shadow-lg" />
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Built for IIUC Hackathon 2025</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Trust & Transparency at Every Step</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              KrishiBridge ensures fair prices, verified freshness, and secure transactions 
              for Kumira's agricultural community.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Verified Farmers</h3>
                  <p className="text-sm text-muted-foreground">All farmers verified through NID</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Freshness Guarantee</h3>
                  <p className="text-sm text-muted-foreground">Harvest timestamps & quality ratings for every product</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">Integrated bKash/Nagad for safe transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Join KrishiBridge?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Whether you're a farmer looking to sell or a buyer seeking fresh produce, 
              start your journey today.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="hero">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">KrishiBridge</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting Kumira's farmers with GEC's buyers through digital innovation.
              Built with ❤️ at IIUC Hackathon 2025.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-primary">For Farmers</Link></li>
              <li><Link to="/auth" className="hover:text-primary">For Buyers</Link></li>
              <li><Link to="/auth" className="hover:text-primary">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 KrishiBridge. Built for IIUC Innovation Challenge.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
