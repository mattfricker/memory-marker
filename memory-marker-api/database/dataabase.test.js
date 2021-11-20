const db = require('./databaseFactory');
const { Marker, Topic} = require('./model');
const queryUtils = require('./queryUtils');

beforeAll(async () => {
    await db.sync({ force: true });
});

test('create topics', async () => {
    expect.assertions(1);
    const topic = await Topic.create({
        id: 7,
        name: 'The Topic',
        description: 'lorem ipsum'
    });
    expect(topic.id).toEqual(7);
});

test('create marker', async () => {
    expect.assertions(1);
    const marker = await Marker.create({
        id: 1,
        title: 'Random Marker Title',
        description: 'lorem ipsum',
        url: 'http://www.test.com'
    });
    expect(marker.id).toEqual(1);
});

test('create marker with topic', async () => {
    // expect.assertions(4);
    const topic = await Topic.create({
        id: 12,
        name: 'Another Topic',
        description: 'lorem ipsum'
    });
    let marker = await Marker.create({
        id: 2,
        title: 'Another Random Marker Title',
        description: 'lorem ipsum',
        url: 'http://www.test.com2',
    });
    expect(marker.id).toEqual(2);

    //Add in null and 17 (invalid)
    await queryUtils.addTopicsFromRequest(marker, [7, null, 12, 17]);
    marker = await Marker.findByPk(2, {include: Topic})

    expect(marker.Topics.length).toEqual(2);
    expect(marker.Topics[0].id).toEqual(7);
    expect(marker.Topics[1].id).toEqual(12);
});

test('get marker', async () => {
    expect.assertions(3);
    const marker = await Marker.findByPk(1);
    expect(marker.title).toEqual('Random Marker Title');
    expect(marker.description).toEqual('lorem ipsum');
    expect(marker.url).toEqual('http://www.test.com');
});

test('delete markers', async () => {
    expect.assertions(3);
    await Marker.destroy({
        where: {
            id: 1
        }
    });
    const markerOne = await Marker.findByPk(1);
    let markerTwo = await Marker.findByPk(2);
    expect(markerOne).toBeNull();
    expect(markerTwo.url).toBeDefined();

    await Marker.destroy({
        where: {
            id: 2
        }
    });
    markerTwo = await Marker.findByPk(2);
    expect(markerTwo).toBeNull();
});

afterAll(async () => {
    await db.close();
});