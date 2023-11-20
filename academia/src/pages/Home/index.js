import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import CategoriesApi from "../../api/categorias";
import H1 from "../../layout/H1/H1";

const Home = ({ searchFilter }) => {
    const [filter, setFilter] = useState(searchFilter);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        searchFilter ? setFilter(searchFilter.trim()) : setFilter('');
    }, [searchFilter]);

    useEffect(() => {
        const categoriesApi = CategoriesApi.getInstance();
        const categoriesData = categoriesApi.getAllExercises();
        if (categoriesData?.length) {
            const filteredCategoriesData = categoriesData.filter((exercise) =>
                exercise.title.includes(filter)
            );
            setCategories(filteredCategoriesData);
        }
    }, [filter]);

    return (
        <div>
            <H1 text={'Treinos'} />
            <CardGroup>
                {categories.map((categories) => (
                    <Card key={categories.id} categorie={categories}/>
                ))}
            </CardGroup>
        </div>
    );
};

export default Home;