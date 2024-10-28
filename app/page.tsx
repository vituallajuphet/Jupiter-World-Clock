import MarketOverlapChart from "./components/MarketOverlapChart";
import MarketOverlapChecker from "./components/OverlapChecker";
import TimeContainer from "./components/TimeContainer";

export default function Home() {
  return (
    <div>
      <div className="w-full bg-slate-800 ">
        <div className="max-w-[1400px] mx-auto">
          <header className="py-4">
            <h1 className='text-xl'>Jupiter World Clock</h1>
          </header>
        </div>
      </div>
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="my-4">
          <p className="text-sm">This site is intended for Forex trading purposes.</p>
        </div>
        <div className="p-8">
          <TimeContainer />
          <div className="my-8 flex justify-center">
            <MarketOverlapChart />
          </div>
          <MarketOverlapChecker />
        </div>
      </div>
      <footer>
        <div className="w-full bg-slate-800 ">
          <div className="max-w-[1400px] mx-auto py-4 text-center">
            <p className="text-sm">© {new Date().getFullYear()} Jupiter World Clock</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
