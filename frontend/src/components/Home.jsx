
import Objects from './Objects';

const Home = () => {
return (
<div className='home'>
  <div className='top'>
    <h1>Welcome to Dream Vocation</h1>
   <video autoPlay loop muted>
      <source src="./public/images/video.mp4" type="video/mp4" />
    </video>
    
    </div>
    <div className="video-background">
     <video autoPlay loop muted>
      <source src="./public/images/blue-sky-mowe.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> 
  </div>
      
<Objects/>

</div>
);
};

export default Home;


