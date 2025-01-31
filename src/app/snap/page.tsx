export default function Snap() {
  return (
    <main className="relative h-screen w-full overflow-auto bg-black">
      <section className="sticky top-[20px] h-[60vh] bg-blue-500 w-[90%] rounded-t-2xl mx-auto mt-20">
        <h2 className="text-center text-white font-black text-4xl pt-20">
          FIRST SECTION
        </h2>
      </section>
      <section className="sticky top-[40px] h-[60vh] bg-orange-500 w-[90%] rounded-t-2xl mx-auto -mt-5">
        <h2 className="text-center text-white font-black text-4xl pt-20">
          SECOND SECTION
        </h2>
      </section>
      <section className="sticky top-[60px] h-[60vh] bg-yellow-500 w-[90%] rounded-t-2xl mx-auto -mt-5">
        <h2 className="text-center text-white font-black text-4xl pt-20">
          THIRD SECTION
        </h2>
      </section>
      <section className="sticky top-[80px] h-[60vh] bg-green-500 w-[90%] rounded-t-2xl mx-auto -mt-5">
        <h2 className="text-center text-white font-black text-4xl pt-20">
          FOURTH SECTION
        </h2>
      </section>
      <section className="sticky top-[100px] h-screen bg-black w-[90%] rounded-t-2xl mx-auto -mt-5">
        <h2 className="text-center text-white font-black text-4xl pt-20">
          FIFTH SECTION
        </h2>
      </section>
    </main>
  );
}
