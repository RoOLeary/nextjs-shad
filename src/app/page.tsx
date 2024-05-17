import AccordionComponent from '@/components/AccordionComponent'
import ArticleCarousel from '@/components/ArticleCarousel'
import CardComponent from '@/components/CardComponent'
import DefaultCarousel from '@/components/DefaultCarousel/DefaultCarousel'
import ExpandingCarousel from '@/components/ExpandingCarousel'
import { EmblaOptionsType } from 'embla-carousel'

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
  const result = await fetch('http://localhost:4000/items')
  return result.json()
}


async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  // delay response
  // await new Promise((resolve) => setTimeout(resolve, 2500))

  return result.json()
}

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto', loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

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
      <div className='my-20'>
        <DefaultCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div>
        <ArticleCarousel />
      </div> 
      <div className='my-20 p-8'>
        <AccordionComponent />
      </div>
      <div className='my-10'>
        <ExpandingCarousel items={items} />
      </div>
    </main>
  )
}
