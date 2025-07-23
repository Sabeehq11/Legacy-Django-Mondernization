import React from 'react';

const TracModernUI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">TRAC</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">Dashboard</a>
              <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">Browse Code</a>
              <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">Tickets</a>
              <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">Milestones</a>
              <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">Timeline</a>
            </nav>

            {/* CTA Button */}
            <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all shadow-lg shadow-orange-500/25">
              NEW TICKET
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-orange-500">Project visibility.</span>
                <br />
                <span className="text-gray-900">Simplified.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Browse your repository, track issues, and ship faster — all from one clean dashboard.
              </p>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all inline-flex items-center gap-2">
                Start Tracking Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
                    <div className="text-4xl font-bold">721+</div>
                    <div className="text-sm opacity-90">Total Commits</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
                    <div className="text-4xl font-bold">1000+</div>
                    <div className="text-sm opacity-90">Lines Changed</div>
                  </div>
                </div>
                <div className="mt-8 flex justify-center">
                  <div className="w-48 h-48 relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-white/40 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="absolute inset-8 bg-white/50 rounded-full animate-pulse animation-delay-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🗂️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Repository</h3>
              <p className="text-gray-600 leading-relaxed">
                View your source files, diffs, and commit history with our clean code browser interface.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Manage Tickets</h3>
              <p className="text-gray-600 leading-relaxed">
                Create, assign, and close issues in one place with our intuitive ticket system.
              </p>
            </div>

            {/* Card 3 - Orange */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-white">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">View Timeline</h3>
              <p className="leading-relaxed opacity-90">
                Follow changes and milestones with ease using our visual timeline dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your project at a glance
            </h2>
            <p className="text-xl text-gray-600">
              Real-time metrics to keep your team aligned
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">128</div>
              <div className="text-lg font-medium text-gray-900">Tickets</div>
              <div className="text-gray-600">Open issues to triage</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">37</div>
              <div className="text-lg font-medium text-gray-900">Commits</div>
              <div className="text-gray-600">Last 7 days</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">5</div>
              <div className="text-lg font-medium text-gray-900">Milestones</div>
              <div className="text-gray-600">Ongoing releases</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-48 -translate-x-48"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to modernize your project tracking?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of teams who've simplified their development workflow with our modern interface.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all">
                  Get Started Free
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Trac Modern UI. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TracModernUI; 