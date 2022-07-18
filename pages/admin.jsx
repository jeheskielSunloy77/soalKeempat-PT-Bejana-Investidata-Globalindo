import { useState } from "react"
import { supabase } from "../utils/supabase"
import Button from "../components/Button"
import Card from "../components/Card"
import Main from "../components/Main"
import { useForm } from "react-hook-form"
import Loader from "../components/Loader"

export default function admin({ students }) {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  async function inputStudent(data) {
    const { error } = await supabase.from("siswa").insert([data])
    if (error) throw error
    if (!error) {
      setLoading(true)
      location.reload()
    }
  }
  async function deleteStudent(id) {
    const { error } = await supabase.from("siswa").delete().eq("id", id)
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
          <InputStudent />
        </Card>
      </Main>
    )

  function StudentList() {
    return (
      <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4'>
        <thead class='text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' class='py-3 px-6'>
              No
            </th>
            <th scope='col' class='py-3 px-6'>
              Nama Siswa
            </th>
            <th scope='col' class='py-3 px-6'>
              Kelas
            </th>
            <th scope='col' class='py-3 px-6'>
              Pilihan
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ nama_siswa, kelas_siswa, id }, index) => {
            return (
              <tr class='bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'>
                <td class='py-4 px-6'>{index + 1}</td>
                <td class='py-4 px-6'> {nama_siswa}</td>
                <td class='py-4 px-6'>{kelas_siswa}</td>
                <td
                  class='py-4 px-6 text-red-500 font-medium cursor-pointer'
                  onClick={() => deleteStudent(id)}
                >
                  Hapus
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  function InputStudent() {
    return (
      <form onSubmit={handleSubmit(inputStudent)}>
        <div class='mb-6'>
          <label
            for='nama'
            class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Nama Siswa
          </label>
          <input
            {...register("nama_siswa")}
            type='text'
            id='nama'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div class='mb-6'>
          <label
            for='kelas'
            class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Kelas Siswa
          </label>
          <input
            {...register("kelas_siswa")}
            type='text'
            id='kelas'
            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <Button text='Tambah Siswa' type='submit' />
      </form>
    )
  }
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("siswa").select("*")
  if (error) throw error

  return { props: { students: data } }
}
