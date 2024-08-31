import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
  
        // if (!isLoggedIn) {
        //     return <Navigate to="/" replace/>
        // }

        if (!localStorage.getItem('token')) {
            navigate('/');
        }

        return children;
}

export default ProtectedRoute;