import React from 'react';



function Categories({ value, onClickCategory }) {
    const [activeCategory, setactiveCategory] = React.useState();

    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((element, index) => {
                        return <li onClick={() => onClickCategory(index)} className={value === index ? "active" : ""}>{element}</li>
                    })
                }
            </ul>
        </div>
    );
}

export default Categories;