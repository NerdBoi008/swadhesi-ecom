import ProductsDisplayPage from "@/components/pages/ProductsDisplayPage";
import { notFound } from "next/navigation";

interface ProductCategoryPage {
    params: Promise<{
        pageCategory: string;
    }>
}

const ProductCategoryPage = async ({
    params
}: ProductCategoryPage) => {
    
    const { pageCategory } = await params;

    const pageHeading = pageCategory;

    if (!pageHeading) {
        notFound();
    }

    return (
        <main className='flex-1'>
            <ProductsDisplayPage pageHeading={pageHeading}/>
        </main>
    )
}

export default ProductCategoryPage