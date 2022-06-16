import {Router} from "express";
import {AdRecord} from "../records/ad-record";
import {config} from "../config/config";


export const add = Router();

add
    .get('/', async (req, res) => {
        const all = await AdRecord.getAll();

        res.json(all);
    })
    .post('/', async (req, res) => {
        const {name, description, price, lat, lon, link, visitors} = req.body;
        const data = {
            name,
            description,
            price,
            lat,
            lon,
            link,
            visitors
        };
        const newAdRecord = await new AdRecord(data);
        const {id} = await newAdRecord.add();
        res.json({'adID': id});
    })
    .get('/admin/accepted/:id', async (req, res) => {
        const {id} = req.params;
        await AdRecord.acceptAd(id);
        res.status(200).redirect(`${config.cors}`);
    })

    .get('/search/:text?', async (req, res) => {
        const {text} = req.params;
        const filter = await AdRecord.findInterestedAd(text ?? '');
        res.status(200).json(filter);
    })

    .get('/:id', async (req, res) => {
        const {id} = req.params;
        const oneAd = await AdRecord.getOneAd(id);
        res.status(200).json(oneAd);
    })

