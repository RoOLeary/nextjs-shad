import AccordionComponent from '@/components/AccordionComponent'
import ArticleCarousel from '@/components/ArticleCarousel'
import CardComponent from '@/components/CardComponent'
import ExpandingCarousel from '@/components/ExpandingCarousel'

interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string,
  className: string
}

interface Item {
  title: string,
  isActive: boolean,
  backgroundImage: string,
  description: string
}

async function getItems(): Promise<Item[]> {
  const result = await fetch('http://localhost:4001/items')
  return result.json()
}


async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 2500))

  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes()
  const items = await getItems()

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-sm:px-4">
        {recipes.map(recipe => (
          <CardComponent key={recipe.id} {...recipe} />
        ))}
      </div>
      <div>
        <ArticleCarousel />
      </div>
      <div>
        <AccordionComponent />
      </div>
      <div className='my-10'>
        <ExpandingCarousel items={items} />
      </div>
    </main>
  )
}
