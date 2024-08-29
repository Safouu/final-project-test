
import Objects from './Objects';

const Home = () => {
return (
<div className='home'>
<div className='top'>
<video className='background-video' autoPlay muted loop>
<source src={'./images/video.mp4'} type='video/mp4' />
</video>
<div className='top-logo'>
</div>
<div className='top-text'>
World Wide Vacation
</div>
</div>
<Objects/>
</div>
);
};

export default Home;

