import StatCard from '@/components/StatCard';
import { banglaNumber, toBnUnit } from '@/lib/utils';

interface IProduct {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon: string
  unit: string
  image: string
  today: number
  yesterday: number
  lastWeek: number
  lastMonth: number
  change: Change
  markets: Markets[]
}

interface Change {
  dir: string
  pct: number
}
interface Markets {
  market: string
  division: string
  min: number
  max: number
}

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`);
    const product: IProduct = await res.json();
    // console.log(product)
    const diff = product.today - product.yesterday;
    const absDiff = Math.abs(Number(diff.toFixed(2)));

    const status =
        diff > 0
            ? { text: 'বেড়েছে', color: 'text-red-600' }
            : diff < 0
                ? { text: 'কমেছে', color: 'text-green-600' }
                : { text: 'অপরিবর্তিত', color: 'text-gray-600' };

    const isUp = product.change.dir === 'up';

    const markets = (product.markets ?? []).filter(
        (m) => typeof m.min === 'number' && typeof m.max === 'number' && m.min > 0 && m.max > 0
    );

    const hasMarkets = markets.length > 0;

    const cheapest = hasMarkets
        ? markets.reduce((a, b) => (b.min < a.min ? b : a))
        : null;

    const priciest = hasMarkets
        ? markets.reduce((a, b) => (b.max > a.max ? b : a))
        : null;

    const avg = hasMarkets
        ? Math.round(
            (markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length) * 100
        ) / 100
        : product.today;
    return (
        <div>
            <div className="max-w-6xl mx-auto container">
                {/* <h1 className='text-xl font-bold text-center sm:text-left'>------</h1>
                <p className='text-sm text-gray-500'>------</p> */}

                <div className="mt-5 w-full rounded-xl bg-white px-4 py-3">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <p className="rounded-2xl bg-amber-50 p-2 text-4xl">{product.image}</p>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold">{product.nameBn}</h2>
                                <p className="text-sm text-gray-500">
                                    প্রতি {toBnUnit(product.unit)} · {product.categoryNameBn}
                                </p>
                                <p className="text-sm font-semibold text-gray-500">
                                    গতকালের তুলনায় আজ দাম{' '}
                                    <span className={`font-bold ${status.color}`}>{status.text}</span>
                                    {diff !== 0 && <> · {banglaNumber(absDiff)} টাকা</>}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 sm:text-right">
                            <p className="text-sm text-gray-500">আজকের দাম</p>
                            <h2 className="text-3xl font-bold">{banglaNumber(product.today)}</h2>
                            <p className="text-sm text-gray-500">টাকা / {toBnUnit(product.unit)}</p>
                            <span className={isUp ? 'text-red-600' : 'text-green-600'}>
                                {isUp ? `▲ ${product.change.pct}%` : `▼ ${product.change.pct}%`}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-6 px-4 rounded-xl w-full mt-5">
                    <h1 className=' mb-3 font-bold'>দামের সারসংক্ষেপ</h1>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <StatCard
                            label="সর্বনিম্ন দাম"
                            value={cheapest?.min ?? product.today}
                            note={'সবচেয়ে কম দামের বাজার'}
                        />
                        <StatCard
                            label="সর্বাধিক দাম"
                            value={priciest?.max ?? product.today}
                            note={'সবচেয়ে বেশি দামের বাজার'}
                        />
                        <StatCard
                            label="গড় দাম"
                            value={avg}
                            note={`প্রতি ${toBnUnit(product.unit)}-এর হিসাবে`}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;