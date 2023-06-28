import React, {useEffect} from 'react';
import CardItem from "../component/CardItem.jsx";
import {useItem} from "../context/itemContext.jsx";
import {useAuth} from "../context/authContext.jsx";

const Home = () => {
    const {fetchItems} = useItem()
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const {items} = useItem()
    const renderedCardItems = items.map((item) => (
        <CardItem
            key={item.id}
            itemId={item.id}
            name={item.name}
            password={item.password}
            email={item.email}
        />
    ));

    return (
        <div className='mx-6 justify-center pt-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
            {renderedCardItems}
        </div>
    );
};

export default Home;
