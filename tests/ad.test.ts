// import {AdRecord} from "../records/ad-record";
// import {database} from "../utils/database";
//
// const def = {
//     id: '38cb43b8-1b46-4a55-95ee-185826c7a06d',
//     name: 'test',
//     description: 'test description',
//     price: 22,
//     link: 'http://localhost:3123',
//     lat: 12.23123,
//     lon: 12.31312,
// }
//
//
// test('find on record in db', async () => {
//     const getOne = await AdRecord.getOneAd('38cb43b8-1b46-4a55-95ee-185826c7a06d');
//     expect(getOne).toBeDefined();
//     expect(getOne.id).toBe('38cb43b8-1b46-4a55-95ee-185826c7a06d');
// });
//
// test('if record return null test', async () => {
//     const getOne = await AdRecord.getOneAd('');
//
//     expect(getOne).toBeNull();
//     expect(getOne.id).toBe('38cb43b8-1b46-4a55-95ee-185826c7a06d');
//     expect(getOne.name).toBe('zabawaaa')
// })
//
//
// test('find all interested', async() => {
//     const getAllInterested = await AdRecord.findInterestedAd('zab');
//
//     expect(getAllInterested).toBeDefined();
//     expect(getAllInterested).not.toEqual([]);
//
// })
//
// test('check if return value are safe', async() => {
//     const getAllInterested = await AdRecord.findInterestedAd('zab');
//     expect(getAllInterested[0].id).toBeDefined();
//     expect(getAllInterested[0].lon).not.toBe('');
// })
