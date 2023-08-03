import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TextField } from '@/components/Fields'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCode from '@/images/qr-code.svg'
import  Ricad  from '@/images/logo.png'

// function QrCodeBorder(props) {
//   return (
//     <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
//       <path
//         d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   )
// }

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              {/* <Ricad className="h-10 w-10 flex-none fill-cyan-500" /> */}
              {/* <img src="@/images/logo.png" alt="Logo" className="h-10 w-10 flex-none fill-cyan-500" /> */}
              <Image src={Ricad} alt="" className="h-10 w-10 flex-none fill-cyan-500" unoptimized />

              <div className="ml-4">
                <p className="text-base font-semibold">Gisca</p>
                <p className="mt-1 text-sm">Gadjah Mada Indonesia Stunting Calculator</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks />
            </nav>
          </div>

        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright Thoriq & Richard. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
