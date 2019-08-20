import React from 'react'
import RoomsFilter from './RoomFilter'
import RoomsList from './RoomList'
import {withRoomConsumer} from '../context';
import Loading from './Loading'

function RoomContainer({context}) {
    const {loading, sortedRooms, rooms } = context;

    if(loading) {                 // Ovim uslovom provjeravamo da li je učitavanje uspješno tj. da li su podaci tu
        return <Loading/>
        }
       return (
       <>
       <RoomsFilter rooms = {rooms}/>
       <RoomsList rooms = {sortedRooms}/>
   </>
       );   
}      


export default withRoomConsumer(RoomContainer)


/*
// OVO  JE PRIMJER KAKO MOŽEMO DA ODRADIMO, SA VRIJEDNOSTIMA 
// MI KORISTIMO U NAŠEM PRIMJERU HIHJER ORDER COMPONENTS JER JE LAKŠE

import React from 'react'
import RoomsFilter from './RoomFilter'
import RoomsList from './RoomList'
import {RoomConsumer} from '../context'
import Loading from './Loading'

export default function RoomContainter() {
    return (
        <RoomConsumer>
            {

                (value) => {                                     // Value je argument, ovo je funkcija ustvari, moramo mu pristupiti i vratit vrijednost
                    const {loading, sortedRooms, rooms} = value // Destrukturiranje objekta, izvlačenje vrijednosti

                    if(loading) {                 // Ovim uslovom provjeravamo da li je učitavanje uspješno tj. da li su podaci tu
                     return <Loading/>
                     }
                    return (
                    <div>
                    Hello from rooms Container
                    <RoomsFilter rooms = {rooms}/>
                    <RoomsList rooms = {sortedRooms}/>
                </div>
            );
                }
            }


        </RoomConsumer>
    );
}

*/

