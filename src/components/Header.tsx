import { GrTask } from "react-icons/gr";
const Header = () => {
  const content = (
    <header>
      <div className="header__label">
        <h1>To.Dew.It <GrTask /></h1>
        <span>Do it today!</span>
      </div>
    </header>
  );
  return content;
};

export default Header;
