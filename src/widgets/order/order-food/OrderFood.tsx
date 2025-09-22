/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import "./order-food.scss";
import { observer } from "mobx-react-lite";
import { LinkAction } from "../../../shared/ui";
import { ActiveButton } from "../../../shared/ui/button";
import CancelOrder from "../../cancel-order/CancelOrder";
import MapRestaurnatInfo from "../../map/map-restaurant-info/MapRestaurnatInfo";
import { Restaurant } from "../../../shared/types/types";

const OrderFood = observer(
  ({
    isOrderSubmitted,
    activeTab,
    setActiveTab,
    restaurant,
  }: {
    isOrderSubmitted: boolean;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    restaurant: Restaurant | null;
  }) => {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [comment, setComment] = useState<string>("");
    const navigate = useNavigate();

    console.log(restaurant, "restaurant data");

    useEffect(() => {
      const loadBookingData = () => {
        const storedBookingData = localStorage.getItem("bookingData");
        if (storedBookingData) {
          const bookingData = JSON.parse(storedBookingData);
          setComment(bookingData[0].comment || "");
        }
      };

      loadBookingData();
      window.addEventListener("storage", loadBookingData);

      return () => {
        window.removeEventListener("storage", loadBookingData);
      };
    }, []);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newComment = e.target.value;
      setComment(newComment);

      const storedBookingData = localStorage.getItem("bookingData");
      if (storedBookingData) {
        const bookingData = JSON.parse(storedBookingData);
        bookingData.comment = newComment;
        localStorage.setItem("bookingData", JSON.stringify(bookingData));
      }
    };

    const handleCancelConfirm = () => {
      navigate("/");
    };

    const handleBookAgain = () => {
      window.scrollTo(0, 0);
      setActiveTab("current");
      navigate("/baskets");
    };

    const handleShareLink = () => {
      if (restaurant?.id) {
        const restaurantUrl = `${window.location.origin}/restaurants/${restaurant.id}`;

        // Просто копируем ссылку в буфер обмена
        navigator.clipboard
          .writeText(restaurantUrl)
          .then(() => {
            alert("Ссылка на ресторан скопирована в буфер обмена!");
          })
          .catch(() => {
            // Fallback для старых браузеров
            const textArea = document.createElement("textarea");
            textArea.value = restaurantUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("Ссылка на ресторан скопирована в буфер обмена!");
          });
      }
    };

    return (
      <section>
        <div className="">
          <div className="b-page-box b-page-box--big">
            <div className="b-page-box__title">
              <b>Пожелания</b>
            </div>
            <div className="b-page-box-line"></div>
            <textarea
              className="b-page-box__subtittle b-page-box__subtittle--opacity70"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Введите ваши пожелания"
              rows={3}
              disabled={isOrderSubmitted}
              style={{
                width: "100%",
                border: "none",
                resize: "none",
                background: "transparent",
              }}
            />
          </div>

          <div className="mt-32">
            <MapRestaurnatInfo restaurant={restaurant} />
          </div>

          <div className="links--action b-page--mt48">
            {activeTab !== "cancelled" && (
              <ActiveButton
                text="Отмена"
                style={{
                  color: "#fff",
                  background: "rgb(7, 31, 43)",
                  border: "none",
                  width: "100%",
                }}
                onClick={() => {
                  setIsCancelModalOpen(!isCancelModalOpen);
                }}
              />
            )}

            {activeTab === "cancelled" && (
              <ActiveButton
                text="Забронировать снова"
                style={{
                  color: "#fff",
                  background: "#db3702",
                  border: "none",
                  width: "100%",
                }}
                onClick={handleBookAgain}
              />
            )}

            <LinkAction
              text="Позвонить в ресторан"
              to="tel:+9876373737"
              style={{
                color: "#6C452B",
                background: "#fff",
                border: "1px solid #6C452B",
              }}
            />

            <ActiveButton
              text="Поделиться ссылкой"
              style={{
                color: "#6C452B",
                background: "#fff",
                border: "1px solid #6C452B",
                width: "100%",
              }}
              onClick={handleShareLink}
            />
          </div>

          <CancelOrder
            isOpen={isCancelModalOpen}
            onClose={() => setIsCancelModalOpen(false)}
            onConfirm={handleCancelConfirm}
          />
        </div>
      </section>
    );
  }
);

export default OrderFood;
