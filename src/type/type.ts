export interface IProduct {
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
    markets: []
}

interface Change {
    dir: string
    pct: number
}