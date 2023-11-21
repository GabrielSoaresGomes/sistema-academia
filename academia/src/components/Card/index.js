import "./index.css";
import {Link} from "react-router-dom";
import {useState} from "react";

import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Popconfirm } from 'antd';

const Card = ({item, handleDelete, handleEdit, to= ''}) => {

    const [imageUrl, setImageurl] = useState(item?.image);
    const onError = () => {
        const imageNotFoundUrl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
        setImageurl(imageNotFoundUrl);
    };

    return (
        <div className={"card-all-own"}>
            <div className={"card-own"}>
                <div className="card-img-own">
                    <img className={"img-own"} alt="..." src={imageUrl} onError={() => onError()}/>
                </div>
                <div className="card-own-info">
                    <div className="card-own-title">
                            <p className={"card-own-title-info"}>{item?.name}</p>
                    </div>
                    <hr/>
                    <div className={'card-own-description'}>
                        <p className={""}>{item?.description?.split('\n')[0]}</p>
                    </div>
                </div>
            </div>
            <div className={'read-more-own'}>
                <Link className={"link-own"} to={to}>
                    Saiba mais
                </Link>
            </div>
            <div className={'buttons-card-own'}>
                <button className={'editar-own'} onClick={handleEdit}>Editar</button>

                <Popconfirm
                    title="Deletar"
                    description="Deseja realmente deletar?"
                    onConfirm={handleDelete}
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                >
                    <button className={'deletar-own'}>Deletar</button>
                </Popconfirm>
            </div>

        </div>
    );
}

export default Card;