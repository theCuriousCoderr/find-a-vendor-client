"use client";

export default function WindowResize() {


  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center">
        <div>
            <button className="border px-4 py-2 rounded-md bg-orange-400 text-white text-nowrap resize">Damped Oscillatory Motion</button>
        </div>
        <div>
            <button className="border px-4 py-2 rounded-md bg-orange-400 text-white text-nowrap resize">Damped</button>
        </div>
        <div>
            <button className="border px-4 py-2 rounded-md bg-orange-400 text-white text-nowrap resize text-left">Oscillatory</button>
        </div>
        <div>
            <button className="border px-4 py-2 rounded-md bg-orange-400 text-white text-nowrap resize text-left">Motion</button>
        </div>
     
    
     
    </main>
  );
}
