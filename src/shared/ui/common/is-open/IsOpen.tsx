import "./IsOpen.scss"

interface WorkingTime {
  open_time: string;
  close_time: string;
}

export default function IsOpen({ time }: { time: WorkingTime }) {
  const isOpenNow = (openTime: string, closeTime: string): boolean => {
    const now = new Date();
    const [openHours, openMinutes] = openTime.split(':').map(Number);
    const [closeHours, closeMinutes] = closeTime.split(':').map(Number);
    
    const opening = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHours, openMinutes);
    const closing = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHours, closeMinutes);
    
    // Если время закрытия меньше времени открытия, значит ресторан работает после полуночи
    if (closing < opening) {
      closing.setDate(closing.getDate() + 1);
    }
    
    return now >= opening && now < closing;
  }

  const open = isOpenNow(time.open_time, time.close_time);

  return (
    <div className={`is_open`}>
      <div className={`circle ${!open ? "closed": ""}`}></div>
      <span>
        {open 
          ? `Открыто до ${time.close_time}`
          : `Откроется в ${time.open_time}`
        }
      </span>
    </div>
  )
}