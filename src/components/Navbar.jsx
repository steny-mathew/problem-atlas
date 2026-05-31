function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        ProblemAtlas
      </div>

      <div className="nav-links">
        <a href="#trending">Trending</a>
        <a href="#explorer">Explorer</a>
        <a href="#builders">Builders</a>
      </div>
    </nav>
  );
}

export default Navbar;