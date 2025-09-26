import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";

const AcfSlider = ({ images }) => {
  const slides = [];
  for (let i = 0; i < images.images; i++) {
    if (images[`images_${i}_image`] && images[`images_${i}_url`]) {
      slides.push({
        image: images[`images_${i}_image`].url,
        url: images[`images_${i}_url`],
        title: images[`images_${i}_image`].title || "",
        alt: images[`images_${i}_image`].alt || "",
      });
    }
  }

  return (
    <div className="mx-auto max-w-7xl pt-5 pb-4">
      {/* <div className="swiper mx-auto max-w-7xl py-8"> */}
      <Swiper
        navigation={true}
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        // className="swiper" // Added padding-bottom here
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="ml-3 flex items-center justify-center"
          >
            <a
              href={slide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-0 sm:pl-9"
              >
              <Image
                src={slide.image}
                alt={slide.alt}
                width={270}
                height={100}
                className="ml-2"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AcfSlider;
