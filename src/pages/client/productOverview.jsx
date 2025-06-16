import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"

export default function ProductOverview(){
    const params = useParams()
    if(params.id == null){
        window.location.href="/products"
    }
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")  
    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        console.log(res);
                        setProduct(res.data)
                        setStatus("loaded")
                    }
                ).catch(
                    ()=>{
                        toast.error("product is not available")
                        setStatus("error")
                    }
                )
            }

        },[status]
    )
    return(
        <div className="w-full h-full">
            {
                status== "loading"&&<Loader/>
            }
            {
                status=="loaded"&& 
                <div className="w-full h-full">
                    Product Loaded
                    

                </div>
            }
            {
                status=="error"&& <div>
                    ERROR
                </div>
            }
        </div>
    )

}