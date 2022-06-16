export interface AdSafeReturn {
    id: string;
    lat: number;
    lon: number;
    visitors: number;
}


export interface Ad extends AdSafeReturn{
    name: string;
    description: string;
    price: number;
    link: string;
}