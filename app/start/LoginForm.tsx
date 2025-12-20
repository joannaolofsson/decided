
import { login } from '@/app/login/actions';

export default function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {

  return (
     <form className='flex flex-col w-1/3 gap-4 m-auto bg-slate-100' action={login}>
      <div className='flex flex-col'>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required className='border-1'/>
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required className='border'/>
      </div>
      <button className="bg-slate-400" formAction={login}>Log in</button>
    </form>
  )
}




