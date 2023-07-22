import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class AssetsService {

    private cities: string[];

    constructor() {
        (async () => {
            const data = await fs.promises.readFile(`./src/assets/cities.json`, "utf-8");
            this.cities = JSON.parse(Buffer.from(data).toString("utf8"));
        })();
    }

    getCities() {
        return this.cities;
    }

    getCityById(id: number) {
        return this.cities[id];
    }

}
