import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Avatar = () => {
    return (
        <Link className="bg-gray-600 p-2 rounded-full text-white hover:border-white border-gray-900 border-2" to="/">
            <FontAwesomeIcon icon={faUser} className='w-6 h-6' />
        </Link>

    );
}

export default Avatar;
