import Image from "next/image"

export default function Loader() {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <Image src='/assets/loader.svg' width='150' height='150' />
    </div>
  )
}
