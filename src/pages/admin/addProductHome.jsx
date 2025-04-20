
import { Link } from "react-router-dom";
export default function AddProductForm(){
    return(
        <div className="w-full h-screen rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">

            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Products</h1>
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product ID" />

            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product Name" />

            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Alternative Names" />

            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Price" />

            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Labelled Price" />

            <textarea className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Description" />

            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="stock" />
        
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"admin/products"} className="bg-red-500 text-white p-[10px] rounded-lg hover:bg-red-600 text-center w-[180px]">Cancel</Link>
                <button className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-600">Add Products</button>
            </div>

            </div>
        </div>
    )
}