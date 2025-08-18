import {  useAnimation } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ShowReviws  = () => {
  const axiosPublic = useAxiosPublic();
  const controls = useAnimation();
  const containerRef = useRef(null);
  const speed = 100; // pixels per second

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get-reviews");
      return res.data;
    },
  });

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrame;
    let startTime = null;
    let currentX = containerRef.current.offsetWidth;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const delta = (time - startTime) / 1000; // seconds
      currentX -= speed * delta;
      if (currentX <= -containerRef.current.scrollWidth) {
        currentX = containerRef.current.offsetWidth;
      }
      containerRef.current.style.transform = `translateX(${currentX}px)`;
      startTime = time;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    containerRef.current.addEventListener("mouseenter", () => cancelAnimationFrame(animationFrame));
    containerRef.current.addEventListener("mouseleave", () => {
      startTime = null;
      animationFrame = requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [reviews]);

  if (isLoading) {
    return (
      <section className="py-16 px-5 md:px-20 bg-gray-50 dark:bg-gray-900 text-center dark:text-white">
        <p>Loading reviews...</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-5 md:px-20 bg-gray-200 rounded-sm  dark:bg-gray-600 dark:text-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        What Our Users Say
      </h2>

      <div className="overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex gap-6 whitespace-nowrap"
        >
          {reviews.map((review) => (
            <div
              key={review._id}
              className=" p-5 rounded-xl shadow-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.photo}
                  alt={review.reviewName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold">{review.reviewName}</h3>
                  <p className="text-sm text-gray-400 dark:text-gray-300">
                    {review.RestaurantName}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xm md:text-lg mb-2">
                "{review.comment}"
              </p>
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: review.reviewRating }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowReviws ;
