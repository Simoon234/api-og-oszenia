import {FieldPacket} from "mysql2";
import {AdRecord} from "../../records/ad-record";

export type AdRecordResult = [AdRecord[], FieldPacket[]];
