import {Ad, AdRecordResult, AdSafeReturn} from "../types";
import {database} from "../utils/database";
import {ValidationError} from "../utils/handleError";
import {v4 as uuid} from 'uuid';
import nodemailer from 'nodemailer';
import {config} from "../config/config";


interface NewAd extends Omit<Ad, 'id'> {
    id?: string;
}


export class AdRecord implements Ad {
    id: string;
    name: string;
    description: string;
    price: number;
    link: string;
    lat: number;
    lon: number;
    visitors: number;

    constructor(obj: NewAd) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa nie może być pusta oraz nie może mieć więcej niż 100 znaków!')
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Opis nie może być dłuższy niż 1000 znaków!')
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Wartość produktu nie może być mniejsza niż 0 i większa od 9.999.999')
        }

        if (!obj.link || obj.link.length < 10) {
            throw new ValidationError('Link ogłoszenia jest niepoprawny lub nie istnieje')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.link = obj.link;
        this.visitors = obj.visitors;
    }

    static async getAll(): Promise<AdRecord[]> {
        const [allAds] = await database.execute('SELECT * FROM `ad` WHERE `accepted` = 1') as AdRecordResult;
        return allAds.map((obj) => new AdRecord(obj));
    }


    static async getOneAd(id: string): Promise<AdRecord> | null {
        await database.execute('UPDATE `ad` SET `visitors` = visitors + 1 WHERE `id` = :id', {id});
        const [getOne] = await database.execute('SELECT * FROM `ad` WHERE `id` = :id', {id}) as AdRecordResult;
        return getOne.length === 0 ? null : new AdRecord(getOne[0]);
    }

    async add(): Promise<{ id: string}> {

        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('UUID already exists in DB. Rejected request.');
        }

        try {
            await database.execute('INSERT INTO `ad` (id, name, description, price, lat, lon, link) VALUES (:id, :name, :description, :price, :lat, :lon, :link)', {
                id: this.id,
                name: this.name,
                description: this.description,
                price: this.price,
                lat: this.lat,
                lon: this.lon,
                link: this.link,
            });
            const output = `
                   <a href="${config.cors}api/ad/admin/accepted/${this.id}">Link do akceptacji!</a>
                    `;
                let transporter = nodemailer.createTransport({
                    host: process.env.GMAIL,
                    port: 587,
                    secure: false   ,
                    auth: {
                        user: process.env.GMAIL,
                        pass: process.env.PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                await transporter.sendMail({
                    from: '"Ad"',
                    to: process.env.GMAIL,
                    text: "Ad",
                    html: output
                });
            return {
                id: this.id
            };
        } catch (e) {
            throw new Error(e.message)
        }

    }

    static async findInterestedAd(text: string): Promise<AdSafeReturn[]> | null {
        const [getAllInterested] = await database.execute('SELECT * FROM `ad` WHERE `accepted` = 1 AND `name` LIKE :text', {
            text: `%${text}%`
        }) as AdRecordResult;
        return getAllInterested.length === 0 ? null : getAllInterested.map((obj: AdSafeReturn) => {
            const {lat, lon, id, visitors} = obj;
            return {
                id,
                lat,
                lon,
                visitors,
            }
        });
    };

    static async acceptAd(id: string): Promise<void> {
        await database.execute('UPDATE `ad` SET `accepted` = 1 WHERE `id` = :id', {id});
    };
}




