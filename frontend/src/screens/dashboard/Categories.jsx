import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { clearMessage } from '../../store/reducers/globalReducer';

const Categories = () => {
    const { success } = useSelector(state => state.globalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearMessage());
        }
    }, [dispatch])
    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/create-category" className='btn-dark'>add category <i className='bi bi-plus'></i></Link>
            </ScreenHeader>
            {success && <div className="alert-success">
                {success}!
            </div>}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sit, harum nesciunt aut ad explicabo iste obcaecati non porro, accusantium magnam eaque eum omnis! Temporibus doloremque aliquid illum earum enim.
        </Wrapper>
    )
}

export default Categories;