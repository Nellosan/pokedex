import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPokemons } from '../redux/slices/pokemon';
import { Card, Col, Descriptions, Divider, Row, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import '../styles/home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: pokemons, status } = useSelector((state: RootState) => state.pokemon);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemons());
        }
    }, [dispatch, status]);

    return (
        <div className="homepage-container">
            <Title level={1}>Pokédex</Title>

            <Divider />

            {status === 'fetching' && <Paragraph>Chargement...</Paragraph>}
            {status === 'error' && <Paragraph>Erreur de récupération des Pokémons.</Paragraph>}

            <Row gutter={[16, 16]}>
                {pokemons.map(pokemon => (
                    <Col xs={24} sm={12} md={12} lg={6} key={pokemon.id}>
                        <Link to={`/pokedex/${pokemon.id}`}>
                            <Card hoverable className="pokemon-detail-card" title={pokemon.name} cover={(
                                <div className='pokemon-detail-cover'>
                                    <img alt={pokemon.name} src={pokemon.sprites.official_artwork} />
                                    <Divider />
                                </div>
                            )}>
                                <Descriptions bordered column={1}>
                                    <Descriptions.Item label="Numéro">#{pokemon.id}</Descriptions.Item>
                                    <Descriptions.Item label="Taille">{pokemon.height} dm</Descriptions.Item>
                                    <Descriptions.Item label="Poids">{pokemon.weight} hg</Descriptions.Item>
                                    <Descriptions.Item label="Types">
                                        {pokemon.types.map((type) => (
                                            <Tag className={"type-tag " + type.name} key={type.name}>{type.name}</Tag>
                                        ))}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
