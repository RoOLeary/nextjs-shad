import { Link } from 'next-view-transitions';

export default async function About() {

    return (
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-sm:px-4">
          <h1>Second</h1>
          <Link href={`/`}>Go Back</Link>
          <Link href={`https://pornhub.com`}>Tug</Link>
        </div>
      </main>
    )
  }
  