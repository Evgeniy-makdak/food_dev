import { useState, useEffect } from "react";
import { topNavItems } from "../../app/config/config";
import {
  PrevHeader,
  SliderHeader,
  StatusRestaurants,
  StatusOrder,
  CurrentBooking,
  OrderFood,
  BookingOrderComposition,
} from "../../widgets";
import { cartUtils } from "../../features/cartUtils";
import { Order } from "../../shared/types/types";
import { BookingData } from "../../entities/booking-data/BookingData";
import "./booking.scss";
import { LinkAction, SVG } from "../../shared/ui";
import { observer } from "mobx-react-lite";
import React from "react";

const Booking = observer(() => {
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentCancelledPage, setCurrentCancelledPage] = useState(0);
  const ordersPerPage = 3; // Количество заказов на странице
  const [currentCancelledIndex, setCurrentCancelledIndex] = useState(0);

  useEffect(() => {
    const checkOrderStatus = () => {
      const submitted = cartUtils.isOrderSubmitted();
      setIsOrderSubmitted(submitted);
    };

    checkOrderStatus();
    const interval = setInterval(checkOrderStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadOrders = () => {
      let ordersList: Order[] = [];

      switch (activeTab) {
        case "current": {
          const currentCart = cartUtils.getCart();
          const submittedOrders = cartUtils.getOrdersByStatus("submitted");

          if (currentCart.length > 0 && isOrderSubmitted) {
            ordersList.push({
              id: "current",
              items: currentCart,
              comment: cartUtils.getOrderComment(),
              booking: cartUtils.getBookingData(),
              status: "current",
              createdAt: new Date().toISOString(),
            });
          }

          ordersList = [...ordersList, ...submittedOrders];
          break;
        }
        case "cancelled": {
          ordersList = cartUtils.getOrdersByStatus("cancelled");
          break;
        }
        case "completed": {
          ordersList = cartUtils.getOrdersByStatus("completed");
          break;
        }
      }

      setOrders(ordersList);
    };

    loadOrders();
  }, [activeTab, isOrderSubmitted]);

  const shouldShowOrders = () => {
    if (activeTab === "current") {
      return isOrderSubmitted || orders.length > 0;
    }
    return orders.length > 0;
  };

  return (
    <BookingData>
      {(bookingsData, restaurant) => {
        // Проверяем, что bookingsData не null и является массивом
        const safeBookingsData = Array.isArray(bookingsData)
          ? bookingsData
          : [];

        // Фильтруем бронирования в соответствии с активной вкладкой
        const activeBookings = safeBookingsData.filter(
          (booking) =>
            (activeTab === "current" && booking.status === "current") ||
            (activeTab === "cancelled" && booking.status === "cancelled") ||
            (activeTab === "completed" && booking.status === "completed")
        );

        const isActiveBooking = activeBookings.length > 0;

        return (
          <div className="booking--page">
            <PrevHeader />
            <div className="header--wrapper">
              <SliderHeader
                data={topNavItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {isActiveBooking ? (
              <>
                {activeTab === "cancelled" ? (
                  <div
                    className="cancelled--wrapper"
                    style={{ position: "relative" }}
                  >
                    {activeBookings.length > 0 && (
                      <React.Fragment
                        key={activeBookings[currentCancelledIndex].id}
                      >
                        <StatusRestaurants
                          activeTab={activeTab}
                          bookingData={activeBookings[currentCancelledIndex]}
                        />
                        <div className="wrapper-status-order">
                          <StatusOrder
                            selectedGuests={
                              activeBookings[currentCancelledIndex]
                                .selectedGuests
                            }
                            selectedDate={
                              activeBookings[currentCancelledIndex].selectedDate
                            }
                            selectedTime={
                              activeBookings[currentCancelledIndex].selectedTime
                            }
                          />
                        </div>
                        <CurrentBooking
                          title=""
                          bookingData={activeBookings[currentCancelledIndex]}
                        />
                      </React.Fragment>
                    )}
                    {activeBookings.length > 1 && (
                      <>
                        <button
                          className="btn--default"
                          onClick={() =>
                            setCurrentCancelledIndex(
                              (prev) =>
                                (prev - 1 + activeBookings.length) %
                                activeBookings.length
                            )
                          }
                          style={{
                            position: "fixed",
                            left: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <div className="icon">
                            <SVG.ArrowIcon fill="#fff" />
                          </div>
                        </button>
                        <button
                          className="btn--default"
                          onClick={() =>
                            setCurrentCancelledIndex(
                              (prev) => (prev + 1) % activeBookings.length
                            )
                          }
                          style={{
                            position: "fixed",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <div className="reverse icon">
                            <SVG.ArrowIcon fill="#fff" />
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  activeBookings.map((bookingData) => (
                    <React.Fragment key={bookingData.id}>
                      <StatusRestaurants
                        activeTab={activeTab}
                        bookingData={bookingData}
                      />
                      <div className="wrapper-status-order">
                        <StatusOrder
                          selectedGuests={bookingData.selectedGuests}
                          selectedDate={bookingData.selectedDate}
                          selectedTime={bookingData.selectedTime}
                        />
                      </div>
                      <CurrentBooking bookingData={bookingData} />
                    </React.Fragment>
                  ))
                )}

                {shouldShowOrders() && (
                  <>
                    {activeTab === "current" && isOrderSubmitted && (
                      <BookingOrderComposition />
                    )}
                    {activeTab === "cancelled" &&
                      orders.length > 0 &&
                      (() => {
                        const filteredOrders = orders.filter(
                          (order) =>
                            order.items[0].restaurantId ===
                            activeBookings[currentCancelledIndex]?.restaurantId
                        );
                        const totalPages = Math.ceil(
                          filteredOrders.length / ordersPerPage
                        );

                        // Reset page if it's out of bounds after filtering
                        if (
                          currentCancelledPage >= totalPages &&
                          totalPages > 0
                        ) {
                          setCurrentCancelledPage(totalPages - 1);
                        }

                        return (
                          <div style={{ padding: "20px", textAlign: "center" }}>
                            <h3>Отмененные блюда ({filteredOrders.length})</h3>
                            {filteredOrders
                              .slice(
                                currentCancelledPage * ordersPerPage,
                                (currentCancelledPage + 1) * ordersPerPage
                              )
                              .map((order) => (
                                <div
                                  key={order.id}
                                  style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    margin: "8px 0",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <p>
                                    <strong>Заказ #{order.id}</strong>
                                  </p>
                                  <p>Блюд: {order.items.length}</p>
                                  <p>Причина отмены: {order.cancelReason}</p>
                                  <p>
                                    Дата:{" "}
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString("ru-RU")}
                                  </p>
                                </div>
                              ))}
                            {filteredOrders.length > ordersPerPage && (
                              <div style={{ marginTop: "20px" }}>
                                <button
                                  onClick={() =>
                                    setCurrentCancelledPage((prev) =>
                                      Math.max(0, prev - 1)
                                    )
                                  }
                                  disabled={currentCancelledPage === 0}
                                  style={{ marginRight: "10px" }}
                                >
                                  Предыдущие
                                </button>
                                <button
                                  onClick={() =>
                                    setCurrentCancelledPage((prev) =>
                                      Math.min(totalPages - 1, prev + 1)
                                    )
                                  }
                                  disabled={
                                    currentCancelledPage === totalPages - 1
                                  }
                                >
                                  Следующие
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    {activeTab === "completed" && orders.length > 0 && (
                      <div style={{ padding: "20px", textAlign: "center" }}>
                        <h3>Завершенные заказы ({orders.length})</h3>
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              padding: "16px",
                              margin: "8px 0",
                              backgroundColor: "#fff",
                            }}
                          >
                            <p>
                              <strong>Заказ #{order.id}</strong>
                            </p>
                            <p>Блюд: {order.items.length}</p>
                            <p>
                              Дата завершения:{" "}
                              {new Date(
                                order.updatedAt || order.createdAt
                              ).toLocaleDateString("ru-RU")}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {!shouldShowOrders() && activeTab === "current" && (
                  <section className="show-menu--wrapper">
                    <div className="show-menu">
                      <div className="header">
                        <h5>Закажите еду к столу</h5>
                      </div>
                      <div className="info">
                        <p>
                          Вы можете заказать еду к столу и выбрать удобное для
                          вас время подачи блюд
                        </p>
                      </div>
                      <div className="btn-menu--wrapper">
                        <LinkAction
                          text={"Посмотреть меню"}
                          to={`/foods/${activeBookings[0]?.restaurantId}`}
                          style={{
                            width: "100%",
                            color: "#fff",
                            background: "#071f2b",
                          }}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {(activeTab === "current" || activeTab === "cancelled") && (
                  <OrderFood
                    restaurant={restaurant}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isOrderSubmitted={isOrderSubmitted}
                  />
                )}
              </>
            ) : (
              <div
                style={{ padding: "40px", textAlign: "center", color: "#666" }}
              >
                <h3>
                  Нет{" "}
                  {activeTab === "current"
                    ? "текущих"
                    : activeTab === "cancelled"
                    ? "отмененных"
                    : "завершенных"}{" "}
                  заказов
                </h3>
                <p>
                  Оформите заказ в <a href="/">меню</a>
                </p>
              </div>
            )}
          </div>
        );
      }}
    </BookingData>
  );
});

export default Booking;
