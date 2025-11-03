import { useState, useEffect } from 'react';
import { Zap, Droplets, DollarSign } from 'lucide-react';

function App() {
  const [totalKWhUsed, setTotalKWhUsed] = useState('');
  const [totalKWhTinyHouse, setTotalKWhTinyHouse] = useState('');
  const [totalKWh10B, setTotalKWh10B] = useState('');
  const [totalCubicMeterUsed, setTotalCubicMeterUsed] = useState('');
  const [totalCubicMeter10B, setTotalCubicMeter10B] = useState('');
  const [debtPrice, setDebtPrice] = useState('');

  const [electricityResults, setElectricityResults] = useState({
    totalKWhBigHouse: 0,
    totalKWh10B: 0,
    totalBillInDollars: 0,
    totalBillBigHouse: 0,
    totalBillTinyHouse: 0,
    totalBill10B: 0,
    percentageBigHouse: 0,
    percentageTinyHouse: 0,
    percentage10B: 0,
  });

  const [waterResults, setWaterResults] = useState({
    totalBillInDollars: 0,
    totalBillBigHouse: 0,
    totalBillTinyHouse: 0,
    totalBill10B: 0,
  });

  const [debtResults, setDebtResults] = useState({
    amountToTopUp: 0,
    thirtyPercent: 0,
  });

  useEffect(() => {
    const kWhUsed = parseFloat(totalKWhUsed);
    const kWhTiny = parseFloat(totalKWhTinyHouse);
    const kWh10B = parseFloat(totalKWh10B);

    if (!isNaN(kWhUsed) && !isNaN(kWhTiny) && !isNaN(kWh10B)) {
      const kWhBig = kWhUsed - kWhTiny - kWh10B;
      const totalBill = (kWhUsed - 2000) * 0.1 + 118;

      const percentageBig = kWhBig / kWhUsed;
      const percentageTiny = kWhTiny / kWhUsed;
      const percentage10B = kWh10B / kWhUsed;

      const billBig = percentageBig * totalBill;
      const billTiny = percentageTiny * totalBill;
      const bill10B = percentage10B * totalBill;

      setElectricityResults({
        totalKWhBigHouse: kWhBig,
        totalKWh10B: kWh10B,
        totalBillInDollars: totalBill,
        totalBillBigHouse: billBig,
        totalBillTinyHouse: billTiny,
        totalBill10B: bill10B,
        percentageBigHouse: percentageBig,
        percentageTinyHouse: percentageTiny,
        percentage10B: percentage10B,
      });
    } else {
      setElectricityResults({
        totalKWhBigHouse: 0,
        totalKWh10B: 0,
        totalBillInDollars: 0,
        totalBillBigHouse: 0,
        totalBillTinyHouse: 0,
        totalBill10B: 0,
        percentageBigHouse: 0,
        percentageTinyHouse: 0,
        percentage10B: 0,
      });
    }
  }, [totalKWhUsed, totalKWhTinyHouse, totalKWh10B]);

  useEffect(() => {
    const cubicMeter = parseFloat(totalCubicMeterUsed);
    const cubicMeter10B = parseFloat(totalCubicMeter10B);

    if (!isNaN(cubicMeter) && !isNaN(cubicMeter10B)) {
      const totalBill = (cubicMeter - 54.54) * 0.44 + 5.9994;
      const bill10B = (cubicMeter10B - 54.54) * 0.44 + 5.9994;

      const percentageBig = electricityResults.percentageBigHouse;
      const percentageTiny = electricityResults.percentageTinyHouse;

      const sharedBill = totalBill - bill10B;
      const billBig = percentageBig * sharedBill;
      const billTiny = percentageTiny * sharedBill;

      setWaterResults({
        totalBillInDollars: totalBill,
        totalBillBigHouse: billBig,
        totalBillTinyHouse: billTiny,
        totalBill10B: bill10B,
      });
    } else {
      setWaterResults({
        totalBillInDollars: 0,
        totalBillBigHouse: 0,
        totalBillTinyHouse: 0,
        totalBill10B: 0,
      });
    }
  }, [totalCubicMeterUsed, totalCubicMeter10B, electricityResults.percentageBigHouse, electricityResults.percentageTinyHouse]);

  useEffect(() => {
    const price = parseFloat(debtPrice);

    if (!isNaN(price) && price > 0) {
      const x = price / 0.7;
      const thirtyPercent = 0.3 * x;

      setDebtResults({
        amountToTopUp: x,
        thirtyPercent: thirtyPercent,
      });
    } else {
      setDebtResults({
        amountToTopUp: 0,
        thirtyPercent: 0,
      });
    }
  }, [debtPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <header className="text-center py-4">
          <h1 className="text-2xl font-bold text-slate-800">Bill Calculator</h1>
          <p className="text-sm text-slate-600 mt-1">Manage shared utilities</p>
        </header>

        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Electricity Bill</h2>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total kWh Used
              </label>
              <input
                type="number"
                value={totalKWhUsed}
                onChange={(e) => setTotalKWhUsed(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Enter total kWh"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tiny House kWh
              </label>
              <input
                type="number"
                value={totalKWhTinyHouse}
                onChange={(e) => setTotalKWhTinyHouse(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Enter tiny house kWh"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Unit 10B kWh
              </label>
              <input
                type="number"
                value={totalKWh10B}
                onChange={(e) => setTotalKWh10B(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Enter Unit 10B kWh"
              />
            </div>

            <div className="pt-2">
              <div className="bg-slate-50 rounded-xl p-3 mb-3">
                <p className="text-xs text-slate-600 mb-1">Big House kWh</p>
                <p className="text-lg font-bold text-slate-800">
                  {electricityResults.totalKWhBigHouse.toFixed(2)}
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-4 mb-3">
                <p className="text-xs text-slate-300 mb-1">Total Bill</p>
                <p className="text-2xl font-bold text-white">
                  ${electricityResults.totalBillInDollars.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3">
                  <p className="text-xs text-emerald-700 font-medium mb-1">Big House (Unit 10)</p>
                  <p className="text-lg font-bold text-emerald-800">
                    ${electricityResults.totalBillBigHouse.toFixed(2)}
                  </p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-blue-700 font-medium mb-1">Tiny House (Unit 10A)</p>
                  <p className="text-lg font-bold text-blue-800">
                    ${electricityResults.totalBillTinyHouse.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-700 font-medium mb-1">Unit 10B</p>
                <p className="text-lg font-bold text-purple-800">
                  ${electricityResults.totalBill10B.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Water Bill</h2>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Cubic Meter Used
              </label>
              <input
                type="number"
                value={totalCubicMeterUsed}
                onChange={(e) => setTotalCubicMeterUsed(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter cubic meters"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Unit 10B Water Submeter
              </label>
              <input
                type="number"
                value={totalCubicMeter10B}
                onChange={(e) => setTotalCubicMeter10B(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter Unit 10B water submeter"
              />
            </div>

            <div className="pt-2">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-4 mb-3">
                <p className="text-xs text-slate-300 mb-1">Total Bill</p>
                <p className="text-2xl font-bold text-white">
                  ${waterResults.totalBillInDollars.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3">
                  <p className="text-xs text-emerald-700 font-medium mb-1">Big House (Unit 10)</p>
                  <p className="text-lg font-bold text-emerald-800">
                    ${waterResults.totalBillBigHouse.toFixed(2)}
                  </p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-blue-700 font-medium mb-1">Tiny House (Unit 10A)</p>
                  <p className="text-lg font-bold text-blue-800">
                    ${waterResults.totalBillTinyHouse.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-700 font-medium mb-1">Unit 10B</p>
                <p className="text-lg font-bold text-purple-800">
                  ${waterResults.totalBill10B.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">30% Debt Calculator</h2>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Electricity Bill to Top Up This Month ($)
              </label>
              <input
                type="number"
                value={debtPrice}
                onChange={(e) => setDebtPrice(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                placeholder="Enter price"
                step="0.01"
                min="0"
              />
            </div>

            {debtResults.amountToTopUp > 0 && (
              <div className="pt-2 space-y-3">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-600 mb-1">Amount to Top Up</p>
                  <p className="text-xl font-bold text-slate-800">
                    ${debtResults.amountToTopUp.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-4">
                  <p className="text-xs text-rose-100 mb-1">Mama/Bapa Top Up (30%)</p>
                  <p className="text-2xl font-bold text-white">
                    ${debtResults.thirtyPercent.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="text-center py-6 text-sm text-slate-500">
          Shared utilities calculator
        </footer>
      </div>
    </div>
  );
}

export default App;
