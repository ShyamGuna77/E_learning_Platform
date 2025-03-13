

const {z} = require('zod')


const registerSchema = z.object({
    body:z.object({
        username:z.string().min(4,"Name must be at least 3 characters"),
        email:z.string().email("Please provide an email"),
        password:z.string().min(5,"Password must be atleast 5 characters"),
        role:z.enum(['user','admin']).optional(),
    })
})


const loginSchema = z.object({
    body:z.object({
       email:z.string().email('please provide an email'),
       password:z.string().min(5,"password is required")
    })
});

module.exports ={registerSchema,loginSchema}