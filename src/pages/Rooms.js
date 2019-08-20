import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import RoomContainer from '../components/RoomContainter'


const Rooms = () => {
    return(
        <>
     <Hero hero="roomsHero">

    <Banner title ="Our rooms">

        <Link to='/' className="btn-primary"> 
        return home
        </Link>
    </Banner>

    </Hero> 
    <RoomContainer/>

    </> // Kreiranje sa otvorenim tagovima fragmenta, na ovaj način rendering će biti ispravan

    );
        
        
};

export default Rooms
