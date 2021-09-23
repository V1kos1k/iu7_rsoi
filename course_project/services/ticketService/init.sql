CREATE TABLE ticket
(
    id                          SERIAL CONSTRAINT flight_pkey PRIMARY KEY,
    ticket_uid                  UUID         NOT NULL CONSTRAINT idx_ticket_uid UNIQUE,
    flight_uid                  UUID         NOT NULL,
    user_uid                    UUID         NOT NULL,
    seat_no                     VARCHAR(4) NOT NULL
);

-- INSERT INTO ticket (ticket_uid, 
--                     flight_uid, 
--                     user_uid)
-- VALUES ('73M', 
--         'Boeing 737', 
--         29, 
--         2, 
--         'ABCHJK', 
--         174);
