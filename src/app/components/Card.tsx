import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../types";
import defaultImg from "../../../public/default.jpg";

interface CardProps {
  recipe: Recipe;
}

const Card: React.FC<CardProps> = ({ recipe }) => {
  return (
    <div>
      {" "}
      <Link
        href={`/mypage/${recipe._id}`}
        className="group block overflow-hidden flex flex-col"
      >
        <div className="w-full h-[200px] relative">
          <Image
            src={recipe.photo.length === 0 ? defaultImg : recipe.photo}
            alt="img"
            objectFit="cover"
            layout="fill"
            className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[200px]"
          />
        </div>
        <div className="relative bg-white pt-3 flex justify-around items-center">
          <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {recipe.name}
          </h3>

          <p className="">
            <span className="tracking-wider text-gray-900">
              {" "}
              ${recipe.sellingPricePerServing}{" "}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
