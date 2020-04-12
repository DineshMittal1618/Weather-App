const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geoCode=require('./utils/geocode');
const forecast=require('./utils/forecast')
const app=express();

const pathName=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')

app.use(express.static(pathName));

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{

    res.render('index',{
        Title:'Weather App',
        Name:'Dinesh Mittal'
    })

})

app.get('/help',(req,res)=>{
    
    res.render('help',{
        Title:'help',
        Help:'This is the help page',
        Name:'Dinesh Mittal'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        Title:'About',
        Name:'Dinesh Mittal'
    })
})


app.get('/temp',(req,res)=>{
    
    res.render('temp')
        
})

app.get('/fileupload',(req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.fileToUpload;
      console.log(files.fileToUpload);
      var newpath = 'C:/Users/Lenovo/Desktop/Learn Node/CC project/upload/'+files.fileToUpload;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
    }
      )
})})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please specify the address'
        })
    }

    geoCode.geoCode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            return    res.send(error);
        }

        forecast.forecast(latitude,longitude,(error,body)=>{
            if(error)
            {
                return res.send(error);
            }
            res.send(body);
        })

    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help Aricle Not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server started on port 3000');
})