import AccordionComponent from '@/components/AccordionComponent'
import ArticleCarousel from '@/components/ArticleCarousel'
import CardComponent from '@/components/CardComponent'

interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  vegan: boolean,
  id: string,
  className: string
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 2500))

  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes()

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
    </main>
  )
}
