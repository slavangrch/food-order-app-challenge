import logo from '../assets/logo.jpg';

export default function Header(props) {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Reactfood</h1>
      </div>
      <button className="text-button" onClick={props.openCart}>
        {`Cart(${props.quantityNumber})`}
      </button>
    </div>
  );
}
