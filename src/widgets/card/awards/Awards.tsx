import { useEffect, useState } from "react"
import { fetchRestauranAwardstData } from "../../../shared/api/restaurant/restaurantAwardsService"
import { SVG } from "../../../shared/ui"
import "./Awards.scss"


export default function Awards({awardsId}: {awardsId: number}) {
  const [award, setAward] = useState<any>(null)

  useEffect(()=>{
    const loadAwards = async () => {
      try {
        const data = await fetchRestauranAwardstData({id: awardsId})

        setAward(data);
        
      } catch (error) {
        console.log(error)
      }
    }
    loadAwards()
  },[awardsId])
  if(!award) return null

  console.log('Award:', award)

  return (
    <div className="awards--card">
      <div className="img">
        <img src={award.img} alt={award.name} />
      </div>
      <div className="info">
        <p>{award.name}</p>

        <div className="icon reverse">
          <SVG.ArrowIcon size="18"/>
        </div>
      </div>
    </div>
  )
}
