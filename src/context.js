import React, { Component } from 'react'
// import items from './data';
import Client from './Contentful';
import { async } from 'q';


const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading: true,
        type:'all',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false

    };

    // getData
getData = async() => {
    try {
        let response = await Client.getEntries({
            content_type:"beachResortRoomExample",
            // order:"sys.createdAt" // Na osnovu ordera redamo sobe po nazivu
            order: "fields.price" //sortiranje na osnovu cijene
        });
        let rooms = this.formatData(response.items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size))
        this.setState({
            rooms, 
            featuredRooms, 
            sortedRooms:rooms, 
            loading:false,
            price:maxPrice,
            maxPrice,
            maxSize
        });
    } catch (error) {
        console.log(error);
        
    }
}



componentDidMount() {
    this.getData();

}

formatData(items) {
    let tempItems = items.map(item => {   // map metodom prolazimo kroz svaki item u data
        let id = item.sys.id              // ovo je objekat koji ima id i system file u data
        let images = item.fields.images.map(image => image.fields.file.url); // map metoda za prolazak kroz slike i opcije od slika
        let room = {...item.fields, images, id} // destrukturiranje objekta tj. uzimanje svih items-a kao i njihovih polja 
        return room;
    })
    return tempItems;
}

getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
}

handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ?target.checked : target.value
    const name = event.target.name;
    this.setState({
        [name]:value
    }, 
    this.filterRooms
    );
    

    // Pomoću console.log smo vidjeli naše vrijednosti kako se ispunjavaju
    // console.log(`this is type: ${type}, this is name: ${name}, this is value: ${value} `);
}

filterRooms = () => {
    let {
        rooms, type, capacity, price, minSize, maxSize, breakfast, pets
    } = this.state
// all the rooms
    let tempRooms = [...rooms];
// transform value
capacity = parseInt(capacity);
price = parseInt(price);

// filter by type
    if(type !== 'all') {
        tempRooms = tempRooms.filter(room => room.type === type)
    }

// filter by capacity
    if(capacity!==1) {
        tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

// filter by price
tempRooms = tempRooms.filter(room => room.price <= price);

// filter by size
tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

// filter by breakfast
if(breakfast) {
    tempRooms = tempRooms.filter(room => room.breakfast === true);
}

//filter by pets
if(pets) {
    tempRooms = tempRooms.filter(room => room.pets === true);
}
// change state
    this.setState({
        sortedRooms:tempRooms
    }) 
}

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange : this.handleChange}}>
            {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer (Component) {   // Ovo je higher order component tj. funkcija koja vraća drugu komponentu
    return function ConsumberWrapper(props) {     // Za drugi dio funkcije tj povratnu fukciju, tu ćemo raditi sa props 
        return <RoomConsumer>
            {value => <Component {...props} context = {value}/>}
        </RoomConsumer>
    }      
}


export {RoomProvider, RoomConsumer, RoomContext};