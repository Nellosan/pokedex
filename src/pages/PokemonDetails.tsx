import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Divider, Flex, Image, Progress, Splitter, Table, Tag } from 'antd';
import { RootState } from '../redux/store';
import Title from 'antd/es/typography/Title';
import '../styles/pokemonDetails.scss';

const PokemonDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { list: pokemons, status } = useSelector((state: RootState) => state.pokemon);

    if (!id || status !== 'success' || pokemons.length === 0) {
        return <Navigate to='/pokedex' replace />;
    }

    const pokemon = pokemons.find(pokemon => pokemon.id === +id);

    const playCry = () => {
        const audio = new Audio(pokemon?.cries.latest);
        audio.play();
    };

    return (
        <div className="detail-container">
            <Flex wrap="wrap" gap={20} align='center'>
                <Button onClick={() => navigate('/pokedex')} type='primary'>Retour au Pokédex</Button>
                <Title level={1}>Fiche détaillée du Pokémon</Title>
            </Flex>

            <Card styles={{ body: { padding: "0" }}} title={
                <Flex gap={20} wrap="wrap">
                    <Title className='pokemon-detail-title' level={2}>#{String(pokemon?.id).padStart(3, '0')} — {pokemon?.name}</Title>
                    <Flex wrap="wrap" className='pokemon-detail-tags' align='center'>
                        {pokemon?.types.map(type => (<Tag className={"type-tag " + type.name} key={type.name}>{type.name}</Tag>))}
                    </Flex>
                </Flex>
            }>
                <Splitter>
                    <Splitter.Panel defaultSize={400} min={200}>
                        <Flex wrap="wrap" className='pokemon-detail-cover' align='center' vertical>
                            <Image width={200} alt={pokemon?.name} src={pokemon?.sprites.official_artwork} />
                            <Button className='pokemon-cry-button' type='default' onClick={playCry}>Jouer le cri</Button>
                            <Divider style={{ margin: 0 }} />
                            <Flex wrap="wrap" align='center'>
                                <Image loading='lazy' preview={false} width={100} src={pokemon?.sprites.front} />
                                <Image loading='lazy' preview={false} width={100} src={pokemon?.sprites.back} />
                            </Flex>
                        </Flex>
                    </Splitter.Panel>
                    <Splitter.Panel min={400}>
                        <Table
                            className='pokemon-detail-table'
                            size='small'
                            caption={<Title level={5}>Statistiques de base</Title>}
                            showHeader={false}
                            pagination={false}
                            dataSource={
                                pokemon?.stats.map((stat, key) => ({
                                    key,
                                    name: stat.name.toUpperCase(),
                                    value: (<Flex gap={10}>
                                            <Progress percent={Math.round((stat.base_stat / 150) * 100)} showInfo={false} status="active" />
                                            {stat.base_stat}
                                        </Flex>)
                                })
                            )}
                            columns={[
                                {
                                    dataIndex: 'name',
                                    key: 'name',
                                    width: 200,
                                },
                                {
                                    dataIndex: 'value',
                                    key: 'value',
                                }
                            ]}
                        />
                    </Splitter.Panel>
                    <Splitter.Panel min={200}>
                        <Table
                            className='pokemon-detail-table'
                            size='small'
                            caption={<Title level={5}>Caractéristiques</Title>}
                            showHeader={false}
                            pagination={false}
                            dataSource={[
                                {
                                    key: 'height',
                                    name: 'Hauteur',
                                    value: `${pokemon?.height} dm`
                                },
                                {
                                    key: 'weight',
                                    name: 'Poids',
                                    value: `${pokemon?.weight} hg`
                                }
                            ]}
                            columns={[
                                {
                                    dataIndex: 'name',
                                    key: 'name',
                                    width: 100,
                                },
                                {
                                    dataIndex: 'value',
                                    key: 'value',
                                }
                            ]}
                        />  
                    </Splitter.Panel>
                </Splitter>
            </Card>
        </div>
    );
};

export default PokemonDetails;
