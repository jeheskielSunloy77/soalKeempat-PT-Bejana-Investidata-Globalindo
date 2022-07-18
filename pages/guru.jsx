import { useState } from "react"
import { supabase } from "../utils/supabase"
import Button from "../components/Button"
import Card from "../components/Card"
import Main from "../components/Main"
import { useForm } from "react-hook-form"
import Loader from "../components/Loader"

export default function guru({ students }) {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  async function gradeInput({ nilai_siswa, nama_siswa }) {
    const { error } = await supabase
      .from("siswa")
      .update({ nilai_siswa })
      .eq("nama_siswa", nama_siswa)
    if (error) throw error
    if (!error) {
      setLoading(true)
      location.reload()
    }
  }

  if (loading) return <Loader />
  else
    return (
      <Main>
        <Card>
          <StudentList />
          <GradeInput />
        </Card>
      </Main>
    )

  function StudentList() {
    return (
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4'>
        <thead className='text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              No
            </th>
            <th scope='col' className='py-3 px-6'>
              Nama Siswa
            </th>
            <th scope='col' className='py-3 px-6'>
              Nilai
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ nama_siswa, nilai_siswa }, index) => {
            return (
              <tr className='bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'>
                <td className='py-4 px-6'>{index + 1}</td>
                <td className='py-4 px-6'> {nama_siswa}</td>
                <td className='py-4 px-6'>{nilai_siswa || "Data Belum Ada"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  function GradeInput() {
    return (
      <form onSubmit={handleSubmit(gradeInput)}>
        <div className='mb-6'>
          <label
            for='nama'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Nama Siswa
          </label>
          <input
            {...register("nama_siswa")}
            type='text'
            id='nama'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label
            for='kelas'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Nilai Siswa
          </label>
          <input
            {...register("nilai_siswa")}
            type='text'
            id='kelas'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <Button text='Input Nilai' type='submit' />
      </form>
    )
  }
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("siswa")
    .select("nama_siswa,nilai_siswa")
  if (error) throw error

  return { props: { students: data } }
}
