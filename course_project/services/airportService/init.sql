CREATE TABLE airport
(
    id            SERIAL CONSTRAINT airport_pkey PRIMARY KEY,
    airport_uid      UUID         NOT NULL CONSTRAINT idx_airport_item_uid UNIQUE,
    airport_name             VARCHAR(255) NOT NULL,
    airport_code             VARCHAR(4) NOT NULL,
    airport_location         VARCHAR(255) NOT NULL,
    airport_address          VARCHAR(255) NOT NULL,
    airport_webadress        VARCHAR(255) NOT NULL,
    airport_info             VARCHAR(255) NOT NULL
);

INSERT INTO airport (id, 
                    airport_uid, 
                    airport_name,
                    airport_code, 
                    airport_location, 
                    airport_address, 
                    airport_webadress, 
                    airport_info)
values ('1', 
        'eab38487-9ad9-4a46-ab64-3441a4ad1c40',
        'Домодедово', 
        'DME',
        'Москва', 
        'Россия, г. Санкт-Петербург, Пулковское шоссе, д.41, Лит. 3И', 'https://www.pulkovoairport.ru', 
        'Международный аэропорт, имеющий статус федерального значения, 
            располагающийся в 15 км от центра Санкт-Петербурга в Московском районе. Единственный аэропорт Санкт-Петербурга, 
            обслуживающий официальные рейсы.');

INSERT INTO airport (id, 
                    airport_uid, 
                    airport_name, 
                    airport_code,
                    airport_location, 
                    airport_address, 
                    airport_webadress, 
                    airport_info)
values ('2', 
        '60950b52-e4d1-4bd5-b4bb-689b25ab8cf8',
        'Пулково', 
        'LED',
        'Санкт-Петербург', 
        'Россия, г. Санкт-Петербург, Пулковское шоссе, д.41, Лит. 3И', 'https://www.pulkovoairport.ru', 
        'Международный аэропорт, имеющий статус федерального значения, 
            располагающийся в 15 км от центра Санкт-Петербурга в Московском районе. Единственный аэропорт Санкт-Петербурга, 
            обслуживающий официальные рейсы.');