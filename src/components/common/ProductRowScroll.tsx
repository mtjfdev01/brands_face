// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// export type ProductItem = {
//   id: string;
//   title: string;
//   imageSrc: string;
//   href: string;
// };

// type Props = {
//   title: string;
//   items: ProductItem[];
// };

// export default function ProductSlider({ title, items }: Props) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const prevClass = "prod-prev";
//   const nextClass = "prod-next";

//   return (
//     <section className="w-full">
//       {/* Title */}
//       <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
//         {title}
//       </h2>

//       <div className="relative">
//         {/* arrows */}
//         <button
//           className={`${prevClass} absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white`}
//         >
//           ‹
//         </button>

//         <button
//           className={`${nextClass} absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/80 p-3 text-white`}
//         >
//           ›
//         </button>

//         <Swiper
//           modules={[Navigation]}
//           navigation={{
//             prevEl: `.${prevClass}`,
//             nextEl: `.${nextClass}`,
//           }}
//           direction={isMobile ? "vertical" : "horizontal"}
//           slidesPerView={isMobile ? 2 : 6}
//           spaceBetween={20}
//           className={isMobile ? "h-[520px]" : ""}
//         >
//           {items.map((item) => (
//             <SwiperSlide key={item.id}>
//               <Link href={item.href} className="block group">
//                 <div className="rounded-2xl bg-[#F6EFE6] p-6">
//                   <div className="relative h-[150px] w-full">
//                     <Image
//                       src={item.imageSrc}
//                       alt={item.title}
//                       fill
//                       className="object-contain transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </div>
//                 </div>

//                 <p className="mt-3 text-center text-sm font-medium md:text-base">
//                   {item.title}
//                 </p>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export type Item = {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
};

type Props = {
  title: string;
  items: Item[];
};

export default function ProductSlider({ title, items }: Props) {
  const prev = "simple-prev";
  const next = "simple-next";

  return (
    <section className="w-full py-12 md:py-16">
      {/* Title */}
      <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
        {title}
      </h2>

      <div className="relative">
        {/* arrows */}
        <button className={`${prev} absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-white`}>
          ‹
        </button>

        <button className={`${next} absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-white`}>
          ›
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: `.${prev}`, nextEl: `.${next}` }}
          spaceBetween={20}
          slidesPerView={2} // mobile
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
          className="px-10"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={item.href} className="group block">
                <div className="rounded-2xl bg-[#F6EFE6] p-6">
                  <div className="relative h-[140px] w-full">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <p className="mt-3 text-center text-sm font-medium md:text-base">
                  {item.title}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
