function Navbar({ onAddClick }) {
  return (
    <nav className="cine-nav">
      <div className="logo">CINE<span>VAULT</span></div>
      <button className="btn-add-nav" onClick={onAddClick}>
        + Add Movie
      </button>
    </nav>
  );
}

export default Navbar;