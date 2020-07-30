import Location from "./Location";

export default interface Merchant {
    id: string;
    name: string;
    description: string;
    location: Location;
    tags: string[];
}
