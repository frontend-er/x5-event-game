export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-black text-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="flex items-center justify-between w-full max-w-md">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-green-500">5</div>
          <h1 className="text-lg font-semibold">Пятёрочка</h1>
        </div>
        <button className="text-white text-2xl">☰</button>
      </header>

      {/* Registration Form */}
      <div className="mt-8 w-full max-w-md bg-black/50 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Логин <span className="text-green-400">Account</span>
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="ФИО"
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Вход
          </button>
        </form>
      </div>
    </div>
  );
}
