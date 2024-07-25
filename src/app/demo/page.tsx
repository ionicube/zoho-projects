import Sticky from '@/components/sticky'
import { Metadata } from 'next'

// either Static metadata
export const metadata: Metadata = {
  title: 'demo',
}
export default async function Demo () {
  return (
    <Sticky></Sticky>
  )
}
