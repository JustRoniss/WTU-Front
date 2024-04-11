import Rive from '@rive-app/react-canvas';
import './../styles/notfound.css'

const NotFound = () => {
    return (
        <div className="containerAnimation"> 
            <div className="riveContainer">
                <Rive src='./../../public/NotFound.riv' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    );
};

export default NotFound;