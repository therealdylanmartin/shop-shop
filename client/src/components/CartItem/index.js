import React from 'react';

import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CART_QUANTITY, REMOVE_FROM_CART } from '../../utils/actions';

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    })
    idbPromise('cart', 'delete', item);
  }

  const changeQuantity = e => {
    const value = e.target.value;

    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      })
      idbPromise('cart', 'delete', item);
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      })
      idbPromise('cart', 'put', {
        ...item,
        purchaseQuantity: parseInt(value)
      })
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>{' '}
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={changeQuantity}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem;