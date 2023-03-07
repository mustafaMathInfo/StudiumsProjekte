export const fetchList = (url, setProducts, setTotalPages) => {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((recipe) => {
        const totalPages = recipe.totalPages ? recipe.totalPages : 1;
        const products = recipe.content ? recipe.content : recipe;
        setProducts(products);
        if (setTotalPages)setTotalPages(totalPages);
    }).catch((err) => {
        alert(err)
    })
}