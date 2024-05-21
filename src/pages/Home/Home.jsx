import './home.scss';
import { userData } from "../../dummyData";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widget from '../../components/Widget/Widget';
import Chart from '../../components/chart/Chart';

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets" style={{display: 'flex', padding: '20px', gap: '20px'}}>
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="balance" />
                </div>
                <div className="charts">
                <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
                </div>
            </div>
        </div>
    );
}

export default Home;