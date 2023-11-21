import { useEffect, useState } from "react";
import CardGroup from "../../components/CardGroup";
import Card from "../../components/Card";
import CategoriesApi from "../../api/category";
import H1 from "../../layout/H1/H1";
import '../Category/index.css'
import {useNavigate} from "react-router-dom";
import cone from '../../assets/cone-striped.svg';


const Home = ({ searchFilter }) => {
    const navigate = useNavigate();
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

    const handleEdit = (categoryId) => {
        navigate(`/category/${categoryId}/edit`);
    }

    return (
        <div className={'empty-div-own'}>
            {
                categories.length ?
                    <>
                        <H1 text={'Tipos de treinos'} />
                        <div className={'mx-auto'} style={{ width: 1200 }}>
                            <h3 className={'text-white'}>O mundo esportivo não é feito apenas de musculação ou exercícios aeróbicos, existem vários tipos de treinos que podem ser benéficos e bem-vindos na sua rotina esportiva.
                                Basta analisar quais as melhores opções e pedir suporte de um profissional qualificado para manter uma boa rotina de exercícios, de acordo com os seus objetivos.
                                <br/>Confira abaixo alguns tipos de treinos</h3>
                        </div>
                        <CardGroup>
                            {categories.map((category) => (
                                <Card handleEdit={() => handleEdit(category.id)} handleDelete={async () => await handleDelete(category.id)} key={category.id} item={category} to={`/category/${category.id}`}/>
                            ))}
                        </CardGroup>
                    </>
                :
                    <>
                        <img className={'cone-own'} src={cone} alt=""/>
                        <p className={'empty-message'}>Não foi adicionado nenhuma categoria</p>
                    </>
            }
        </div>
    );
};

export default Home;