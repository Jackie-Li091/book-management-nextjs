import { Inter } from 'next/font/google'
import CategoryForm from '@/components/CategoryForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <CategoryForm />
}
