import { PrismaClient } from '@prisma/client'
import { error } from 'console'

const prisma = new PrismaClient()

interface updateparams{
  firstName : string,
  lastName : string 
}

async function insertUser(username : string , password : string , firstName : string , lastName : string) {


  
//  Create Operation :
// Basically it creates the user with the username , password , firstName , lastName 
  const res = await prisma.user.create({

    data: {
      email: username,
      password,
      firstName,
      lastName
  },
  select : {
     id : true,
     password:true 
  }
    
  })
  console.log(res)
  
}

insertUser("dipannitanayak@gmail.com","1234", "dipu","nayika")


// Read Operation : 
// Trying to get all the users data from the database .


async function getAllusers(){
     
     try {

    

      const user = await prisma.user.findMany()
      return user 

     }catch (error){
      console.log(error)
     }
     finally {
      await prisma.$disconnect(); // Ensure you disconnect Prisma Client
    }
}





// This is used to Update a user : 
// We search by unique email and change it's first and last names . 
async function UpdateUser(username : string , {
  firstName,
  lastName
} : updateparams) {
  
  const res = await prisma.user.update({
    
    where : {email:username},
    data : {
      firstName,
      lastName
    },
    select:{
      id:true
    }
    
  })
  
  console.log(res)
  
}

// UpdateUser("sonumondal@gmail.com",{
  //   firstName:"sonu",
  //   lastName:"mondal"
  // }).then(()=>{
    //   console.log("User Updated !!")
    // })
    
    
    // Delete operation : 
    // when you provide the users email it will search and delete the user from the database .
    async function deleteUser(username : string) {
      
      await prisma.user.delete({
        
        where : {
          email:username
        },
        
      }).then(()=>{
        console.log("User deleted Successfully")
      }).catch((err)=>{
        console.log("Error occurred ",err)
      })
      
    }
    
    
    // deleteUser("dipannitanayak@gmail.com")
    
    getAllusers().then((users)=>{
        console.log(users)
    }).catch((err)=>{
      console.log(err)
    })
    
    // email String @unique
    // firstName String
// lastName String?
// password String