import { Link } from 'react-router-dom';
import { Dumbbell, Zap, Users, BarChart3, Shield, Star, ArrowRight, Check } from 'lucide-react';

const features = [
  { icon: <Users className="h-6 w-6" />, title: 'Client Management', desc: 'Manage all your clients in one place with detailed profiles and progress tracking.' },
  { icon: <Dumbbell className="h-6 w-6" />, title: 'Workout Builder', desc: 'Create customized workout plans with our intuitive drag-and-drop builder.' },
  { icon: <BarChart3 className="h-6 w-6" />, title: 'Progress Analytics', desc: 'Track client progress with detailed charts and body measurement history.' },
  { icon: <Zap className="h-6 w-6" />, title: 'Nutrition Plans', desc: 'Design comprehensive meal plans with macro tracking and calorie goals.' },
  { icon: <Shield className="h-6 w-6" />, title: 'Secure Platform', desc: 'Enterprise-grade security with encrypted data and HIPAA compliance.' },
  { icon: <Star className="h-6 w-6" />, title: 'Scheduling', desc: 'Built-in calendar to manage sessions, availability, and reminders.' },
];

const pricing = [
  { name: 'Starter', price: '$29', period: '/mo', desc: 'For individual trainers', features: ['Up to 10 clients', 'Workout builder', 'Basic analytics', 'Email support'] },
  { name: 'Pro', price: '$79', period: '/mo', desc: 'For growing businesses', features: ['Up to 50 clients', 'Advanced analytics', 'Nutrition plans', 'Priority support', 'Custom branding'], popular: true },
  { name: 'Enterprise', price: '$199', period: '/mo', desc: 'For large teams', features: ['Unlimited clients', 'Multiple trainers', 'API access', 'Dedicated support', 'White-label'] },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <Dumbbell className="h-6 w-6 text-primary" />
            FitPro
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Log in</Link>
            <Link to="/register" className="gradient-primary rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(346_77%_55%/0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">The #1 platform for fitness professionals</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Train smarter.
            <br />
            <span className="bg-gradient-to-r from-primary to-[hsl(10,90%,58%)] bg-clip-text text-transparent">
              Grow faster.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            FitPro gives personal trainers and coaches everything they need to manage clients, build workout plans, and track progress — all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register" className="gradient-primary flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="rounded-lg border px-8 py-3 text-sm font-semibold transition-colors hover:bg-muted">
              Learn More
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card required · 14-day free trial</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to coach</h2>
            <p className="mt-3 text-muted-foreground">Powerful tools designed for modern fitness professionals.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 card-shadow transition-all card-shadow-hover hover:-translate-y-0.5">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">{f.icon}</div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t bg-muted/30 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
            <p className="mt-3 text-muted-foreground">Choose the plan that fits your business.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricing.map((plan, i) => (
              <div key={i} className={`relative rounded-lg border bg-card p-8 card-shadow ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary rounded-full px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                <p className="mt-6"><span className="text-4xl font-bold">{plan.price}</span><span className="text-muted-foreground">{plan.period}</span></p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold transition-opacity ${plan.popular ? 'gradient-primary text-primary-foreground hover:opacity-90' : 'border hover:bg-muted'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Dumbbell className="h-5 w-5 text-primary" /> FitPro
          </div>
          <p className="text-sm text-muted-foreground">© 2026 FitPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
