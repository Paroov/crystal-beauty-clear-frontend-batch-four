
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link,useLocation,useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload.jsx";


export default function EditProductForm(){

    const locationData = useLocation()
    const navigate = useNavigate();
    
    if(locationData.state==null){
        toast.error("Please select a product to edit")
        window.location.href="/admin/products"
        
    }

    const [productId,setProductId]=useState(locationData.state.productId);
    const [name,setName]=useState(locationData.state.name);
    const [altNames,setAltNames]=useState(locationData.state.altNames.join(","));
    const [description,setDescription]=useState(locationData.state.description);
    const [price,setPrice]=useState(locationData.state.price);
    const [labeledPrice,setLabeledPrice]=useState(locationData.state.labeledPrice); 
    const [stock,setStock]=useState(locationData.state.stock);
    const [image,setImages]=useState([]);
    




    async function handleSubmit(){
        
        const promisesArray = []
        
        for(let i=0; i<image.length; i++){
            const promise = mediaUpload(image[i])
            promisesArray[i] = promise
        }

        try{

                let result = await Promise.all(promisesArray)

                if(image.length == 0){
                    result = locationData.state.image

                }
        
        
                const altNamesInArray = altNames.split(",")
                const product = {
                    productId : productId,
                    name : name,
                    altNames : altNamesInArray,
                    description :description,
                    price : price,
                    labeledPrice : labeledPrice, 
                    image: result,
                    stock : stock
                }
                const token = localStorage.getItem("token")
                console.log(token);
        
                await axios
                    .put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId, product, {
                            headers: {
                            "Authorization": "Bearer " + token,
                        },
                })

                toast.success("Product Updated Successfully!");
                navigate("/admin/products");

            }catch(error){
                 toast.error("Product Updating  Failed!")
                console.log(error)
        }
       
 

    }
    return(
        <div className="w-full h-screen rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">

            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Products</h1>
            <input 
            disabled
            value={productId}
            onChange={
                (e)=>{
                    setProductId(e.target.value)
                    
                }
            }
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product ID"
            />

            <input
            value={name}
            onChange={
                (e)=>{
                    setName(e.target.value)
                }
            }
             className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product Name" 
             />



            <input
            value={altNames}
            onChange={
                (e)=>{
                    setAltNames(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Alternative Names"
             />

            <input 
            value={price}
            onChange={
                (e)=>{
                    setPrice(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Price"
             />

            <input 
            value={labeledPrice}
            onChange={
                (e)=>{
                    setLabeledPrice(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Labelled Price" 
            />

            <textarea
            value={description}
            onChange={
                (e)=>{
                    setDescription(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Description" 
            />


            <input
                type="file"
                onChange={
                    (e)=>{
                        setImages(e.target.files) 
                    }
                }
                multiple
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                placeholder="Images"
            
            
            />

            <input
            value={stock}
            onChange={
                (e)=>{
                    setStock(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="stock" 
            />
        
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/products"} className="bg-red-500 text-white p-[10px] rounded-lg hover:bg-red-600 text-center w-[180px]">Cancel</Link>
                <button onClick={handleSubmit} className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-600">
                    Edit Product
                </button>
            </div>

            </div>
        </div>
    )
}