import {
  BookOpen,
  Users,
  Target,
  Award,
  ArrowRight,
  Mail,
  MapPin,
  Zap,
  Shield,
  Globe,
  Heart,
  Star,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export const AboutPage = () => {
  const stats = [
    {
      number: "10K+",
      label: "Active Students",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      number: "50+",
      label: "Question Papers",
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
    },
    {
      number: "10+",
      label: "Academic Branches",
      icon: Target,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/30",
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: Award,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-900/30",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant access to papers with optimized search and filtering.",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security.",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/30",
    },
    {
      icon: Globe,
      title: "Always Available",
      description: "24/7 access from anywhere with 99.9% uptime.",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/30",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every feature is designed with student success in mind.",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/30",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Committed to maintaining the highest standards in education.",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously evolving with technology and user feedback.",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/30",
    },
  ];

  const achievements = [
    "Industry-leading paper accuracy",
    "Multi-format support",
    "Advanced search algorithms",
    "Mobile-responsive design",
    "Real-time updates",
    "Community-driven content",
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <header className="bg-white dark:bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-4 py-2 mb-8">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Transforming Education Since 2025
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Our Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
            We&apos;re dedicated to making academic resources accessible to every student through
            innovative technology and comprehensive content that supports learning excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <span>Explore Features</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900" aria-labelledby="stats-heading">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="stats-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600 dark:text-white/80">
              Our platform speaks for itself through these numbers
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <li
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-white/80 font-medium">
                    {stat.label}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900" aria-labelledby="mission-heading">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <article>
              <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full px-4 py-2 mb-6">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Our Mission
                </span>
              </div>
              <h2 id="mission-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering Students Through Technology
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/80 leading-relaxed mb-8">
                We&apos;re on a mission to democratize access to quality educational resources,
                making academic excellence achievable for every student, everywhere.
              </p>
              <ul className="space-y-3" role="list">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-white/80">{achievement}</span>
                  </li>
                ))}
              </ul>
            </article>
            <aside className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Us?
              </h3>
              <ul className="space-y-6" role="list">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <li key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-10 h-10 ${feature.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 dark:text-white/80 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900" aria-labelledby="values-heading">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="values-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-white/80 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for our users
            </p>
          </header>
          <ul className="grid md:grid-cols-3 gap-8" role="list">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <li
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${value.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900" aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="contact-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-white/80">
              Ready to transform your academic journey? We&apos;d love to hear from you
            </p>
          </header>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <address className="not-italic text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Us</div>
                <div className="text-gray-900 dark:text-white font-semibold">
                  gtusolutions38@gmail.com
                </div>
              </address>
              <address className="not-italic text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Live In</div>
                <div className="text-gray-900 dark:text-white font-semibold">Ahmedabad</div>
              </address>
            </div>
            <div className="text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};