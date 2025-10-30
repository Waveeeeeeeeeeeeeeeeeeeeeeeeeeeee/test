import FilterIco from '../../assets/icons/filter.svg?react';

const FilterICon = () => {
  return (
    <div className='group cursor-pointer p-2.5 flex justify-center items-center rounded-2xl border-[1px] border-[#40434f] w-11 h-11 hover:bg-[#40434f] transition-all'>
			<FilterIco className='fill-white' />
		</div>);

};

export default FilterICon;