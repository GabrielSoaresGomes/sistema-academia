import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import CategoriesApi from "../../api/category";
import H1 from "../../layout/H1/H1";

const Home = ({ searchFilter }) => {
    const [filter, setFilter] = useState(searchFilter);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        searchFilter ? setFilter(searchFilter.trim()) : setFilter('');
    }, [searchFilter]);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesApi = CategoriesApi.getInstance();
            const categoriesData = await categoriesApi.getCategories();
            if (categoriesData?.length) {
                const filteredCategoriesData = categoriesData.filter((category) =>
                    category.name.includes(filter)
                );
                setCategories(filteredCategoriesData);
            }
        }
        fetchData();
    }, [filter]);

    return (
        <div>
            <H1 text={'Treinos'} />
            <CardGroup>
                {categories.map((category) => (
                    <Card key={category.id} item={category} to={`/category/${category.id}`}/>
                ))}
            </CardGroup>
        </div>
    );
};

export default Home;