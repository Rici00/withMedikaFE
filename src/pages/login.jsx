import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter();
    // ✅ formData
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState('')
        // ✅ Get user logged data ??
    let user = {}
    if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem("user"))
    }

    const Login = async(e) => {
            e.preventDefault()
                // ✅ Request with post method to login api
            const res = await axios.post("https://tiny-blue-hedgehog-hem.cyclic.app/login", { email, password: pass })
                .catch((err) => {
                    if (err.response.status == 404 && err.response.data.message == "User is not found") {
                        return setMessage(err.response.data.message)
                    } else if (err.response.status == 400) {
                        return setMessage(err.response.data.message)
                    }
                });
            // ✅ Success ??
            const data = await res ?.data;
            if (data ?.status == true) {
                setMessage(data.message)
                console.log(data)
                    // ✅ Save user info to localStorage
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            // ✅ Remove message after 5 seconds
            setTimeout(() => { setMessage('') }, 5000)
        }
        // ✅ User is logged in ??
    useEffect(() => {
        if (user) {
            router.push('/indexlogin')
        }
    }, [user])

    return (
      <>
        <Head>
          <title>Masuk sebagai tenaga kesehatan</title>
        </Head>
        <AuthLayout
          title="Masuk ke Akun Khusus"
          // subtitle={
          //   <>
          //     Buat akun posyandu/pihak kesehatan?{' '}
          //     <Link href="/register" className="text-cyan-600">
          //       Daftar
          //     </Link>{' '}
          //   </>
          // }
        >
        { message && (
          <h3 className="text-red-500 font-semibold py-2 text-center">{message}</h3>
        )}
          <form onSubmit={ Login }>
            <div className="space-y-6">
              <TextField
                onChange={ (e) => setEmail( e.target.value )}
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <TextField
                onChange={ (e) => setPass( e.target.value )}
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" color="cyan" className="mt-8 w-full">
              Masuk
            </Button>
          </form>
        </AuthLayout>
      </>
    )
  }