import { useEffect, useState } from 'react'
import { fetchRestaurantReviewsService } from '../../../shared/api/restaurant/restaurantReviewsService'
import { SVG } from '../../../shared/ui'
import './ReviewsCard.scss'
import ExpandableText from '../../../shared/ui/expandable-text/ExpandableText'
import { Review } from '../../../shared/types/types'

export default function Reviews({ reviewsId }: { reviewsId: number }) {
  const [review, setReview] = useState<Review | null>(null)

  useEffect(() => {
    const loadAwards = async () => {
      try {
        const data = await fetchRestaurantReviewsService({ id: String(reviewsId) });
        console.log('Fetched reviews:', data);
        setReview(data);
      } catch (error) {
        console.log(error)
      }
    }
    loadAwards()
  }, [reviewsId])

  if (!review) {
    return <div>Loading...</div>
  }

  const rating = Math.round(review.rating); // Предполагаем, что рейтинг находится в review.rating

  return (
    <div className="reviews">
      <div className="header">
        <div className="stars">
          {Array(5).fill(null).map((_, index) => (
            <SVG.StarIcon
              key={index}
              fill={index < rating ? '#E3A400' : '#CCCCCC'}
              size="22"
            />
          ))}
        </div>
        <div className="reverse">
          <SVG.ArrowIcon size='18'/>
        </div>
      </div>

      <div className="name">
        <div className="avatar">
          <img src={`/img/avatars/${review.author.avatar ? review.author.avatar: "n.png"}`} alt="" />
          <p className="name-text"><b>{review.author.name}</b></p>
        </div>
        <p className="date">{review.date}</p>
      </div>
      {/* <div className="comment">{review.comment}</div> */}
      <ExpandableText text={review.comment} maxLength={82}/>
      <div className="photos">
        {review.photos?.map((image, index) => (
          <div key={index} className="photo">
            <img src={`/img/restaurants/reviews/${image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}