import Button from '@mui/material/Button';
import {useLocation, useNavigate} from 'react-router-dom';

type ButtonPropsType = {
    name: string
    route: string
    size?: 'small' | 'medium' | 'large'
    color?: 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning'
    // variant?: 'contained' | 'outlined' | 'text'
}


export const MuiButton = (props: ButtonPropsType) => {
    const {name, size, color, route} = props;

    const location = useLocation();
    const { pathname } = location;
    const isActive = (route:string) => {
        return route === location.pathname; //текущий роут равен роуту в пропсах
    };

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(route ? route : '*');
    };
    return (
        <Button variant={isActive(route) ? 'contained' : 'outlined'}
                size={size}
                onClick={handleClick}
                color={color}
        >
            {name}
        </Button>
    );
};