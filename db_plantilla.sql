--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.2

-- Started on 2023-07-20 08:58:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 51503)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nb_rol character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 51508)
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_rol_seq OWNER TO postgres;

--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;


--
-- TOC entry 216 (class 1259 OID 51521)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 51522)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass) NOT NULL,
    tx_clave character varying NOT NULL,
    user_name character varying NOT NULL,
    bl_status boolean DEFAULT false NOT NULL,
    rol smallint NOT NULL,
    ced_usuario integer NOT NULL,
    nomb_usuario character varying NOT NULL,
    ape_usuario character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 3178 (class 2604 OID 51533)
-- Name: roles id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);


--
-- TOC entry 3334 (class 0 OID 51503)
-- Dependencies: 214
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_rol, nb_rol) FROM stdin;
1	Administración
2	Inventario
\.


--
-- TOC entry 3337 (class 0 OID 51522)
-- Dependencies: 217
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, tx_clave, user_name, bl_status, rol, ced_usuario, nomb_usuario, ape_usuario, created_at, updated_at) FROM stdin;
49	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	jpineda	t	1	56156165	JUAN	PINEDA	2023-07-10 21:50:29.342329+00	2023-07-10 21:50:29.342329+00
19	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	gmarcano	t	2	28484689	Gabriel	Marcano	2023-06-03 04:11:08.4979+00	2023-07-17 12:27:21.240779+00
\.


--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_rol_seq', 2, true);


--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 49, true);


--
-- TOC entry 3186 (class 2606 OID 51537)
-- Name: usuarios ced_user_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT ced_user_unique UNIQUE (ced_usuario);


--
-- TOC entry 3184 (class 2606 OID 51543)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 3188 (class 2606 OID 51549)
-- Name: usuarios user_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT user_name_unique UNIQUE (user_name);


--
-- TOC entry 3190 (class 2606 OID 51551)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3191 (class 2606 OID 51567)
-- Name: usuarios fk_user_id_rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_user_id_rol FOREIGN KEY (rol) REFERENCES public.roles(id_rol) NOT VALID;


-- Completed on 2023-07-20 08:58:26

--
-- PostgreSQL database dump complete
--

