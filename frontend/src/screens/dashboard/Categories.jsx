import { Link } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';

const Categories = () => {
    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/create-category" className='btn-dark'>add category <i className='bi bi-plus'></i></Link>
            </ScreenHeader>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sit, harum nesciunt aut ad explicabo iste obcaecati non porro, accusantium magnam eaque eum omnis! Temporibus doloremque aliquid illum earum enim.
        </Wrapper>
    )
}

export default Categories;