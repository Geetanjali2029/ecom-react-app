import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../components/AddToCart';

function Home(props) {
  const navigate = useNavigate();

    // State to manage the checkbox values
  const [checkboxes, setCheckboxes] = useState({
    smartphones:false,
    skincare: false,
    groceries:false,
    home_decoration:false
    
    // Add more checkboxes as needed
  });
  const [productList, setProductList] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelctedCategories] = useState([]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event, checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));

    let checkbox = checkboxName;
    if(checkbox === 'home_decoration'){
      checkbox = "home-decoration";
    }
    if(event.target.checked && !selectedCategories.includes(checkbox)){
      setSelctedCategories(selectedCategories => [...selectedCategories, checkbox]);
    }else{
      setSelctedCategories(selectedCategories.filter((item) => item !== checkbox))
    }
  };

  const handleRatingCheckboxChange = (event, checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  useEffect(() => {
    fetchData(perPage);
  }, [perPage, selectedCategories])

   const fetchData = async (per_page, category='') => {
    if(selectedCategories.length > 0){
      per_page = perPage; //if filter applies then reset the limit parameter in API
      category = selectedCategories.toString();
    }
      fetch(`https://fake-ecommerce-app-api.onrender.com/products?limit=${per_page}&category=${category}&minPrice=0&maxPrice=5000`)
         .then((response) => response.json())
         .then((data) => {
            // console.log(data);
            setProductList(data.products);
            setTotalCount(data.totalCount);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }

  const loadMoreItems = (page, currentPageNumber) => {
    setCurrentPage(currentPageNumber);
    let nextRecords = page * currentPageNumber;
    fetchData(nextRecords);
    setPerPage(nextRecords);
  };

  const goToProductDetail = (id) => {
    navigate("/product-details/" + id);
  };

  return (
    <div className="flex-1 bg-gray-100 p-4">
        <h1 className="text-3xl text-left font-bold p-4">E-commerce React App</h1>
        <div className="text-left p-2 w-1/4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>

        {/* Container for the layout */}
        <div className="grid grid-cols-3 gap-4 p-4">

            {/* Sidebar on the left */}
            <div className="col-span-1 p-4">
                {/* Sidebar content goes here */}
                <span className="font-bold text-2xl text-left pr-4">Filters</span>
                <span className="text-gray-600 underline text-left">Clear filters</span>
                <div className="pt-4">
                    <span>Categories</span>
                
                    <div className="pt-2 flex items-center">
                        {/* Styled Checkbox */}
                        <input
                        type="checkbox"
                        id="smartphones"
                        value="smartphones"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={checkboxes.smartphones}
                        onChange={(e) => handleCheckboxChange(e,'smartphones')}  
                        />
                        <label htmlFor="smartphones" className="ml-2 text-gray-700">
                        Smartphones
                        </label>
                        </div>
                        <div className="pt-2 flex items-center">

                        <input
                        type="checkbox"
                        id="skincare"
                        value="skincare"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={checkboxes.skincare}
                        onChange={(e) => handleCheckboxChange(e,'skincare')}
                        />
                        <label htmlFor="skincare" className="ml-2 text-gray-700">
                        Skincare
                        </label>
                        </div>
                        
                        <div className="pt-2 flex items-center">
                        <input
                        type="checkbox"
                        id="groceries"
                        value="groceries"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={checkboxes.groceries}
                        onChange={(e) => handleCheckboxChange(e,'groceries')}
                        />
                        <label htmlFor="groceries" className="ml-2 text-gray-700">
                        Groceries
                        </label>
                        </div>

                        <div className="pt-2 flex items-center">
                        <input
                        type="checkbox"
                        id="home_decoration"
                        value="home_decoration"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={checkboxes.home_decoration}
                        onChange={(e) => handleCheckboxChange(e,'home_decoration')}
                        />
                        <label htmlFor="home_decoration" className="ml-2 text-gray-700">
                        Home Decoration
                        </label>
                        </div>

                        
                </div>

                <div className="pt-4">
                  <span>Price Range</span>
                  <div className="pt-2 flex items-center">
                  <input type="text" id="minPrice" placeholder="Min price"/>
                  <input type="text" id="maxPrice" placeholder="Max price"/>
                  </div><div className="pt-4">
                  <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={()=>loadMoreItems(perPage, currentPage + 1)}>Get Price Range</button>
          </div>
                </div>
                <div className="pt-4">
                <span>Customer Rating</span>

                <div className="pt-2 flex items-center">

                        <input
                        type="checkbox"
                        id="fourStar"
                        value="fourStar"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={checkboxes.fourStar}
                        onChange={(e) => handleRatingCheckboxChange(e,'fourStar')}
                        />
                        <label htmlFor="fourStar" className="ml-2 text-gray-700">
                        4 start & above
                        </label>
                        </div>
                        
                        <div className="pt-2 flex items-center">

                        <input
                        type="checkbox"
                        id="threeStar"
                        value="threeStar"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={checkboxes.threeStar}
                        onChange={(e) => handleRatingCheckboxChange(e,'threeStar')}
                        />
                        <label htmlFor="threeStar" className="ml-2 text-gray-700">
                        3 start & above
                        </label>
                        </div>
                </div>
            </div>

            <div className="col-span-2 bg-white p-4">
            {productList.length !== 0 && (<span className='text-right'>Showing {productList.length} records</span>)}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                {productList.map((item,index) => (
                <div className="bg-white p-4 shadow-md" key={`${item.id}_${index}_product`}>
                    <img src={item.image} alt="Product 1" className="w-full h-48 object-cover mb-4"
                    onClick={()=>goToProductDetail(item.id)}/>
                    <p className="text-lg font-semibold mb-2">{item.title}</p>
                    <p className="text-gray-700">₹{item.price}</p>
                    <div>
                      <AddToCart productData={item}/>
                      
                    </div>
                </div>
                ))}
            </div>
            {productList.length !==0 && totalCount !== productList.length ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={()=>loadMoreItems(perPage, currentPage + 1)}
        >
          Load More
        </button>
      ):(
        <span>No data found</span>
      )}
                
            </div>
        </div>
    </div>
  );
}

export default Home