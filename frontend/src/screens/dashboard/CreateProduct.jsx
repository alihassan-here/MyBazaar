import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Colors from "../../components/Colors";
import SizesList from "../../components/SizesList";
import ImagesPreview from "./ImagesPreview";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProductMutation } from "../../store/services/productService";
import { setSuccess } from "../../store/reducers/globalReducer";

const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
    image1: "",
    image2: "",
    image3: "",
  });
  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "1 year" },
    { name: "2 year" },
    { name: "3 year" },
    { name: "4 year" },
    { name: "5 year" },
  ]);
  const [sizeList, setSizeList] = useState([]);
  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };
  const chooseSize = (sizeObject) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };
  const deleteSize = (name) => {
    const filtered = sizeList.filter((size) => size.name !== name);
    setSizeList(filtered);
  };
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [createNewProduct, response] = useCreateProductMutation();
  const createProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    formData.append("sizes", JSON.stringify(sizeList));
    formData.append("description", value);
    formData.append("image1", state.image1);
    formData.append("image2", state.image2);
    formData.append("image3", state.image3);
    createNewProduct(formData);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors]);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"> Products list</i>
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex flex-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createProduct}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">
                title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="title..."
                onChange={handleInput}
                value={state.title}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="price" className="label">
                price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                placeholder="price..."
                onChange={handleInput}
                value={state.price}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="discount" className="label">
                discount
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                className="form-control"
                placeholder="discount..."
                onChange={handleInput}
                value={state.discount}
                min="0"
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="stock" className="label">
                stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="form-control"
                placeholder="stock..."
                onChange={handleInput}
                value={state.stock}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="categories" className="label">
                categories
              </label>
              {!isFetching ? (
                data?.categories?.length > 0 && (
                  <select
                    name="category"
                    id="categories"
                    className="form-control"
                    onChange={handleInput}
                    value={state.category}
                  >
                    <option value="">choose category</option>
                    {data.categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="colors">choose colors</label>
              <TwitterPicker onChangeComplete={saveColors} />
            </div>
            <div className="w-full p-3">
              <label htmlFor="sizes">choose sizes</label>
              {sizes.length > 0 && (
                <div className="flex flex-wrap -mx-3">
                  {sizes.map((size) => (
                    <div
                      className="size"
                      key={size.name}
                      onClick={() => chooseSize(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full p-3">
              <label htmlFor="image1" className="label">
                Image 1
              </label>
              <input
                type="file"
                name="image1"
                id="image1"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="image2" className="label">
                Image 2
              </label>
              <input
                type="file"
                name="image2"
                id="image2"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="image3" className="label">
                Image 3
              </label>
              <input
                type="file"
                name="image3"
                id="image3"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="description" className="label">
                Description
              </label>
              <ReactQuill
                id="description"
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="w-full p-3">
              <input
                className="btn btn-indigo"
                type="submit"
                value={response.isLoading ? "loading..." : "save product"}
                disabled={response.isLoading ? true : false}
              />
            </div>
          </div>
        </form>
        <div className="w-full xl:w-4/12 p-3">
          <Colors colors={state.colors} deleteColor={deleteColor} />
          <SizesList list={sizeList} deleteSize={deleteSize} />
          <ImagesPreview url={preview.image1} heading="image 1" />
          <ImagesPreview url={preview.image2} heading="image 2" />
          <ImagesPreview url={preview.image3} heading="image 3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
