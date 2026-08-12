function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-blue-600">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Create your TaskFlow account
        </p>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;