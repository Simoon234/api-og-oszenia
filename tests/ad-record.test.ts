// import {AdRecord} from "../records/ad-record";
//
//
// export const def = {
//     address: "krakowska 12",
//     price: 20,
//     name: 'sprzedam domek',
//     link: 'http://312jhqwjuhweoiheoiqwoeiqoweoqwe',
//     lon: 123123123,
//     lat: 2,
//     id: '1jhenqwe',
//     description: '1j231i23o123'
// };
//
// test('testowanie rokordu', () => {
//     const x = new AdRecord(def);
//
//     expect(x.lon).toBe(123123123)
// });
//
// test('błedy', () => {
//
//     expect(() => new AdRecord({
//         ...def,
//         price: -2,
//     })).toThrow('Wartość produktu nie może być mniejsza niż 0 i większa od 9.999.999');
// });
