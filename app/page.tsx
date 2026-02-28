export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex flex-col">

      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-900">
          🚍 RURBAN Hitch
        </h1>

        <div className="space-x-4">
          <a href="/login" className="text-blue-900 font-semibold">
            Login
          </a>
          <a
            href="/signup"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-4xl font-bold text-blue-900 mb-6">
          Smart Bus Booking for Rural & Urban India
        </h2>

        <p className="text-gray-600 max-w-2xl mb-8">
          Book buses, track live routes, and travel smarter with
          RURBAN Hitch. Connecting villages and cities with
          modern digital ticketing.
        </p>

        <div className="space-x-6">
          <a
            href="/signup"
            className="bg-blue-900 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Login
          </a>
        </div>

        <img
          src="https://images.unsplash.com/photo-1580496814277-6f16bb7e3f2f"
          alt="Bus"
          className="mt-12 rounded-2xl shadow-2xl w-[700px]"
        />
      </section>

      {/* Footer */}
      <footer className="bg-white text-center p-4 text-gray-500 text-sm">
        © 2026 RURBAN Hitch | Smart Mobility Platform
      </footer>

    </div>
  );
}