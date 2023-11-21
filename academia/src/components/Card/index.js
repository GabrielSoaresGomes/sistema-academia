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
                    <div>
                        <p className={""}>{item?.description?.split('\n')[0]}</p>
                    </div>

                    <Link className={"link-own"} to={to}>
                        Saiba mais
                    </Link>
                </div>
            </div>

            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleDelete}
                icon={
                    <QuestionCircleOutlined
                        style={{
                            color: 'red',
                        }}
                    />
                }
            >
                <Button danger>Deletar</Button>
            </Popconfirm>

            <Button onClick={handleEdit}>Editar</Button>
        </div>
    );
}

export default Card;