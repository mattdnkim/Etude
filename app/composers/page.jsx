import { Card } from '../../components/card';

const composers = [
    {
        id: 'bach',
        name: 'Johann Sebastian Bach',
        period: 'Baroque',
        lifespan: '1685-1750',
        notableWorks: ['Brandenburg Concertos', 'Mass in B minor', 'The Well-Tempered Clavier'],
        image: '/images/bach.jpg'
    },
    {
        id: 'mozart',
        name: 'Wolfgang Amadeus Mozart',
        period: 'Classical',
        lifespan: '1756-1791',
        notableWorks: ['Symphony No. 40', 'The Magic Flute', 'Requiem'],
        image: '/images/mozart.jpg'
    },
    {
        id: 'beethoven',
        name: 'Ludwig van Beethoven',
        period: 'Classical/Romantic',
        lifespan: '1770-1827',
        notableWorks: ['Symphony No. 9', 'Moonlight Sonata', 'Fidelio'],
        image: '/images/beethoven.jpg'
    },
    {
        id: 'tchaikovsky',
        name: 'Pyotr Ilyich Tchaikovsky',
        period: 'Romantic',
        lifespan: '1840-1893',
        notableWorks: ['Swan Lake', 'The Nutcracker', '1812 Overture'],
        image: '/images/tchaikovsky.jpg'
    }
];

export default function ComposersPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1>Great Composers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {composers.map((composer) => (
                    <Card key={composer.id} className="hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                <img
                                    src={composer.image}
                                    alt={composer.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{composer.name}</h3>
                                <p className="text-gray-600">{composer.period} ({composer.lifespan})</p>
                                <div className="mt-2">
                                    <p className="text-sm font-medium">Notable Works:</p>
                                    <ul className="text-sm text-gray-600 list-disc list-inside">
                                        {composer.notableWorks.map((work, index) => (
                                            <li key={index}>{work}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
} 