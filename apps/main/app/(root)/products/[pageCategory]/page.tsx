import ProductsDisplayPage from "@/components/pages/ProductsDisplayPage";
// import { PageRoutes } from "@/types";
import { notFound } from "next/navigation";

type PageRoutes = {

}

interface ProductCategoryPage {
    params: Promise<{
        pageCategory: PageRoutes | string;
    }>
}

const ProductCategoryPage = async ({
    params
}: ProductCategoryPage) => {
    
    const { pageCategory } = await params;

    const pageHeading = pageCategory as PageRoutes;

    if (!pageHeading) {
        notFound();
    }

    return (
        <main className='flex-1'>
            <ProductsDisplayPage pageHeading={pageHeading as PageRoutes}/>
        </main>
    )
}

export default ProductCategoryPage