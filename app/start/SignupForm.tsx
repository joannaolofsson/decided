import { signup } from '@/app/login/actions';

export default function SignupForm() {
  return (
    <form
      action={signup}
      className="w-full max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
        />

        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#C084FC] text-white py-2 rounded-md hover:bg-[#a66bf3] transition"
      >
        Sign up
      </button>
    </form>
  );
}
