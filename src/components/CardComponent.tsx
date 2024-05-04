
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Key, ReactElement, JSXElementConstructor, ReactNode, PromiseLikeOfReactNode, ReactPortal } from 'react';

export default function CardComponent( recipe: { id: Key | null | undefined; image: any; title: string | number | boolean | any[] | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined; time: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; vegan: any}){

  
  return(
    <Card key={recipe.id} className={`flex flex-col justify-between`}>
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={`/img/${recipe.image}`} alt="@shadcn" />
          <AvatarFallback>
            {/* @ts-ignore */}
            {recipe.title.slice(0,2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>{recipe.time} mins to cook.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{recipe.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>View Recipe</Button>
        {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
      </CardFooter>
    </Card>
  ); 
}' '