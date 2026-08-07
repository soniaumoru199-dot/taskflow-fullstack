import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          Organize Your Work.
          <span className="text-blue-600"> Stay Productive.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          TaskFlow helps you manage your daily tasks, track your progress,
          and stay focused—all in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Get Started
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;