CREATE TABLE person (
    id serial primary key,
    data jsonb,
    added timestamp without time zone DEFAULT now()
);

COPY person (id, data, added) FROM stdin;
1	{"name": "John Smith", "color": "blue", "catdog": "dog"}	2019-02-15 15:26:49.106121
2	{"name": "Joe Doe", "color": "red", "catdog": "cat"}	2019-02-15 15:27:05.5523
\.

CREATE UNIQUE INDEX person_data_name_idx ON public.person USING btree (((data ->> 'name'::text)));
