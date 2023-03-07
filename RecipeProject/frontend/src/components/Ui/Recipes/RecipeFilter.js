import ListGroup from 'react-bootstrap/ListGroup';

function RecipeFilter(props) {

    const onFilterList = (item) => {
        let filteredList;
        if (item === "all") {
            filteredList = props.recipes;
        } else {
            const newList = props.recipes.filter(itemList => {
                return itemList.difficulty === item || itemList.category === item;
            });
            filteredList = newList;
        }
        return filteredList;
    }

    const onFilterHandler = (e) => {
        const filteredList = onFilterList(e.target.innerText);
        props.setFilteredList(filteredList)
    }

    return (
        <ListGroup className="mb-5">
            <h5>{props.name}</h5>
            {props.diffOrCateList.map((item) => (
                <ListGroup.Item key={item}
                                action
                                variant="secondary"
                                size="lg"
                                className=""
                                style={{width: '180px'}}
                                onClick={onFilterHandler}
                >{item}</ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default RecipeFilter;