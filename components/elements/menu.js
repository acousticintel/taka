import { useData } from '../../context/dataContext';

export default function Menu() {
  const { side, onSetSide } = useData();

  return (
    <div
      onClick={() => onSetSide(!side)}
      className='relative flex flex-col justify-center items-center p-4'>
      <div className='w-7  flex flex-col items-end'>
        <div className={`h-1 transform duration-500 transition-all duration-200 rounded-full my-0.5 w-full ${side ? 'origin-bottom -rotate-45 translate-y-2 bg-lime-50' : 'bg-emerald-900'}`} />
        <div className={`h-1 transform duration-500 transition-all duration-200 rounded-full my-0.5 w-4/5 bg-emerald-900 ${side && 'opacity-0'}`} />
        <div className={`h-1 transform duration-500 transition-all duration-200 rounded-full my-0.5 ${side ? 'origin-top rotate-45 w-full -translate-y-1.5 bg-lime-50' : 'w-3/5 bg-emerald-900'}`} />
      </div>
    </div>
  )
}
