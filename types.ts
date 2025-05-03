export interface productType{
    readonly id: number;
    category:string;
    description: string;
    title: string;
    price: number;
    rating:any;
    // rating?: {
    //     "rate": number;
    //     "count": number;
    // };
    image: string;
}