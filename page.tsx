import Link from "next/link";
import React from "react";

interface CardComponentProps {
  image: string;
  name: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, name }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{ margin: "1%", borderRadius: "10px" }}>
      <Link href="/auth/test-result">
        <img className="w-full" style={{ height: "200px", width: "400px", objectFit: "cover" }} src={image} alt={name} />
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 ml-28">
          <svg height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z"/></svg>
          {name}
        </div>
      </div>
      </Link>
    </div>
  );
};

export default function Dashboard() {
  const cardData = [
    { image: "https://www.nirujahealthtech.com/wp-content/uploads/2020/04/cardiology.png", name: "Heart Test" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOwIO8B2WExEg7MnExi2q0iRkIHmnjkD_Vg&s", name: "Eye's Test" },
    { image: "https://www.brighamandwomens.org/assets/BWH/lung-center/images/tlc-promo-diseases-and-conditions-700x400.jpg", name: "Lungs Test" },
    { image: "https://compote.slate.com/images/fb3403a0-6ffc-471a-8568-b0f01fa3bd6b.jpg", name: "Brain Test" },
    { image: "https://www.metropolisindia.com/upgrade/blog/upload/2023/08/WhatsApp-Image-2023-08-29-at-4.17.55-PM.webp", name: "Blood Test" },
    { image: "https://www.fda.gov/files/COVID%20testing%20policy%20drupal.jpg", name: "Covid Test" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <CardComponent key={index} image={card.image} name={card.name} />
      ))}
    </div>
  );
}
