import Products from "../../Products/Products";
import useFetch from "../../../hooks/useFetch";
const RelatedProducts = (productId,categoryId) => {
    // console.log(categoryId,"this is for category");
    console.log(productId.categoryId);
    const {data} = useFetch(
        `/api/products?populate=*&[filters][id][$ne]=${productId.productId}&[filters][categories][id]=${productId.categoryId}&
        pagination[start]=0&pagination[limit]=4`
    )
    return (
        <div className="related-product">
            <Products headingText="Related Products" products={data}/>
        </div>
    );
};

export default RelatedProducts;
