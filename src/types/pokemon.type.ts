interface Pokemon {
    id: number
    name: string
    order: number
    height: number
    weight: number
    stats: Array<{
        base_stat: number
        effort: number
        name: string
    }>
    types: Array<{
        slot: number
        name: string
    }>
    cries: {
        latest: string
        legacy: string
    }
    sprites: {
        back: string
        front: string
        official_artwork: string
    }
}

export default Pokemon;
