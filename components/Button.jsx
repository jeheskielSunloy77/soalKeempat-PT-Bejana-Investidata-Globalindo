import Link from "next/link"
export default function Button({ text, href, onClick, type }) {
  return (
    <WithLink>
      <button
        type={type || "button"}
        onClick={onClick}
        className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
      >
        {text}
      </button>
    </WithLink>
  )
  function WithLink({ children }) {
    if (href) {
      return (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      )
    } else return children
  }
}
