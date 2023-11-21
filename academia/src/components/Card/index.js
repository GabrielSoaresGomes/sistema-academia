import "./index.css";
import {Link} from "react-router-dom";
import {useState} from "react";

import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Popconfirm } from 'antd';

const Card = ({item, handleDelete, to= ''}) => {

    const [imageUrl, setImageurl] = useState(item?.image);
    const onError = () => {
        const imageNotFoundUrl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
        setImageurl(imageNotFoundUrl);
    };

    return (
        <div className={"text-bg-dark"} style={{maxWidth: 540}}>
            <div className="card row g-0">
                <div className="col-md-4">
                    <img className={"img-fluid rounded-start image"} alt="..." src={imageUrl} onError={() => onError()}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <Link className={"link-info link-underline link-underline-opacity-0 p-0 m-0"} to={to}>
                            <p className={"fw-bold p-0 m-0"}>{item?.name}</p>
                        </Link>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className={"fst-italic"}>{item?.description?.split('\n')[0]}</p>
                    </div>
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
                <Button danger>Delete</Button>
            </Popconfirm>
        </div>
    );
}

export default Card;