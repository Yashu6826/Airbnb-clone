import { Nunito } from 'next/font/google'
import ToasterProvider from './Providers/ToastProvider'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import ClientOnly from './components/ClientOnly'
import SearchModal from './components/modals/SearchModal'


export const metadata ={
  title:'Airbnb',
  description:'Airbnb Clone',
}
const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      {/* <link rel="preload" href="/fonts/font.woff2" as="font" crossOrigin="anonymous" /> */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
        </body>
    </html>
  )
}
