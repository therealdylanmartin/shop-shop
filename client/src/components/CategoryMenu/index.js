import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if data exists or has changed from the response of useQuery, then run dispatch()
    if (data) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: data.categories
      })
    }
  }, [data, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
      {categories.map(({ _id, name }) => (
        <button
          key={_id}
          onClick={() => {
            handleClick(_id);
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
