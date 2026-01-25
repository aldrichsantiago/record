type Repo = {
  name: string
  stargazers_count: number
}

export default async function Page() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store', // SSR equivalent of getServerSideProps
  })

  if (!res.ok) {
    throw new Error('Failed to fetch repo')
  }

  const data: Repo = await res.json()

  return (
    <main>
      <p>Hello {data.stargazers_count}</p>
    </main>
  )
}
