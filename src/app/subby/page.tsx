"use client";

import Image from "next/image";

export default function WindowResize() {
  return (
    <main className="h-screen w-full bg-slate-400 flex items-center justify-center">
      <section className="bg-white rounded-2xl h-[90%] w-[50%] min-w-[450px] flex flex-col gap-5 p-5">
        <div className="h-1/2 w-full flex gap-3">
          <div className="w-[20%] h-full rounded-xl center border border-slate-400">
            <div className="relative size-full">
              <figure className="relative size-full">
                <Image
                  fill={true}
                  src="https://picsum.photos/200/300?random=1"
                  alt="photo1"
                  className="object-cover object-center rounded-xl blur-sm"
                />
              </figure>
              <figure className="absolute top-0 z-10 h-full w-[80%] left-[10%]">
                <Image
                  fill={true}
                  src="https://picsum.photos/200/300?random=1"
                  alt="photo1"
                  className="object-scale-down object-center rounded-xl"
                />
              </figure>
            </div>
          </div>
          <div className="w-[60%] h-full rounded-xl center border border-slate-400">
            <div className="relative size-full">
              <figure className="relative size-full">
                <Image
                  fill={true}
                  src="https://fastly.picsum.photos/id/828/200/300.jpg?hmac=YwDXceJcHQbinJfsIHJgrD8NakhtHzBMH-vD4aNcPo4"
                  alt="photo1"
                  className="object-cover object-center rounded-xl blur-sm"
                />
              </figure>
              <figure className="absolute top-[10%] z-10 h-[80%] w-[80%] left-[10%]">
                <Image
                  fill={true}
                  src="https://fastly.picsum.photos/id/828/200/300.jpg?hmac=YwDXceJcHQbinJfsIHJgrD8NakhtHzBMH-vD4aNcPo4"
                  alt="photo1"
                  className="object-scale-down object-center rounded-xl"
                />
              </figure>
            </div>
          </div>
          <div className="w-[20%] h-full rounded-xl  center border border-slate-400">
            <div className="relative size-full">
              <figure className="relative size-full">
                <Image
                  fill={true}
                  src="https://picsum.photos/200/300?random=7"
                  alt="photo1"
                  className="object-cover object-center rounded-xl blur-sm"
                />
              </figure>
              <figure className="absolute top-0 z-10 h-full w-[80%] left-[10%]">
                <Image
                  fill={true}
                  src="https://picsum.photos/200/300?random=7"
                  alt="photo1"
                  className="object-scale-down object-center rounded-xl"
                />
              </figure>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full flex gap-5">
          <div className="w-[20%] h-full rounded-xl flex flex-col gap-5">
            <div className="h-1/2 w-full  rounded-xl center border border-slate-400">
              <div className="relative size-full">
                <figure className="relative size-full">
                  <Image
                    fill={true}
                    src="https://picsum.photos/200/300?random=6"
                    alt="photo1"
                    className="object-cover object-center rounded-xl blur-sm"
                  />
                </figure>
                <figure className="absolute top-[10%] z-10 h-[80%] w-[80%] left-[10%]">
                  <Image
                    fill={true}
                    src="https://picsum.photos/200/300?random=6"
                    alt="photo1"
                    className="object-scale-down object-center rounded-xl"
                  />
                </figure>
              </div>
            </div>
            <div className="h-1/2 w-full  rounded-xl center border border-slate-400">
              <div className="relative size-full">
                <figure className="relative size-full">
                  <Image
                    fill={true}
                    src="https://picsum.photos/200/300?random=5"
                    alt="photo1"
                    className="object-cover object-center rounded-xl blur-sm"
                  />
                </figure>
                <figure className="absolute top-[10%] z-10 h-[80%] w-[80%] left-[10%]">
                  <Image
                    fill={true}
                    src="https://picsum.photos/200/300?random=5"
                    alt="photo1"
                    className="object-scale-down object-center rounded-xl"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div className="w-[80%] flex gap-5">
            <div className="w-[30%] h-full rounded-xl  flex flex-col gap-5 center border border-slate-400">
              <div className="relative size-full">
                <figure className="relative size-full">
                  <Image
                    fill={true}
                    src="https://picsum.photos/200/300?random=4"
                    alt="photo1"
                    className="object-cover object-center rounded-xl blur-sm"
                  />
                </figure>
                <figure className="absolute top-0 z-10 h-full w-[80%] left-[10%]">
                  <Image
                    fill={true}
                    src="https://picsum.photos/200/300?random=4"
                    alt="photo1"
                    className="object-scale-down object-center rounded-xl"
                  />
                </figure>
              </div>
            </div>
            <div className="w-[70%] h-full rounded-xl flex flex-col gap-2 center">
              <div className="h-1/2 w-full rounded-xl center border border-slate-400">
                <div className="relative size-full">
                  <figure className="relative size-full">
                    <Image
                      fill={true}
                      src="https://picsum.photos/200/300?random=3"
                      alt="photo1"
                      className="object-cover object-center rounded-xl blur-sm"
                    />
                  </figure>
                  <figure className="absolute top-[10%] z-10 h-[80%] w-[80%] left-[10%]">
                    <Image
                      fill={true}
                      src="https://picsum.photos/200/300?random=3"
                      alt="photo1"
                      className="object-scale-down object-center rounded-xl"
                    />
                  </figure>
                </div>
              </div>
              <div className="h-1/2 w-full rounded-xl center border border-slate-400">
                <div className="relative size-full">
                  <figure className="relative size-full">
                    <Image
                      fill={true}
                      src="https://picsum.photos/200/300?random=2"
                      alt="photo1"
                      className="object-cover object-center rounded-xl blur-sm"
                    />
                  </figure>
                  <figure className="absolute z-10 h-[80%] top-[10%] w-[80%] left-[10%]">
                    <Image
                      fill={true}
                      src="https://picsum.photos/200/300?random=2"
                      alt="photo1"
                      className="object-scale-down object-center rounded-xl"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
