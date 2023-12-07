'use client'
import { useSearchParams } from 'next/navigation'

async function Welcome() {
  const searchParams = useSearchParams() 
  const welcome = searchParams.get('msg')

  if (!welcome) {
    return null
  }

  return (
    <p dangerouslySetInnerHTML={{ __html: welcome}}></p>
  );
}

export default Welcome;
