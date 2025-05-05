
import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function AdminProductPage(){

    const [products, setProducts] = useState([])

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    console.log(response.data)
                    setProducts(response.data)
                }
            )

        }
        ,[]
    )

    
    return(
        <div className="w-full h-screen rounded-lg relative">
            <Link to={"/admin/addProduct"} className="text-white bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 right-5 bottom-8 absolute">
                <FaPlus />
            </Link>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">productId</th>
                        <th className="p-2">name</th>
                        <th className="p-2">price</th>
                        <th className="p-2">labeledPrice</th>
                        <th className="p-2">stock</th>
                        
                    </tr>

                </thead>

                <tbody>
                    {
                        products.map(
                            (product,index)=>{
                                console.log("mapping"+product.productId)
                                return(
                                    <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-700 hover:text-white">
                                    <td className="p-2">{product.productId}</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2">{product.labeledPrice}</td>
                                    <td className="p-2">{product.stock}</td>
                        
                                    </tr>
                                )
                            }
                        )

                    }
                    
                </tbody>
            </table>
            
        </div>

    )
}

//https://rsnnorldcrpbavggwwfq.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbm5vcmxkY3JwYmF2Z2d3d2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNjU1OTQsImV4cCI6MjA2MTc0MTU5NH0.i0dFD3KWQ9FQXU0lUHDWjpwjfh2bm2kBkLKK6NPI3lo

