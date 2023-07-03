const { escapeXML } = require('ejs');
const express = require('express');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;




const app = express();

app.set('view engine', 'ejs');


app.use(express.urlencoded({
    extended: true
}));




const url = 'mongodb://127.0.0.1:27017';
const dbName = 'users';
const dbBlogs ='blogs';
var usernameBlog;
var useremail;
var username;

app.use((req, res, next) => {
    res.header('Cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0, post-check=0,pre-check=0');
    next();
});



let loggedIn = false;
let userId =null ;

app.use(session({
    secret: "abc",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },

}));



  app.use((req, res, next) => {
    if(req.path ==='/signup' && req.method=='GET')
    {
        res.render('signup')
    }
    
    else  if (req.path !== '/login' && !req.session.loggedIn && req.path !=='/signup') {
      res.redirect('/login');
    } else {
      next();
    }
  });


  


async function getDatabase() {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
}
async function getDatabaseBlog() {
    const client = await MongoClient.connect(url);
    return client.db(dbBlogs);
}

async function getBlog()
{

    try{

        const db = await getDatabaseBlog();
        const collection = db.collection('blogs');

        const filter ={email :useremail};
        
         const docs = await collection.aggregate([{$match:filter}]).toArray();
     
         return docs;

    }catch(err)

    {
        console.log(err);
    }


}

app.get('/signup',(req,res)=>{


    res.render('signup')
})


//post signup 


app.post('/signup', async (req, res) => {
    try {
        const db = await getDatabase();
        const collection = db.collection('cred');
        const docs = await collection.find({}).toArray();
        let email;

        for (let x of docs) {
            if (x.email == req.body.email) {
                email = x.email;
            } else {
                email = null;
            }
        }

        if (email) {
           
            res.render('login', { data: "user already exists" });
        } else {
           
            db.collection('cred').insertOne(req.body);
           
            res.render('login',{data:"successfully created "})
        }
    } catch (err) {
        console.log(err);
    }
});



//login 


app.get('/login', (req, res) => {
    if (req.session.loggedIn && req.session.username =='admin') {
        res.render('adminhome');
    }else if(req.session.loggedIn){
        
       
        res.render('usershome',{users:{name:"user"}},{blogs:"null"});
    }
    
    
    else {
        
        res.render('login', { data: null });
    }
});

//post login


app.post('/login', async (req, res) => {
    try {
    
        const db = await getDatabase();
        const collection = db.collection('cred');
        const cred = await collection.findOne({ email: req.body.username });

        if (cred && cred.password == req.body.password) {
          
            usernameBlog = cred.name;
            if (cred.email == 'admin@admin') {
                  req.session.loggedIn=true;
                  req.session.userId=cred.email;
                const users = await collection.find({}).toArray();
                  res.render('adminhome', { users: users });
                
               
            } else {
                req.session.loggedIn=true;
                req.session.userId=cred.email;
                useremail = cred.email;
                username = cred.name;
                const blogs = await getBlog(useremail);
              

          
                    res.render('usershome', { users: cred, blogs: blogs });
                
            }
        } else {
            res.render('login',{data:"invalid credentials"})
        }
    } catch (err) {
        console.log(err);
    }
});


//admin Home

app.get('/adminhome',async(req,res)=>{

    try{

        const db = await getDatabase();
        const collection = db.collection('cred');
        const users = await collection.find({}).toArray();
          if(req.session.loggedIn)
         {
        
         res.render('adminhome', { users: users });
         }
         else
        {
        res.render('/login',{data:null})
         }
       
    }
    catch(err){
        console.log(err);

    }
})


//admin page for  viewing user data


app.get('/adminuserdata/:id', async (req, res) => {

    try{

        useremail=req.params.id;
        const blogs = await getBlog();

         if(req.session.loggedIn)
         {
        
         res.render('adminuserdata', {  blogs: blogs });
         }
         else
        {
        res.render('/login',{data:null})
         }

      
       

    }
    catch(err){
        console.log(err);

    }
})








app.post('/createblog', async (req, res) => {
    try {
       
        const db = await getDatabaseBlog();
        const collection = db.collection('blogs');

       
     

        const index = await collection.countDocuments();
        await collection.createIndex({ heading: index+1 });

        await collection.insertOne({
            heading: req.body.heading,
            blog: req.body.blog,
            email: useremail,
            index: index
        });

        
        const blogs = await getBlog();

         if(req.session.loggedIn)
         {
        
        res.render('usershome', { users: {name:username}, blogs: blogs })
         }
         else
        {
        res.render('/login',{data:null})
         }

       
    } catch (err) {
        console.log(err);
    }
});


//updating blogs

app.post('/:id', async (req, res) => {
   
    const id = req.params.id;
  

    const updates = {
        heading: req.body.title,
        blog: req.body.blog,
        email: useremail
    }

    try {
        const db = await getDatabaseBlog();
        const collection = db.collection('blogs');

        

        await collection.updateOne({ _id:new ObjectId(id) }, { $set: updates });
        const blogs = await getBlog();
        if(req.session.loggedIn)
         {
         res.render('usershome', { users: { name: username }, blogs: blogs });
         }
         else
        {
        res.render('/login',{data:null})
         }

        
    }
    catch (err) {
        console.log(err);
    }
});


//admin credential update

app.post('/credupdate/:id', async (req, res) => {

    const id = req.params.id;
    const update ={
        name :req.body.name,
        email :req.body.email,
        password:req.body.password
    }
    const db = await getDatabase();
    const collection = db.collection('cred');
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
    const users = await collection.find({}).toArray();
      if(req.session.loggedIn)
         {
           res.render('adminhome', { users: users });
         }
         else
        {
        res.render('/login',{data:null})
         }
   
})



// delete user blogs 


app.post('/deleteuser/:id', async (req, res) => {
    const id = req.params.id


    try {
        const db = await getDatabaseBlog();
        const collection = db.collection('blogs');



        await collection.deleteOne({ _id: new ObjectId(id) });
        const blogs = await getBlog();
       
       

        
         if(req.session.loggedIn)
         {
          res.render('usershome', { users :{name :username},blogs: blogs });
         }
         else
        {
        res.render('/login',{data:null})
         }
         }
         catch (err) {
        console.log(err);
        }
});


//admin delete blogs 

app.post('/deleteuseradmin/:id',  async (req, res) => {
    const id = req.params.id


    try {
        const db = await getDatabaseBlog();
        const collection = db.collection('blogs');



        await collection.deleteOne({ _id: new ObjectId(id) });
        const blogs = await getBlog();
        
      if(req.session.loggedIn)
    {
      res.render('adminuserdata', { blogs: blogs });
    }
    else
    {
        res.render('/login',{data:null})
    }

        
        
    }
    catch (err) {
        console.log(err);
    }
});


//admin credential delete

app.post('/deleteadmin/:id', async (req, res) => {
    const id = req.params.id
    
 

    try {
        const db = await getDatabase();
        const collection = db.collection('cred');
       

        await collection.deleteOne({ _id: new ObjectId(id) });
        const users = await collection.find({}).toArray();

        
      
       

        
    if(req.session.loggedIn)
    {
        res.render('adminhome',{users:users});
    }
    else
    {
        res.render('/login',{data:null})
    }

       
    }
    catch (err) {
        console.log(err);
    }
});


//blog editing or updating

app.post('/update/:id', (req,res)=>{

    const id = req.params.id;
    if(req.session.loggedIn)
    {
        res.render('blogupdate',{id:id});
    }
    else
    {
        res.render('/login',{data:null})
    }
})


app.get('/adminupdate/:id', (req, res) => {

    const id = req.params.id
     if(req.session.loggedIn)
     {  
         res.render('adminupdate',{id:id});

     }
     else
     {
        res.render('/login',{data:null});
     }
   
})





//logout



app.get('/logout',(req,res)=>{
    

    req.session.loggedIn=false;
    req.session.userId=null;
    req.session.destroy( function (error){
       
        if(error)
        {
            console.log(err);

        }
        else
        {
            usernameBlog = null;
            
            res.render('login',{data:"logout successfully"});
        }
    })


});







app.listen(2000, () => console.log("started at 2000"));
