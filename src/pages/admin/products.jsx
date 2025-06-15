
import axios from "axios"
import { useEffect, useState} from "react"
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
export default function AdminProductPage(){


    const [products, setProducts] = useState([])

    const [loaded , setLoaded] = useState(false)

    const navigate= useNavigate()

    useEffect(
        ()=>{

            if(!loaded){
                 axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    console.log(response.data)
                    setProducts(response.data)
                    setLoaded(true)
                }
            )

            }

        }
        ,[loaded]
    )

    async function deleteProduct(id){
        const token= localStorage.getItem("token")
        if(token==null){
            toast.error("Please Login to delete a product")
            return
        }
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        })
        setLoaded(false)
        toast.success("Product deleted successfully")

        }catch(error){
            console.log(error);
            toast.error("Error deleting product")
        }


    }




    return(
        <div className="w-full h-screen rounded-lg relative">
            <Link to={"/admin/addProduct"} className="text-white bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-8 absolute">
                <FaPlus />
            </Link>

            {loaded && <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">productId</th>
                        <th className="p-2">name</th>
                        <th className="p-2">price</th>
                        <th className="p-2">labeledPrice</th>
                        <th className="p-2">stock</th>
                        <th className="p-2">Actions</th>
                        
                    </tr>

                </thead>

                <tbody>
                    {
                        products.map(
                            (product,index)=>{
                                
                                return(
                                    <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 ">
                                    <td className="p-2">{product.productId}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2">{product.labeledPrice}</td>
                                    <td className="p-2">{product.stock}</td>
                                    <td className="p-2">
                                        <div className="w-full h-full flex justify-center">
                                            <FaRegTrashAlt onClick={()=>{
                                                deleteProduct(product.productId)
                                                
                                            }} className="text-[25px] m-[10px] hover:text-red-600"/>
                                            
                                            <GrEdit 
                                            onClick={
                                                ()=>{
                                                   // navigate("/admin/editProduct")
                                                   navigate("/admin/editProduct",
                                                    {
                                                        state:product
                                                    } )
                                                    
                                                }
                                            }
                                            
                                            
                                            className="text-[25px] m-[10px] hover:text-blue-500"/>

                                        </div>
                                    </td>
                                    </tr>
                                )
                            }
                        )

                    }
                    
                </tbody>
            </table>}
            {
                !loaded&&
                <Loader/>
                
            }
            
        </div>

    )
}

//https://rsnnorldcrpbavggwwfq.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbm5vcmxkY3JwYmF2Z2d3d2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNjU1OTQsImV4cCI6MjA2MTc0MTU5NH0.i0dFD3KWQ9FQXU0lUHDWjpwjfh2bm2kBkLKK6NPI3lo

