import React from "react";
import {
  Users,
  Upload,
  Link as LinkIcon,
  Construction,
  Clock,
  Sparkles,
  FileText,
  Globe,
  ArrowRight,
  Star,
  Heart,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";

export const CommunityPage: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: "Paper Submission",
      description: "Share your academic papers and research with the community",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: LinkIcon,
      title: "Resource Sharing",
      description: "Contribute valuable academic links and study materials",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Users,
      title: "Community Groups",
      description: "Connect with fellow students and researchers",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Star,
      title: "Quality Rating",
      description: "Rate and review shared resources for community benefit",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const upcomingFeatures = [
    "Advanced search and filtering",
    "Discussion forums for each subject",
    "Peer review system",
    "Mobile app integration",
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <section className="bg-white py-20 px-6 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 bg-orange-50 border border-orange-200 rounded-full px-6 py-3 mb-8 ">
            <Construction className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">
              Under Development
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 dark:text-white">
            🚧 Coming Soon! 🚧
          </h1>

          <h2 className="text-2xl font-semibold text-gray-700 mb-6 dark:text-white/90">
            We&apos;re building something amazing for our academic community
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto dark:text-white/80">
            Get ready for a revolutionary platform where students, researchers,
            and educators can collaborate, share resources, and build knowledge
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              disabled
              variant={"outline"}
              className="bg-gray-300 text-gray-500 px-8 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Notify Me</span>
            </Button>
            <Button
              disabled
              variant={"default"}
              className="dark:text-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                What&apos;s Coming
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
              Exciting Features in Development
            </h2>
            <p className="text-gray-600 dark:text-white/80">
              Here&apos;s what you can expect from our community platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700 opacity-75"
                >
                  <div
                    className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed dark:text-white/80">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Preview Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Community Contribution Forms
            </h2>
            <p className="text-gray-600 dark:text-white/80">
              Preview of the submission interface (currently disabled)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Paper Submission Form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 opacity-60">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Paper Submission
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Title
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter your paper title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper URL
                  </label>
                  <input
                    type="url"
                    disabled
                    placeholder="https://example.com/paper.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Category
                  </label>
                  <select
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  >
                    <option>Select category...</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Computer Science</option>
                  </select>
                </div>

                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Paper</span>
                </button>
              </div>
            </div>

            {/* Community Links Form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 opacity-60">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Community Links
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource Name
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="Enter resource name..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource URL
                  </label>
                  <input
                    type="url"
                    disabled
                    placeholder="https://example.com/resource"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  >
                    <option>Select category...</option>
                    <option>Study Materials</option>
                    <option>Online Courses</option>
                    <option>Research Tools</option>
                    <option>Academic Journals</option>
                  </select>
                </div>

                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Add Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
              Development Progress
            </h2>
            <p className="text-gray-600 dark:text-white/80">
              We&apos;re working hard to bring you these amazing features
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>Upcoming Features</span>
                </h3>
                <div className="space-y-3">
                  {upcomingFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span>Why We&apos;re Building This</span>
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-white/90">
                  <p>
                    To create a collaborative space where knowledge flows freely
                    between students and educators.
                  </p>
                  <p>
                    To make academic resources more accessible and discoverable
                    for everyone.
                  </p>
                  <p>
                    To build a supportive community that helps each other
                    succeed academically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 dark:from-gray-800 dark:to-zinc-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
              We&apos;re working hard to bring you a space where students and
              researchers can share valuable academic resources.
            </h2>
            <p className="text-lg text-gray-600 mb-6 dark:text-white/80">
              Check back soon for updates on our progress!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                disabled
                variant={"outline"}
                className="px-8 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Get Notified</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
