import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { login, signup } from './actions'

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <div className="flex space-x-2">
        <Button type="submit" formAction={login}>
          Log in
        </Button>
        <Button type="submit" formAction={signup} variant="secondary">
          Sign up
        </Button>
      </div>
    </form>
  )
}
