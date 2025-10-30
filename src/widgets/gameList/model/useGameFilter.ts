import { useState } from 'react';

export const useGameFilter = () => {
  const [search, setSearch] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    search,
    onChange
  };
};