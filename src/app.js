const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const hbs=require('hbs');
const path=require('path');
const express=require('express');

const app=express();

//setup path location for public and  
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../template/views');
const partialsPath=path.join(__dirname,'../template/partials')


//setting up handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));  

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Ripunjai',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Ripunjai'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title:'Help Page', 
       helpText:'This is help page. Help yourself',
       name:'Ripunjai'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address;
    if(!address){
        return res.send({
            error:'Please enter an address'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:'Unable to get weather details'
                })  
            }res.send({
                    weather_report:forecastData,
                    location:location
                })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'No such help article found',
        name:'Ripunjai'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'Ripunjai'
    })
})



app.listen(3000,()=>{
    console.log('application is up and running on port 3000');
})