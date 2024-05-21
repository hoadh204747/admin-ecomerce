import './navbar.scss';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Tìm kiếm" />
                    <SearchOutlinedIcon style={{fontSize:'34px', cursor:'pointer'}} />
                </div>
                <div className="items">
                    <div className="item">
                        <NotificationsActiveIcon className='icon'/>
                    </div>
                    <div className="item">
                        <MapsUgcOutlinedIcon className='icon'/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Navbar;