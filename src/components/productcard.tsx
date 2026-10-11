import { banglaNumber, toBnUnit } from "@/lib/utils";
import type { IProduct } from "@/type/type";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
    const isUp = product.change.dir === "up";

    return (
        <Link href={`/products/${product.id}`}>
            <div className="group w-full rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-2">
                    <p className="rounded-2xl bg-blue-100 p-2 text-3xl">
                        {product.image}
                    </p>

                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold">{product.nameBn}</h2>
                        <p className="text-sm">
                            প্রতি {toBnUnit(product.unit)}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="mt-4 flex flex-col text-left">
                        <p className="text-sm font-semibold text-gray-600">
                            আজকের দাম
                        </p>

                        <p className="text-sm font-bold">
                            <span className="text-xl font-bold">
                                {banglaNumber(product.today)}
                            </span>{" "}
                            টাকা
                        </p>
                    </div>

                    <div className="flex items-end justify-end">
                        <span
                            className={
                                isUp ? "text-red-600" : "text-green-600"
                            }
                        >
                            {isUp
                                ? `▲ ${product.change.pct}%`
                                : `▼ ${product.change.pct}%`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
