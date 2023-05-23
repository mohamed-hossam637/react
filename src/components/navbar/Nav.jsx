import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { GlobalStore } from "../../Context/Store";

export default function Nav() {

    let { userToken, openNav , toggelLogin , updateUserToken, updateUserData ,closeNave } = useContext(GlobalStore);

    let logout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("User_info");
        updateUserData(null);
        updateUserToken(null);
        closeNave();
    }

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo">
                        cinematex
                    </div>
                    <nav className="navbar hedin-responsive">
                        <ul className="links">
                            <li className="link text-capitalize">
                                <Link to="/"> home</Link>
                            </li>
                            <li className="link ">
                                <Link to="/explore">explore</Link>
                            </li>
                            <li className="link">
                                <Link to="/top_rated">top rated</Link>
                            </li>
                            {
                                userToken !== null ? <li className="link">
                                    <Link to="/favorite">favorite</Link>
                                </li> : null
                            }
                        </ul>
                    </nav>
                    <div className="mobile-nav" onClick={toggelLogin}>
                        <i className="fa-solid fa-bars"></i>

                    </div>

                    {
                        userToken === null ?
                            <Link className="user-container hedin-responsive" to="login">
                                <i className="fa-solid fa-user"></i>
                                <span className="user-name">Login</span>
                            </Link>
                            :
                            <span className="user-container hedin-responsive c-pointer" onClick={logout}>
                                <span className="user-name me-2">logout</span>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </span>
                    }
                </div>
                {openNav === true ?
                    <div className="row">
                        <div className="mobile-menu ">
                            <ul className="mobile-links text-center text-capitalize">
                                <li className="link py-2" onClick={closeNave}>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="link py-2" onClick={closeNave}>
                                    <Link to="/explore">Explore</Link>
                                </li>
                                <li className="link py-2" onClick={closeNave}>
                                    <Link to="/top_rated">top rated</Link>
                                </li>
                                {
                                    userToken !== null ?
                                        <li className="link py-2" onClick={closeNave}>
                                            <Link to="/favorite">favorite</Link>
                                        </li> : null
                                }
                                {
                                    userToken === null ?
                                        <li className="py-2" onClick={closeNave}>
                                            <Link className="user-container" to="/login">
                                                <i className="fa-solid fa-user"></i>
                                                <span className="user-name">Login</span>
                                            </Link>
                                        </li>
                                        :
                                        <li className="user-container c-pointer py-2" onClick={logout}>
                                            <span className="user-name me-2">logout</span>
                                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div> : null}
            </header>

        </>
    )
}