CREATE TABLE person (
    id serial primary key,
    added timestamp DEFAULT now(),
    data jsonb
);

CREATE UNIQUE INDEX person_data_name_idx ON public.person USING btree (((data ->> 'name'::text)));
