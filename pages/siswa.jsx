import { useState } from "react"
import Card from "../components/Card"
import Main from "../components/Main"
import { supabase } from "../utils/supabase"
import { useForm } from "react-hook-form"

export default function siswa() {
  const { register, handleSubmit } = useForm()
  const [student, setStudent] = useState(null)

  async function findStudent({ searchInput }) {
    const { data, error } = await supabase
      .from("siswa")
      .select("*")
      .eq("nama_siswa", searchInput)
    if (error) alert(error.message)
    if (!error) {
      setStudent(data[0])
    }
  }
  return (
    <Main>
      <Card>
        <form
          onSubmit={handleSubmit(findStudent)}
          className='flex items-center'
        >
          <div className='relative w-full'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                ariaHidden='true'
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              {...register("searchInput")}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Nama Kamu Siapa Sih?'
            />
          </div>
          <SubmitButton />
        </form>

        {student && (
          <h1 className='text-center text-lg font-medium mt-4'>
            Hallo
            <span className='text-blue-500 font-bold mx-1'>
              {student.nama_siswa}
            </span>
            dari kelas
            <span className='text-blue-500 font-bold mx-1'>
              {student.kelas_siswa}
            </span>
            , nilai kamu semester ini adalah
            <span className='text-blue-500 font-bold mx-1'>
              {student.nilai_siswa}.
            </span>
          </h1>
        )}
        {student === undefined && (
          <h1 className='text-center text-lg font-medium mt-4 text-red-500'>
            Silahkan Coba Lagi
          </h1>
        )}
      </Card>
    </Main>
  )
  function SubmitButton() {
    return (
      <button
        type='submit'
        className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </button>
    )
  }
}
