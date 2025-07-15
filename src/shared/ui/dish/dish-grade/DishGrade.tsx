import { SVG } from "../..";

export default function DishGrade({ rating }: { rating: string | number}) {
  return (
    <div className="dish-grade">
      <SVG.StarIcon fill='#E3A400' />
      <p className="b-page--ml2">{rating}</p>
    </div>
  )
}
