CREATE TABLE statistic
(
    id                          SERIAL CONSTRAINT statistic_pkey PRIMARY KEY,
    ticket_uid                  UUID         NOT NULL,
    flight_uid                  UUID         NOT NULL,
    user_uid                    UUID         NOT NULL
);
