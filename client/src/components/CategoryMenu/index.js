import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

function CategoryMenu({ setCategory }) {
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = categoryData?.categories || [];

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(({ _id, name }) => (
        <button
          key={_id}
          onClick={() => {
            setCategory(_id);
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
