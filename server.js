
let weather = {
    "apikey":config.API_KEY,
    fetchaqi:function (city,state,country) {
        fetch("http://api.airvisual.com/v2/city?city="+city+"&state="+state+"&country="+country+"&key="+this.apikey)
        .then((res) => res.json())
        .then((res) => this.display(res.data));
    },
    display:function(data){
        const {aqius}=data.current.pollution;
        const {mainus}=data.current.pollution;
        console.log(mainus);
        console.log(aqius);
        document.querySelector('.aq').innerHTML=aqius;
        if (0<=aqius && aqius<=50) 
        {
            document.getElementById('display').style.backgroundColor="green";
            document.querySelector('.level').innerHTML="Good";
        } 
        else if(51<=aqius && aqius<=100)
        {
            document.getElementById('display').style.backgroundColor="yellow";
            document.querySelector('.level').innerHTML="Moderate";
        }
        else if(101<=aqius && aqius<=150)
        {
            document.getElementById('display').style.backgroundColor="orange";
            document.querySelector('.level').innerHTML="Unhealthy and Sensitive Groups";
        }
        else if(151<=aqius && aqius<=200)
        {
            document.getElementById('display').style.backgroundColor="red";
            document.querySelector('.level').innerHTML="Unhealthy";
        }
        else if(201<=aqius && aqius<=300)
        {
            document.getElementById('.display').style.backgroundColor="purple";
            document.querySelector('.level').innerHTML="Very Unhealthy";
        }
        else if(aqius>=301)
        {
            document.getElementById('.display').style.backgroundColor="maroon";
            document.querySelector('.level').innerHTML="Hazardous";
        }
    },
    search:function (){
        this.fetchaqi(document.querySelector(".city").value,document.querySelector(".state").value,document.querySelector(".country").value)
    }
}

document.querySelector('.search-btn').addEventListener("click",function (){
    document.querySelector('.aq').style.display="block";
    weather.search();
})

// pollotants

var latval;
var lonval;

apiid=config.API_ID;

const getUserLocation =()=>{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(onPositionGather,onPositionError);
    } else {
        
        onPositionError({message:"Can't access location."})
    }
}

const onPositionGather = (pos)=>{
    let lat=pos.coords.latitude.toFixed(4);
    let lon=pos.coords.longitude.toFixed(4);
    latval=lat;
    lonval=lon;
    getAirquality(lat,lon);
}

const getAirquality = async (lat,lon)=>{
    const rawData = await fetch("http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat="+latval+"&lon="+lonval+"&appid="+apiid)
    const airdata=await rawData.json();

    console.log(airdata);
    setvalue(airdata);
}

const setvalue = (airdata)=>{
    const {co}=airdata.list[0].components;
    const {nh3}=airdata.list[0].components;
    const {no}=airdata.list[0].components;
    const {no2}=airdata.list[0].components;
    const {o3}=airdata.list[0].components;
    const {pm2_5}=airdata.list[0].components;
    const {pm10}=airdata.list[0].components;
    const {so2}=airdata.list[0].components;

    document.querySelector('.o3').innerHTML=o3+" μg/mᶟ";
    document.querySelector('.co').innerHTML=co+" μg/mᶟ";
    document.querySelector('.no2').innerHTML=no2+" μg/mᶟ";
    document.querySelector('.pm2').innerHTML=pm2_5+" μg/mᶟ";
    document.querySelector('.so2').innerHTML=so2+" μg/mᶟ";
    
}


const onPositionError = (e)=>{
    errorLabel.innerHTML=e.message
}

getUserLocation();