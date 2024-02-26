import React, { useEffect, useState } from "react";

function ProductDetail() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/products");
      let data = "";
      data = await response.json();
      setProducts(data);
      console.log(products);
    }
    fetchData();
  }, []);

  return (
    <div>
      {products?.Data?.map((data) => (
        <img src={data.photos} />
      ))}
    </div>
  );
}

export default ProductDetail;
