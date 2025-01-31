import Image from "next/image";

export default function Home () {
    
    return (
        <div className="relative sky h-screen w-full bg-gradient-to-t from-white to-sky-200 overflow-hidden">
            {/* houses the plane */}
            <div className="absolute size-full flex items-center justify-center">
                <div className="move-plane absolute top-[30vh] w-full aspect-square border border-white rounded-full">
                    
                    <figure className="absolute top-[40%] -left-10 rotate-plane-30-left w-20 h-10">
                        <Image fill={true} src="/plane.png" alt="plane" />
                    </figure>
                    <figure className="absolute top-[40%] -right-10 rotate-plane-30-right w-20 h-10">
                        <Image fill={true} src="/plane.png" alt="plane" />
                    </figure>
                    <figure className="absolute -bottom-7 left-1/2 rotate-plane-bottom w-20 h-10">
                        <Image fill={true} src="/plane.png" alt="plane" />
                    </figure>

                    {/* <figure className="absolute top-[70%] -left-0 rotate-plane-70-left w-20 h-10">
                        <Image fill={true} src="/plane.png" alt="plane" />
                    </figure>
                    <figure className="absolute top-[70%] -right-0 rotate-plane-70-right w-20 h-10">
                        <Image fill={true} src="/plane.png" alt="plane" />
                    </figure> */}
                </div>
                

            </div>
            {/*houses the cloud  */}
            <div className="absolute w-full bottom-0 h-[50vh]">
                <figure className="relative size-full">
                    <Image fill={true} src="/cloudreal2.png" alt="cloud" className="object-fit sm:max-md:object-cover" />
                </figure>
            </div>
            {/* houses the form */}
            <div className="absolute size-full flex items-center justify-center">
                <div className="w-[25%] min-w-[320px] h-[60vh] bg-slate-100 rounded-md -mt-[0vh] shadow flex items-center justify-center">
                    
                    <p className="font-mono font-bold text-3xl">@uix_mo</p>
                </div>
            </div>
        </div>
    )
}