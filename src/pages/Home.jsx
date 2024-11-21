import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);
    console.log('redux ', categoryId);


    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    // const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setsortType] = React.useState({ name: 'популярности', sort: 'rating' });

    const onChangeCategory = (id) => {
        console.log("ВОТ ЭТО", setCategoryId(id));
    };

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.sort;
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&title=*${searchValue}` : '';

        fetch(`https://22a7cf6dea078a8a.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}`,
        ).then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json)
            setItems(json?.items || json)
            setIsLoading(false)
        })
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    return (
        <><div className="content__top">
            <Categories value={categoryId} onClickCategory={onChangeCategory} />
            <Sort value={sortType} onChangeSort={(id) => setsortType(id)} />
        </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(3)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => (
                    <PizzaBlock {...obj} />
                ))}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </>

    )
}

export default Home;