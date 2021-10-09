const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create marker', async () => {
    expect.assertions(1);
    const marker = await db.Marker.create({
        id: 1,
        title: 'Random Marker Title',
        description: 'lorem ipsum',
        url: 'http://www.test.com'
    });
    expect(marker.id).toEqual(1);
});

test('get marker', async () => {
    expect.assertions(3);
    const marker = await db.Marker.findByPk(1);
    expect(marker.title).toEqual('Random Marker Title');
    expect(marker.description).toEqual('lorem ipsum');
    expect(marker.url).toEqual('http://www.test.com');
});

test('delete marker', async () => {
    expect.assertions(1);
    await db.Marker.destroy({
        where: {
            id: 1
        }
    });
    const marker = await db.Marker.findByPk(1);
    expect(marker).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});