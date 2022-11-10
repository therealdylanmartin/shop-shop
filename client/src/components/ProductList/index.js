import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';

import { idbPromise } from "../../utils/helpers";
import { QUERY_PRODUCTS } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from '../../utils/actions';

import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if data exists or has changed from the response of useQuery, then run dispatch()
    if (data) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      })

      // but let's also take each product and save it to IndexedDB using the helper function 
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      })
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((indexedProducts) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        })
      })
    }
  }, [data, loading, dispatch])

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map(({ _id, image, name, price, quantity }) => (
            <ProductItem
              key={_id}
              _id={_id}
              image={image}
              name={name}
              price={price}
              quantity={quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  )
}

export default ProductList;
