import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import BookForm from '@/components/BookForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <BookForm title="Add Book"/>
}
