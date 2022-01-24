export default function Coupon({text}) {
  return (
    <div className='coupon'>
      <div className="slice" />
      <div className="slice" />
      <span>{text}</span>
    </div>
  );
}
