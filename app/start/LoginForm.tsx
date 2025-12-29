import { login } from '@/app/login/actions';

export default function LoginForm() {
  return (
    <form
      action={login}
      className="w-full max-w-sm mx-auto p-6 bg-white shadow rounded flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-gray-300 rounded p-2"
        />

        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-[#C084FC] text-white py-2 rounded hover:bg-[#a66bf3] transition"
      >
        Login
      </button>
    </form>
  );
}
