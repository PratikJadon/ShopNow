import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/top_banner/iphone15.png";
import Image2 from "../../assets/top_banner/clothBanner.png";
import Button from "../Shared/Button";

function Hero() {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pasueOnHover: false,
    pauseOnFocus: true,
  };

  const HeroData = [
    {
      id: 1,
      img: Image1,
      subtitle: "Beats Solo",
      title: "Smartphone",
      title2: "Iphone",
      url: "/products/iphone",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquid perspiciatis blanditiis minima officiis asperiores est porro fugit eaque autem ut, commodi ipsa voluptatum illo nisi unde dolor ",
    },
    {
      id: 2,
      img: Image2,
      subtitle: "Beat Fashion",
      title: "TRENDING",
      title2: "CLOTHES",
      url: "/products/cloth",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquid perspiciatis blanditiis minima officiis asperiores est porro fugit eaque autem ut, commodi ipsa voluptatum illo nisi unde dolor ",
    },
  ];

  return (
    <div className="container">
      <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center">
        <div className="container  pb-8 sm:pb-0">
          {/* Hero Section */}
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Text content Section */}
                  <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold">
                      {data.subtitle}
                    </h1>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                      {data.title}
                    </h1>
                    <h1 className="text-5xl uppercase text-white dark:text-white/5 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold">
                      {data.title2}
                    </h1>
                    <div onClick={() => (window.location.href = data.url)}>
                      <Button
                        text="Shop Now"
                        bgColor="bg-primary"
                        textColor="text-white"
                      />
                    </div>
                  </div>
                  {/* Img Section */}
                  <div className="order-1 sm:order-2">
                    <div>
                      <img
                        src={data.img}
                        className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Hero;
