
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link,useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload.jsx";


export default function AddProductForm(){

    const [productId,setProductId]=useState("");
    const [name,setName]=useState("");
    const [altNames,setAltNames]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [labeledPrice,setLabeledPrice]=useState("");
    const [stock,setStock]=useState("");
    const [image,setImages]=useState([]);
    const navigate = useNavigate();




    async function handleSubmit(){
        const promisesArray = []
        
        for(let i=0; i<image.length; i++){
            const promise = mediaUpload(image[i])
            promisesArray[i] = promise
        }

        try{

                const result = await Promise.all(promisesArray)
        
        
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
                    .post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
                            headers: {
                            "Authorization": "Bearer " + token,
                        },
                })

                toast.success("Product Added Successfully!");
                navigate("/admin/products");

            }catch(error){
                 toast.error("Product Adding  Failed!")
                console.log(error)
        }
       
 

    }
    return(
        <div className="w-full h-screen rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">

            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Products</h1>
            <input 
            value={productId}
            onChange={
                (e)=>{
                    setProductId(e.target.value)
                    
                }
            }
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product ID"
            />

            <input
            name={name}
            onChange={
                (e)=>{
                    setName(e.target.value)
                }
            }
             className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product Name" 
             />



            <input
            name={altNames}
            onChange={
                (e)=>{
                    setAltNames(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Alternative Names"
             />

            <input 
            name={price}
            onChange={
                (e)=>{
                    setPrice(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Price"
             />

            <input 
            name={labeledPrice}
            onChange={
                (e)=>{
                    setLabeledPrice(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Labelled Price" 
            />

            <textarea
            name={description}
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
            name={stock}
            onChange={
                (e)=>{
                    setStock(e.target.value)
                }
            }
            
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="stock" 
            />
        
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"admin/products"} className="bg-red-500 text-white p-[10px] rounded-lg hover:bg-red-600 text-center w-[180px]">Cancel</Link>
                <button onClick={handleSubmit} className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-600">Add Products</button>
            </div>

            </div>
        </div>
    )
}