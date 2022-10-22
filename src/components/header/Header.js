import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import Nav from "./Nav";

function Header() {
    return (
        <div className='header'>
            <div className="header__left">
                <div className="blob">
                    <img src="logo.png" alt="" />
                </div>
                <div className="header__search">
                    {/* searchIcon */}
                    <SearchIcon />
                    <input type="text" name="" id="" />
                </div>
            </div>
            <div className="header_right">
                <Nav />
            </div>
        </div>
    )
}

export default Header