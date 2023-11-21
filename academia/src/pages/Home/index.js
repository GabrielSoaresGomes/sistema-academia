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
                if (filter) {
                    const filteredCategoriesData = categoriesData.filter((category) =>
                        category.name?.toLowerCase().includes(filter?.toLowerCase())
                    );
                    setCategories(filteredCategoriesData);
                } else {
                    setCategories(categoriesData);
                }

            }
        }
        fetchData();
    }, [filter]);

    const handleDelete = async (categoryId) => {
        const categoriesApi = CategoriesApi.getInstance();
        const deleteResponse = await categoriesApi.deleteCategoryById(categoryId);
        if (deleteResponse) {
            setCategories(categories.filter((category) => category.id !== categoryId));
        }
    }

    return (
        <div>
            <H1 text={'Treinos'} />
            <CardGroup>
                {categories.map((category) => (
                    <Card handleDelete={async () => await handleDelete(category.id)} key={category.id} item={category} to={`/category/${category.id}`}/>
                ))}
            </CardGroup>
        </div>
    );
};

export default Home;