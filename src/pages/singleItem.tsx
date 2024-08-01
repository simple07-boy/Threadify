import React, { useEffect, useState } from "react";
// @ts.ignore
import ReactStarsRating from "react-awesome-stars-rating";
import { useParams } from "react-router-dom";
import { useGetProductsBySlugQuery } from "../redux/queries/ProductApi";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/Cartslice";

const singleItem = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [number, setNumber] = useState(0);
  const datas = useParams();
  const { refetch, data, isError, isLoading } = useGetProductsBySlugQuery(
    datas.id as unknown as number
  );
  useEffect(() => {
    refetch();
  }, [datas]);

  useEffect(() => {
    if (data) {
      setImage(data?.images[0]);
      setNumber(Math.random() * 5);
    }
  }, [data]);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }
  const AddToCartHandler = () => {
    try {
      const item = {
        id: data.id,
        image: image,
        price: data.price,
        qty: 1,
        title:data.title
      };
      dispatch(addToCart(item));
      toast.success("Item is added in cart");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full flex">
              <div className="w-1/5 justify-start gap-y-6 py-3 flex flex-col">
                {data?.images.map((c: any, i: number) => {
                  return (
                    <div
                      onClick={() => setImage(c)}
                      key={i}
                      className="w-full border"
                    >
                      <img
                        alt="ecommerce"
                        loading="lazy"
                        className="object-cover object-center rounded"
                        src={c}
                      />
                    </div>
                  );
                })}
              </div>
              <InnerImageZoom
                alt="ecommerce"
                className="lg:w-[80%] w-full lg:h-auto h-64 object-cover object-center rounded"
                loading="lazy"
                src={image}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                {data.category.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {data.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <ReactStarsRating
                    value={number}
                    isHalf={true}
                    primaryColor={"#6366f1"}
                    secondaryColor={"#fff"}
                    isEdit={false}
                    className="flex"
                  />
                  <span className="text-gray-600 ml-3">
                    {" "}
                    {Math.floor(number)} Reviews
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <div className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </div>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{data.description}</p>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  &#8377;{data.price * 10}
                </span>
                <button
                  onClick={AddToCartHandler}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default singleItem;
