import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sorts } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const currentPage = useSelector((state) => state.filter.currentPage);


    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortus = sorts.find((obj) => obj.sortProperty === params.sortProperty);
            dispatch(setFilters({
                ...params,
                sortus,
            }),
            );
        }
    }, []);

    React.useEffect(() => {
        setIsLoading(true)


        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&title=*${searchValue}` : '';
        axios.get(`https://22a7cf6dea078a8a.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}${search}`).then((res) => {
            setItems(res.data.items);
            setIsLoading(false);
        });

        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortType,
            categoryId,
            currentPage,
        });

        navigate(`?${queryString}`);
    }, [categoryId, sortType, currentPage]);
    return (
        <><div className="content__top">
            <Categories value={categoryId} onClickCategory={onChangeCategory} />
            <Sort />
        </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? [...new Array(3)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => (
                    <PizzaBlock {...obj} />
                ))}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>

    )
}

export default Home;