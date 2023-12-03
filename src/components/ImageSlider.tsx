import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PlayIcon from './PlayIcon';
import StopIcon from './StopIcon';
import NextIcon from './NextIcon';
import BackIcon from './BackIcon';

const IMAGES = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
];

const TIMEOUT = 1000;

const ImageSlider = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const [intervalID, setIntervalID] = useState<number>();
  const [isSliderPlaying, setIsSliderPlaying] = useState(false);

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

  const playImageSliderHandler = () => {
    const intervalID = setInterval(() => {
      nextImageHandler();
    }, TIMEOUT);

    setIntervalID(intervalID);
    setIsSliderPlaying(true);
  };

  const stopImageSliderHandler = () => {
    clearInterval(intervalID);
    setIsSliderPlaying(false);
  };

  return (
    <div className="space-y-4">
      <div
        className="grid grid-flow-col max-w-md overflow-x-auto scroll-smooth snap-mandatory snap-x bg-slate-500 image-slider"
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
          className="disabled:bg-slate-500 px-4 py-1 rounded-md flex items-center flex-col justify-center text-neutral-200 font-bold bg-slate-800"
          onClick={nextImageHandler}
          disabled={isSliderPlaying}
        >
          <NextIcon />
          <span>Next</span>
        </button>

        <button
          className="disabled:bg-slate-500 px-4 py-1 rounded-md flex items-center flex-col justify-center text-neutral-200 font-bold bg-slate-800"
          onClick={playImageSliderHandler}
          disabled={isSliderPlaying}
        >
          <PlayIcon />
          <span>Play</span>
        </button>
        <button
          className="disabled:bg-slate-500 px-4 py-1 rounded-md flex items-center flex-col justify-center text-neutral-200 font-bold bg-slate-800"
          onClick={stopImageSliderHandler}
          disabled={!isSliderPlaying}
        >
          <StopIcon />
          <span>Stop</span>
        </button>

        <button
          className="disabled:bg-slate-500 px-4 py-1 rounded-md flex items-center flex-col justify-center text-neutral-200 font-bold bg-slate-800"
          onClick={previousImageHandler}
          disabled={isSliderPlaying}
        >
          <BackIcon />
          <span>Previous</span>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
