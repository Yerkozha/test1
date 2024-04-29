export interface Product {
    id: number;
    name: string;
    attributes: (Color | Size | Weight)[];
}


export interface Color {
    code: string;
    name: string;
    color: string;
}

export interface Size {
    code: string;
    name: string;
    size: {
        width: number;
        height: number;
    }
}

export interface Weight {
    code: string;
    name: string;
    weight: number
}
