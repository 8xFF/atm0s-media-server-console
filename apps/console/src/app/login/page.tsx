'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@packages/ui/components/index'
import { setCookie } from '@packages/ui/lib/cookies'
import { ChangeTheme } from '@packages/ui/providers/index'
import { Logo } from '@/components'
import { useLoginMutation } from '@/hooks'

type Inputs = {
  secret: string
}

export default function LoginScreen() {
  const { mutate: onLogin } = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = ({ secret }) => {
    onLogin(
      {
        secret,
      },
      {
        onSuccess: async (res) => {
          if (!res.status) {
            return toast.error('Invalid secret key')
          }
          setCookie('token', res.data?.token)
          window.location.href = '/'
        },
      }
    )
  }

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs md:max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              <Logo />
            </CardTitle>
            <CardDescription>Enter your secret key to join</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="secret">Secret key</Label>
              <Input id="secret" type="secret" placeholder="Enter your secret" {...register('secret', { required: true })} />
              {errors.secret && <span className="text-xs text-red-500">This field is required</span>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="absolute bottom-4 left-4">
        <ChangeTheme />
      </div>
    </div>
  )
}
