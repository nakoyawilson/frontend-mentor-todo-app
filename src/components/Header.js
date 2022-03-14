const Header = (props) => {
  return (
    <header className="app-header">
      <h1 className="app-title">Todo</h1>
      <button
        id="theme-icon-wrapper"
        onClick={props.toggleFunction}
        className="theme-button"
        aria-label="Toggle theme"
      >
        <img src={props.themeIcon} alt="" />
      </button>
    </header>
  );
};

export default Header;
