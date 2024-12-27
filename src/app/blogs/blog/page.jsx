import Button from "../../../components/website/Button_website";
import React from "react";

function page() {
  return (
    <div className="shadow-md rounded-xl pb-10 p-2 m-12">
      <div className="header text-center mt-5">
        <p className="font-bold text-3xl">Blog Title</p>
        <p className="font-bold text-xl text-gray-400">Blog subtitle</p>
      </div>
      <div className="content flex justify-center gap-10 mt-10">
        <div className="left w-[60%]">
          <img
            className="h-[550px] w-full"
            src="https://img.freepik.com/free-photo/person-holding-frame-with-open-nature-landscape-concept_23-2150063221.jpg?t=st=1735326155~exp=1735329755~hmac=8e3d24f507748efa3c772b9b3535d0df63c8968aa0e27b849829297b87bc763e&w=900"
            alt=""
          />
          <div className="date-viwes flex gap-4 mt-4">
            <div className="flex gap-1">
              <span>icon</span>
              <span>2024.10.10</span>
            </div>
            <div className="flex gap-1">
              <span>eye</span>
              <span>2000</span>
            </div>
          </div>
          <div className="title-content  mt-2">
            <p className="title font-bold text-2xl">blog title is here</p>
            <p className="title text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              facilis doloremque nobis quam est pariatur voluptatem voluptates,
              enim consequatur, impedit libero expedita quibusdam id cupiditate?
              Aperiam cumque delectus earum quis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolores facilis doloremque nobis
              quam est pariatur voluptatem voluptates, enim consequatur, impedit
              libero expedita quibusdam id cupiditate? Aperiam cumque delectus
              earum quis. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Dolores facilis doloremque nobis quam est pariatur
              voluptatem voluptates, enim consequatur, impedit libero expedita
              quibusdam id cupiditate? Aperiam cumque delectus earum quis. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Dolores facilis
              doloremque nobis quam est pariatur voluptatem voluptates, enim
              consequatur, impedit libero expedita quibusdam id cupiditate?
              Aperiam cumque delectus earum quis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolores facilis doloremque nobis
              quam est pariatur voluptatem voluptates, enim consequatur, impedit
              libero expedita quibusdam id cupiditate? Aperiam cumque delectus
              earum quis. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Dolores facilis doloremque nobis quam est pariatur
              voluptatem voluptates, enim consequatur, impedit libero expedita
              quibusdam id cupiditate? Aperiam cumque delectus earum quis. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Dolores facilis
              doloremque nobis quam est pariatur voluptatem voluptates, enim
              consequatur, impedit libero expedita quibusdam id cupiditate?
              Aperiam cumque delectus earum quis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolores facilis doloremque nobis
              quam est pariatur voluptatem voluptates, enim consequatur, impedit
              libero expedita quibusdam id cupiditate? Aperiam cumque delectus
              earum quis. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Dolores facilis doloremque nobis quam est pariatur
              voluptatem voluptates, enim consequatur, impedit libero expedita
              quibusdam id cupiditate? Aperiam cumque delectus earum quis.
            </p>
          </div>
        </div>
        <div className="right w-[30%]  shadow-md rounded-md  p-2 flex flex-col gap-5 self-start sticky top-7">
          <div className="content">
            <p className="font-bold mb-1">Get Help Now !</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestiae, porro. Quae earum nihil quisquam saepe suscipit officia
              eveniet. Explicabo, provident.
            </p>
          </div>
          <Button wFull title={"Contact Us !"} />
        </div>
      </div>
    </div>
  );
}

export default page;
