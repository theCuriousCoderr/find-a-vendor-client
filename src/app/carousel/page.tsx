import Image from "next/image";

export default function Carousel() {
  const imagesArr = [
    "https://picsum.photos/600/600?random=1",
    "https://picsum.photos/600/600?random=2",
    "https://picsum.photos/600/600?random=3",
    "https://picsum.photos/600/600?random=4",
    "https://picsum.photos/600/600?random=5",
    "https://picsum.photos/600/600?random=6",
    "https://picsum.photos/600/600?random=7",
    "https://picsum.photos/600/600?random=8",
    "https://picsum.photos/600/600?random=9",
    "https://picsum.photos/600/600?random=10",
    "https://picsum.photos/600/600?random=11",
    "https://picsum.photos/600/600?random=13",
  ];

  let key = 0;

  return (
    <main className="h-screen w-full flex items-center justify-center bg-black ">
      <section className="relative flex bg-red-500 w-full overflow-auto mainContent">
        {/* <div className="absolute z-10 h-full w-80 bg-red-400"></div> */}
        {/* <figure className="mb-24 mr-20  bg-yellow-500 w-80 min-w-80 aspect-[0.8/1] relative">
          <Image
            fill={true}
            src="https://picsum.photos/600/600?random=15"
            alt={`Image 14`}
            className="object-cover p-1"
          />
        </figure> */}
        {imagesArr.map((image) => {
          return (
            <figure
              key={image.split("=")[1]}
              className=" bg-green-500 w-80 min-w-80 aspect-[0.8/1] relative slider"
            >
              <Image
                fill={true}
                src={image}
                alt={`Image ${image.split("=")[1]}`}
                className="object-cover p-1"
              />
            </figure>
          );
        })}
      </section>
    </main>
  );
}
