import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPokemons } from '../redux/slices/pokemon';
import { Card, Col, Descriptions, Progress, Row, Tag, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import '../styles/home.scss';

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

            {status === 'fetching' && <Paragraph>Chargement...</Paragraph>}
            {status === 'error' && <Paragraph>Erreur de récupération des Pokémons.</Paragraph>}

            <Row gutter={[16, 16]}>
                {pokemons.map(pokemon => (
                    <Col xs={24} sm={12} md={8} lg={6} key={pokemon.id}>
                        <Card hoverable className="pokemon-detail-card" title={pokemon.name} cover={<img alt={pokemon.name} src={pokemon.sprites.official_artwork} />}>
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

                            <Typography>
                                <Title level={4}>Stats de base</Title>
                                {pokemon.stats.map((stat) => (
                                    <div key={stat.name} className='stat-bar'>
                                        <p className="stat-title">{stat.name.toUpperCase()}</p>
                                        <Progress percent={Math.round((stat.base_stat / 150) * 100)} status="active" />
                                    </div>
                                ))}
                            </Typography>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
