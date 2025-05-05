import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    "https://rsnnorldcrpbavggwwfq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzbm5vcmxkY3JwYmF2Z2d3d2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNjU1OTQsImV4cCI6MjA2MTc0MTU5NH0.i0dFD3KWQ9FQXU0lUHDWjpwjfh2bm2kBkLKK6NPI3lo"
);
  
export default function mediaUpload(file) {
    const promise = new Promise(
    (resolve,reject)=>{
        if(file == null){
            reject("No file selected");
        }
        const timeStamp = new Date().getTime();
        const newFileName = timeStamp+file.name;

        supabase.storage.from("images").upload(newFileName,file,{
            cacheControl:"3600",
            upsert:false,
        }).then(
            ()=>{
                const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                resolve(url);
            }
           
        ).catch(
            (error)=>{
                console.log(error);
                reject("file Upload failed");
            }
        )
        
    }
    )

    return promise
  
}
