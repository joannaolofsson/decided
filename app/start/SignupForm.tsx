//'use client'
import { signup } from '@/app/login/actions';

export default function SignupForm({ onSignup }: { onSignup: (email: string, password: string) => void }) {
  //const [email, setEmail] = useState('')
 // const [password, setPassword] = useState('')

  return (
    <form className='flex flex-col w-1/3 gap-4 m-auto bg-slate-100'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required className='border'/>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required className='border'/>
        <button className="bg-slate-400" formAction={signup}>Sign up</button>
      </form>
  )
}
