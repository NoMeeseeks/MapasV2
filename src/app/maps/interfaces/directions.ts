export interface DirectionsResponse {
    routes: Route[];
    waypoints: Waypoint[];
    code: string;
    uuid: string;
}

export interface Route {
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
    legs: Leg[];
    geometry: Geometry;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type: GeometryType;
}

export enum GeometryType {
    LineString = "LineString",
}

export interface Leg {
    via_waypoints: any[];
    admins: Admin[];
    weight: number;
    duration: number;
    steps: Step[];
    distance: number;
    summary: string;
}

export interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1: string;
}

export interface Step {
    intersections: Intersection[];
    maneuver: Maneuver;
    name: string;
    duration: number;
    distance: number;
    driving_side: DrivingSide;
    weight: number;
    mode: Mode;
    geometry: Geometry;
    destinations?: string;
    ref?: string;
    pronunciation?: string;
}

export enum DrivingSide {
    Left = "left",
    Right = "right",
    Straight = "straight",
}

export interface Intersection {
    classes?: ClassElement[];
    bearings: number[];
    entry: boolean[];
    mapbox_streets_v8?: MapboxStreetsV8;
    is_urban?: boolean;
    admin_index: number;
    out?: number;
    geometry_index: number;
    location: number[];
    in?: number;
    duration?: number;
    turn_weight?: number;
    turn_duration?: number;
    weight?: number;
    lanes?: Lane[];
    traffic_signal?: boolean;
    railway_crossing?: boolean;
    toll_collection?: TollCollection;
    stop_sign?: boolean;
}

export enum ClassElement {
    Motorway = "motorway",
    Restricted = "restricted",
    Toll = "toll",
    Tunnel = "tunnel",
}

export interface Lane {
    indications: DrivingSide[];
    valid: boolean;
    active: boolean;
    valid_indication?: DrivingSide;
}

export interface MapboxStreetsV8 {
    class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
    Motorway = "motorway",
    Primary = "primary",
    Secondary = "secondary",
    SecondaryLink = "secondary_link",
    Service = "service",
    Street = "street",
    Tertiary = "tertiary",
    TertiaryLink = "tertiary_link",
    Trunk = "trunk",
}

export interface TollCollection {
    type: string;
}

export interface Maneuver {
    type: ManeuverType;
    instruction: string;
    bearing_after: number;
    bearing_before: number;
    location: number[];
    modifier?: Modifier;
}

export enum Modifier {
    Left = "left",
    Right = "right",
    SlightRight = "slight right",
}

export enum ManeuverType {
    Arrive = "arrive",
    Depart = "depart",
    Turn = "turn",
}

export enum Mode {
    Driving = "driving",
}

export interface Waypoint {
    distance: number;
    name: string;
    location: number[];
}
