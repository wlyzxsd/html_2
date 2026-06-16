import Image1 from './images/image47.jpg';
import Image2 from './images/image9.jpg';
import Image3 from './images/image57.jpg';
import Image4 from './images/image46.jpg';
import Image5 from './images/image55.jpg';
import Image6 from './images/image46.jpg';
import Image7 from './images/image42.jpg';
import Image8 from './images/image40.jpg';
import Image9 from './images/image9.jpg';
import Image10 from './images/image55.jpg';
import Image11 from './images/image57.jpg';

const structures = {
    gallery: [
        { 
            img: Image1, 
            title: 'Mercedes-Benz CLS-Class',
            description: 'Mercedes-Benz CLS-Class — это элегантный четырёхдверный купе, сочетающий в себе роскошь, динамику и передовые технологии. Оснащается мощными V6 и V8 двигателями.'
        },
        { 
            img: Image2, 
            title: 'BMW M4',
            description: 'BMW M4 — высокопроизводительное купе, разработанное подразделением BMW M. Оснащается 3.0-литровым рядным шестицилиндровым двигателем с twin-turbo.'
        },
        { 
            img: Image3, 
            title: 'Lamborghini Revuelto',
            description: 'Lamborghini Revuelto — гибридный суперкар, оснащённый 6.5-литровым V12 и тремя электромоторами. Мощность — 1015 л.с.'
        },
        { 
            img: Image4, 
            title: 'Koenigsegg CCXR',
            description: 'Koenigsegg CCXR — шведский суперкар, способный работать на биоэтаноле. Мощность достигает 1018 л.с.'
        },
        { 
            img: Image5, 
            title: 'Audi A4',
            description: 'Audi A4 — культовый седан с 2.0-литровым V4 twin-turbo мощностью 220 л.с.'
        },
        { 
            img: Image7, 
            title: 'Nissan Patrol',
            description: 'Nissan Patrol — один из самых мощных внедорожников своего времени, разгон до 100 км/ч за 3.9 секунды.'
        },
    ],

    circles: [
        { img: Image6, title: 'Koenigsegg CCXR', subtitle: 'V6' },
        { img: Image10, title: 'Audi A4', subtitle: 'V4 S55' },
        { img: Image11, title: 'Lamborghini Revuelto', subtitle: 'V12' },
    ],

    leftCards: [
        { img: Image8, title: 'Rossa', description: 'предназначен для соревнований классов GT2/GT3' },
        { img: Image9, title: 'BMW M4', description: 'предназначен для высокоскоростной езды' },
    ],

    rightCards: [
        { img: Image7, title: 'Nissan Patrol', description: 'предназначен для передвижения по бездорожью' },
        { img: Image1, title: 'Mercedes-AMG G 63', description: 'предназначен для передвижения по треку' },
    ],

    centerContent: {
        title: 'От первых двигателей к автомобилям будущего',
        description: 'Автомобильная промышленность прошла путь от паровых экипажей до современных электромобилей, отражая технологические возможности каждой эпохи. Появление автономного управления изменило представления о транспорте будущего. Сегодня интеллектуальные системы управления обеспечивают не только комфорт, но и безопасность на дорогах. Эта комплексная трансформация — от механики к электронике — наглядно демонстрирует прогресс человеческой мысли.',
    },
};

export default structures;