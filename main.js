const express = require('express')
const fs = require('node:fs')
const path = require('node:path')
const app = express();
const cors = require('cors');
let port = 3001;
const usersFile= path.resolve('users.json')

app.use(cors(),express.json())



/// (1) add new user
app.post('/user' , (req,res,next)=>{
    const {name , age , email} = req.body;
     fs.readFile(usersFile , "utf-8" , (error , data)=>{
        if(error){
            return res.status(500).json({message:"Failed to fetch the file"})
        }else{
            let users = JSON.parse(data)
            const emailExist = users.find(ele=>ele.email==email)
            if(emailExist){
                return res.status(400).json({message:"Email exists"})
            }else{
                users.push({name , age , email , id:Date.now()})
                fs.writeFile(usersFile, JSON.stringify(users) , (error)=>{
                    if(error){
                        return res.status(500).json({ message: "Failed to save user" });
                    }else{
                         return res.status(201).json({message:"user added successfully"})
                    }
                })
            }
        }
    })
})  

//(2) update user
app.patch('/user/:id' , (req,res,next)=>{
    const {id} = req.params;
    const {name , age , email} = req.body;

   fs.readFile(usersFile , "utf-8" , (error ,data)=>{
        if(error){
            return res.status(500).json({message:"Failed to fetch the file"})

        }else{
            let users = JSON.parse(data)
            const idExist = users.find(ele=> ele.id == Number(id))
            if(!idExist){
                return res.status(400).json({message:"ID not exist"})

            }else{
                if(name){
                    idExist.name = name
                }
                if(age){
                    idExist.age=age
                }
                if(email){
                    idExist.email=email
                }
                fs.writeFile(usersFile , JSON.stringify(users) , (error)=>{
                    if(error){
                        return res.status(500).json({ message: "Failed to update user" })
                    }else{
                      return res.status(200).json({message:"user updated successfully" , user:idExist})
                    }

                })
            }
        }
   })

})


//(3)delete user
app.delete('/user/:id' , (req,res,next)=>{
    const {id} = req.params;

    fs.readFile(usersFile , "utf-8", (error,data)=>{
        if(error){
            return res.status(500).json({message:"Failed to fetch the file"})

        }else{
            let users = JSON.parse(data)
            //check if user id exist
            const userExist = users.find(ele => ele.id == Number(id));
            if(!userExist){
                return res.status(404).json({message:"ID not exist"})
            }
            //remove user
             users = users.filter(ele=> ele.id != Number(id))
            fs.writeFile(usersFile ,JSON.stringify(users) , (error)=>{
                if(error){
                    return res.status(500).json({message:"Failed to delete user"})
                }else{
                    return res.status(200).json({message:"user deleted successfully"})
                }
            })
        }
    
    })
})

//(4) get user by name
app.get('/user/getByName', (req, res, next) => {

    const { name } = req.query;
    fs.readFile(usersFile, "utf-8", (error, data) => {

        if (error) {
            return res.status(500).json({
                message: "Failed to fetch the file"
            });
        }

        let users = JSON.parse(data);

        const userExist = users.find(ele => ele.name == name);

        if (!userExist) {
            return res.status(404).json({
                message: "User name not found."
            });
        }

        return res.status(200).json(userExist);

    });

});
    








app.listen(port , ()=>{
    console.log(`app is running on port ${port}`);
})