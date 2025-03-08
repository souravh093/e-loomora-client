"use client";

import { useState, useEffect } from "react";
import { Clock, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes =
          newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto relative overflow-hidden rounded-xl shadow-2xl group">
      {/* Main background with product image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.pexels.com/photos/5926462/pexels-photo-5926462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Premium product"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>

      {/* Diagonal accent */}
      <div className="absolute -right-5 top-0 h-full w-1/3 bg-gradient-to-l from-purple-600/90 to-pink-600/90 transform -skew-x-12 hidden lg:block"></div>

      {/* Content container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between p-6 md:p-10 z-10 min-h-[300px]">
        <div className="flex-1 text-left mb-8 md:mb-0 md:mr-8 max-w-xl">
          {/* Flash sale badge */}
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full mb-4 animate-pulse">
            <Zap className="h-4 w-4 text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Limited Time
            </span>
          </div>

          {/* Main heading with highlight */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-white">
            Summer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              FLASH SALE
            </span>
          </h2>

          <h3 className="text-4xl md:text-6xl font-black mb-4 text-white">
            UP TO <span className="text-yellow-400">70% OFF</span>
          </h3>

          <p className="text-white/80 text-base md:text-lg mb-6 max-w-md">
            Exclusive deals on our premium summer collection. Limited stock
            available!
          </p>

          {/* Timer section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium text-white">Ends in:</span>
            </div>
            <div className="flex gap-2 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 w-16 border border-white/20">
                <div className="text-2xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase text-white/70">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 w-16 border border-white/20">
                <div className="text-2xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase text-white/70">Mins</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 w-16 border border-white/20">
                <div className="text-2xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase text-white/70">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with CTA */}
        <div className="flex flex-col items-center md:items-end">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Link to="/discount-products" className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300">
              <span className="text-lg">SHOP NOW</span>
              <ArrowRight className="h-5 w-5" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-200 animate-ping" />
            </Link>
          </div>

          <div className="mt-4 text-sm text-white/70 font-medium">
            Use code:{" "}
            <span className="font-bold text-yellow-400">SUMMER70</span>
          </div>
        </div>
      </div>
    </div>
  );
}
