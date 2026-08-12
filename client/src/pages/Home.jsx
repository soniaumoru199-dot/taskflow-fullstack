import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Simple task management
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Organize your work.
          <span className="text-blue-600"> Get things done.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          TaskFlow helps you organize tasks, track your progress,
          and stay focused on the work that matters.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">📋</div>

          <h2 className="text-xl font-bold text-slate-900">
            Organize Tasks
          </h2>

          <p className="mt-2 text-slate-600">
            Keep all your tasks organized in one simple workspace.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">📈</div>

          <h2 className="text-xl font-bold text-slate-900">
            Track Progress
          </h2>

          <p className="mt-2 text-slate-600">
            See what you've completed and what still needs your attention.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">⚡</div>

          <h2 className="text-xl font-bold text-slate-900">
            Stay Productive
          </h2>

          <p className="mt-2 text-slate-600">
            Focus on important work without unnecessary complexity.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;