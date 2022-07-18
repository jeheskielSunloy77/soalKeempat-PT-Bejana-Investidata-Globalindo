import React, { useContext } from "react"
import Button from "../components/Button"
import ButtonGuru from "../components/ButtonGuru"
import ButtonSiswa from "../components/ButtonSiswa"
import Card from "../components/Card"
import Main from "../components/Main"
import { AppContext } from "../utils/AppContext"

// silahkan baca file readme untuk informasi configurasi database, dan kunjugi link pada halaman github unutk melihat demo website

export default function Home() {
  const { setPage } = useContext(AppContext)

  return (
    <Main>
      <Card>
        <h1 className='text-center text-4xl font-medium uppercase'>
          Selamat datang di website soal-Ketiga
        </h1>
        <h1 className='text-center text-xl mt-2'>
          Pilih salah satu pilihan dibawah ...
        </h1>
        <div className='flex items-center justify-center mt-5 w-full'>
          <Button text='Admin' href='/admin' />
          <ButtonSiswa text='Siswa' href='/siswa' />
          <ButtonGuru text='Guru' href='/guru' />
        </div>
      </Card>
    </Main>
  )
}
