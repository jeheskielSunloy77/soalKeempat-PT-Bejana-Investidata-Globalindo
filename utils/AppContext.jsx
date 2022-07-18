import { useState, createContext } from "react"

export const AppContext = createContext([])

const dataAwalSiswa = [
  { nama_siswa: "Siska", kelas_siswa: "3 SMA", nilai_siswa: "A" },
  { nama_siswa: "Jessica", kelas_siswa: "2 SMA", nilai_siswa: "C" },
]
export function AppProvider({ children }) {
  const [dataSiswa, setDataSiswa] = useState(dataAwalSiswa)
  const [dataGuru, setDataGuru] = useState([])
  const [page, setPage] = useState("home")
  return (
    <AppContext.Provider
      value={{
        dataSiswa,
        setDataSiswa,
        dataGuru,
        setDataGuru,
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
