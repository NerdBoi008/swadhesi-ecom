import { Product } from "@repo/types";
import { fetchAllProducts } from "@repo/db";

/**
 * GET endpoint for products
 * @url /api/products
 * @returns Product list
*/
export async function GET() {
    try {

        const products: Product[] = (await fetchAllProducts(0, 0, undefined, true)).map(product => ({
            ...product,
            brand_id: product.brand_id ?? undefined,
            meta_title: product.meta_title ?? undefined,
            meta_description: product.meta_description ?? undefined,
            slug: product.slug ?? undefined
        }));
        
        if (!products || products.length === 0) {
            return Response.json(
                { error: "No products found" },
                { status: 404 }
            );
        }        
        
        return Response.json(products, { status: 200 });

    } catch (error) {
        console.error("Error fetching products", error);
        return Response.json(
            { error: "Error fetching products" },
            { status: 500 }
        );
    }
}