import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from './Wrapper';
import { useCreateMutation } from "../../store/services/categoryService";

const CreateCategory = () => {
    const [state, setState] = useState("");
    const navigate = useNavigate();
    const [saveCategory, data] = useCreateMutation();
    const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];
    const submitCategory = e => {
        e.preventDefault();
        saveCategory({ name: state })
    }
    useEffect(() => {
        if (data?.isSuccess) {
            navigate("/dashboard/categories");
        }
    }, [data?.isSuccess])
    return (
        <Wrapper>
            <ScreenHeader>
                <Link to="/dashboard/categories" className='btn-dark'><i className='bi bi-arrow-left-short'> categories list</i></Link>
            </ScreenHeader>
            <form className='w-full md:w-8/12' onSubmit={submitCategory}>
                <h3 className='text-lg capitalize mb-3'>create category</h3>
                {
                    errors.length > 0 && errors.map((error, key) => (
                        <div key={key}>
                            <p className="alert-danger">{error.msg}</p>
                        </div>
                    ))
                }
                <div className='mb-3'>
                    <input type="text" name="" className="form-control" placeholder='category name'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input type="submit" value={data.isLoading ? "loading..." : "create category"} className='btn-indigo' />
                </div>
            </form>
        </Wrapper>
    )
}

export default CreateCategory;