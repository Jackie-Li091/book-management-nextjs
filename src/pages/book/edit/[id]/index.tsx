import { Inter } from 'next/font/google'
import BookForm from '@/components/BookForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <BookForm title="Edit Book"/>
}
