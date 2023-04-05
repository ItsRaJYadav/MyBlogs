import React from "react";
import { MdOutlineMonitor } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { GoComment } from "react-icons/go";
import Image from 'next/image';

import authorImg from "../public/images/profile.png";

const BannerBottom = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center h-auto lg:h-60 bg-gradient-to-b from-blue-600 to-blue-400 text-white py-10 px-8 -mt-20 z-50">
      <div className="w-full lg:w-[60%] flex flex-col gap-3">
        <p className="text-xs uppercase font-medium">My Blog</p>
        <h3 className="font-bold text-lg md:text-3xl">
          These 7 things will change the way you approach learning!
        </h3>
        <div className="flex items-center gap-2">
          <Image src={authorImg} alt="Author" className="w-20 h-20 rounded-full" />
          <p className="text-xs text-gray-200">RaJ Yadav / 1 weeks ago</p>
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex items-center justify-center gap-2 lg:gap-8">
        <button className="w-full flex flex-col items-center group">
          <MdOutlineMonitor className="text-4xl text-gray-300 group-hover:text-white duration-300" />
          <p className="text-xs md:text-sm font-medium text-gray-200 group-hover:text-white">
            Read More
          </p>
        </button>
        <button className="w-full flex flex-col items-center justify-center group">
          <IoMdHeart className="text-4xl text-gray-300 group-hover:text-white duration-300" />
          <p className="text-xs md:text-sm font-medium text-gray-200 group-hover:text-white">
            Like Our Content
          </p>
        </button>
        <button className="w-full flex flex-col items-center justify-center group">
          <GoComment className="text-4xl text-gray-300 group-hover:text-white duration-300" />
          <p className="text-xs md:text-sm font-medium text-gray-200 group-hover:text-white">
            Comment
          </p>
        </button>
      </div>
    </div>
  );
};

export default BannerBottom;
