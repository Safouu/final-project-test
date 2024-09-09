
import Objects from './Objects';

const Home = () => {
return (
<div className='home'>
  <div className='top'>
    <h1>Your Dream Vocation</h1>
    {/* <h1>PAUSE</h1> */}
    <img src="./public/images/Villa-Indigo.jpg" alt="airplane" />
   {/* <video autoPlay loop muted>
      <source src="./public/images/video.mp4" type="video/mp4" />
    </video> */}
    
    </div>
    <div className="video-background">
     {/* <video autoPlay loop muted>
      <source src="./public/images/blue-sky-mowe.mp4" type="video/mp4" />
     
    </video>  */}
  </div>
      
<Objects/>

</div>
);
};

export default Home;


