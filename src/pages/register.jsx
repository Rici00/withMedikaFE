import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  // ✅ Formdata
  const [ firstN, setFirstN ] = useState('')
  const [ lastN, setLastN ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')
  const [ message, setMessage ] = useState()
  // ✅ Get user logged data ??
  let user = {}
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user"))  
  }

  const Register = async ( e ) => { 
    e.preventDefault()
    const about_us = e.target.children[0].children[4].children[1].value
    // ✅ Request with post method to register api
    const res = await axios.post("http://127.0.0.1:3001/register", { first_name:firstN, last_name:lastN, email, password:pass, about_us })
      .catch((err) => console.log(err)); // ✅ Handle error request
    // ✅ Success ??
    const data = await res?.data;
    if( data.success = true ) {
      setMessage(data.message)
    }
    // ✅ Remove message after 5 seconds
    setTimeout( () => { setMessage('') }, 5000)
  }
  // ✅ User is logged in ??
  useEffect( () => {
    if ( user ) {
      router.push('/')
    }
  }, [ user ])

  return (
    <>
      <Head>
        <title>Daftar</title>
      </Head>

      <AuthLayout
        title="Daftarkan akun khusus untuk membantu Anda"
        subtitle={
          <>
            Sudah punya akun?{' '}
            <Link href="/login" className="text-cyan-600">
              Masuk
            </Link>{' '}
            ke akun anda
          </>
        }
      >
      { message && (
        <h3 className="text-green-500 font-semibold py-2 text-center">{message}</h3>
      )}
        <form onSubmit={ Register }>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              onChange={ (e) => setFirstN(e.target.value) }
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
              />
            <TextField
              onChange={ (e) => setLastN(e.target.value) }
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
            />
            <TextField
              onChange={ (e) => setEmail(e.target.value) }
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              onChange={ (e) => setPass(e.target.value) }
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <SelectField
              className="col-span-full"
              label="How did you hear about us?"
              id="referral-source"
              name="referral_source"
            >
              <option value={`option1`}>Avista</option>
              <option value={`option2`}>ITTTTTTT</option>
            </SelectField>
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Daftar
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}
