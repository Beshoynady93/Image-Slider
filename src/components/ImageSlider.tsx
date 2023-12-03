import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

const IMAGES = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
];

const ImageSlider = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);

  const nextImageHandler = () => {
    if (!imageRef.current || !imageContainer.current) return;
    if (
      imageContainer.current.scrollLeft >=
      imageContainer.current.clientWidth * (IMAGES.length - 1)
    ) {
      imageContainer.current.scrollLeft = 0;
    } else {
      imageContainer.current.scrollLeft += imageRef.current.width;
    }
  };

  const previousImageHandler = () => {
    if (!imageRef.current || !imageContainer.current) return;

    if (imageContainer.current.scrollLeft === 0) {
      imageContainer.current.scrollLeft =
        imageRef.current.width * IMAGES.length;
    } else {
      imageContainer.current.scrollLeft -= imageRef.current.width;
    }
  };

  return (
    <>
      <div
        className="grid grid-flow-col max-w-md overflow-x-auto scroll-smooth snap-mandatory snap-x bg-slate-500"
        ref={imageContainer}
      >
        {IMAGES.map((image) => (
          <img
            ref={imageRef}
            className="max-w-md object-cover object-right aspect-video snap-center"
            key={uuid()}
            src={image}
            alt=""
          />
        ))}
      </div>
      <div className="flex gap-4 items-center justify-center border px-4 py-2 border-slate-500 rounded-md">
        <button
          className="bg-blue-500 px-2 py-1 rounded-md"
          onClick={nextImageHandler}
        >
          Next
        </button>
        <button
          className="bg-blue-500 px-2 py-1 rounded-md"
          onClick={previousImageHandler}
        >
          Previous
        </button>
        <button className="bg-blue-500 px-2 py-1 rounded-md">Play</button>
        <button className="bg-blue-500 px-2 py-1 rounded-md">Stop</button>
      </div>
    </>
  );
};

export default ImageSlider;
