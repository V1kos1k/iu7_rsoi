CREATE TABLE plane (
    id                          SERIAL CONSTRAINT plane_pkey PRIMARY KEY,
    plane_code                  VARCHAR(10)      NOT NULL CONSTRAINT idx_plane_code UNIQUE,
    plane_model                 VARCHAR(255) NOT NULL,
    plane_row_count             INTEGER      NOT NULL,
    plane_column_count          INTEGER      NOT NULL,  -- имеется ввиду не количество мест в ряду, а соличество колонн разделенных проходом
    designation_seats_in_row    VARCHAR(10)  NOT NULL,
    plane_seats_count           INTEGER      NOT NULL
);

CREATE TABLE flight
(
    id                          SERIAL CONSTRAINT flight_pkey PRIMARY KEY,
    flight_uid                  UUID         NOT NULL CONSTRAINT idx_flight_uid UNIQUE,
    flight_number               VARCHAR(255),
    airport_departure_uid       UUID         NOT NULL,
    airport_arrival_uid         UUID         NOT NULL,
    flight_timestamp            TIMESTAMP    NOT NULL,
    flight_duration             TIME         NOT NULL,
    flight_miles                INTEGER      NOT NULL,
    flight_status               VARCHAR(255) NOT NULL,
    flight_free_seats_count     INTEGER,
    plane_code                  VARCHAR(10) CONSTRAINT fk_flight_plane_code REFERENCES plane (plane_code),
    airline                     VARCHAR(255)
);

CREATE TABLE seats (
    id                          SERIAL CONSTRAINT seats_pkey PRIMARY KEY,
    seat_no                     VARCHAR(4) NOT NULL,
    seat_status                 VARCHAR(255) NOT NULL,
    flight_uid                  UUID CONSTRAINT fk_flight_seats_uid REFERENCES flight (flight_uid),
    plane_code                  VARCHAR(10) CONSTRAINT fk_seats_plane_code REFERENCES plane (plane_code)
);

INSERT INTO plane (plane_code, 
                    plane_model, 
                    plane_row_count, 
                    plane_column_count, 
                    designation_seats_in_row, 
                    plane_seats_count)
VALUES ('73M', 
        'Boeing 737', 
        29, 
        2, 
        'ABCHJK', 
        174);

-- INSERT INTO flight (flight_uid, 
--                     flight_number, 
--                     airport_departure_uid, 
--                     airport_arrival_uid, 
--                     flight_timestamp, 
--                     flight_duration,
--                     flight_miles,
--                     flight_status,
--                     flight_free_seats_count,
--                     plane_code,
--                     airline)
-- VALUES ('55555b55-e5d5-5bd5-b5bb-555b55ab5cf5',  -- flight_uid
--         'SBI1011',                               -- flight_number
--         'eab38487-9ad9-4a46-ab64-3441a4ad1c40',  -- airport_departure_uid от домодедово
--         '60950b52-e4d1-4bd5-b4bb-689b25ab8cf8',  -- airport_arrival_uid до пулково
--         '2021-10-19 10:23:54',                   -- flight_timestamp
--         '01:35',                                 -- flight_duration
--         415,                                     -- flight_miles
--         'Выкл',                                  -- flight_status
--         174,                                     -- flight_free_seats_count
--         '73M',                                   -- plane_code
--         'United Airlines');                      -- airline

