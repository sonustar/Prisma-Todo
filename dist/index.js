"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        //  Create Operation :
        // Basically it creates the user with the username , password , firstName , lastName 
        const res = yield prisma.user.create({
            data: {
                email: username,
                password,
                firstName,
                lastName
            },
            select: {
                id: true,
                password: true
            }
        });
        console.log(res);
    });
}
insertUser("dipannitanayak@gmail.com", "1234", "dipu", "nayika");
// Read Operation : 
// Trying to get all the users data from the database .
function getAllusers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findMany();
            return user;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield prisma.$disconnect(); // Ensure you disconnect Prisma Client
        }
    });
}
// This is used to Update a user : 
// We search by unique email and change it's first and last names . 
function UpdateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: { email: username },
            data: {
                firstName,
                lastName
            },
            select: {
                id: true
            }
        });
        console.log(res);
    });
}
// UpdateUser("sonumondal@gmail.com",{
//   firstName:"sonu",
//   lastName:"mondal"
// }).then(()=>{
//   console.log("User Updated !!")
// })
// Delete operation : 
// when you provide the users email it will search and delete the user from the database .
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.delete({
            where: {
                email: username
            },
        }).then(() => {
            console.log("User deleted Successfully");
        }).catch((err) => {
            console.log("Error occurred ", err);
        });
    });
}
// deleteUser("dipannitanayak@gmail.com")
getAllusers().then((users) => {
    console.log(users);
}).catch((err) => {
    console.log(err);
});
// email String @unique
// firstName String
// lastName String?
// password String
