import "./Navbar.scss";
import LogoShamu from "images/LogoShamu.png";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  return (
    <div className="navbar__container">
      <div className="navbar__component">
        <img className="navbar__logo" src={LogoShamu} />
      </div>
      <div className="navbar__component">
        <div className="navbar__component__option">
          <Link className="navbar__component__option" to={"/"}>Home</Link>
        </div>
      </div>
      <div className="navbar__component">
      <div className="navbar__component__option">
          <Link className="navbar__component__option" to={"/room/"}>Room</Link>
        </div>
      </div>
    </div>
  );
};
