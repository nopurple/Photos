import React, {useEffect, useState} from 'react';
import {Collection} from './Collection';
import './index.scss';

const cats = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}]

function App() {

    const [categoryId, setCategoryId] = useState(0)
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [collections, setCollections] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearch = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        setIsLoading(true);

const category = categoryId ? `category=${categoryId}` : ``;

        fetch(`https://635f21e33e8f65f283ace381.mockapi.io/collections?page=${page}&${category}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json)
            })
            .catch((error) => {
                console.warn(error);
                alert('error when we give date')
            }).finally(() =>{setIsLoading(false)});
    }, [categoryId,page])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {cats.map((obj, index) =>
                        <li onClick={() => {
                            setCategoryId(index)
                        }}
                            className={categoryId === index ? 'active' : ''}
                            key={obj.name}>{obj.name}</li>)}
                </ul>
                <input value={searchValue} onChange={onChangeSearch} className="search-input"
                       placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {isLoading ? (
                    <h2>Wait.....</h2>
                ) : (
                    collections.filter((obj) =>
                        obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj, index) => (
                            <Collection
                                key={index}
                                name={obj.name}
                                images={obj.photos}
                            />
                        )))
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_, index ) =>
                        <li onClick={() => {setPage(index)}}
                            className={page === index ? 'active' : ''}>{index + 1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
