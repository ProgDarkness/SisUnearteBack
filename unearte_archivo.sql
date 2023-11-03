--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-11-02 20:23:11

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 209 (class 1259 OID 43349)
-- Name: documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documentos_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 43350)
-- Name: documentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documentos (
    id_documento integer DEFAULT nextval('public.documentos_id_seq'::regclass) NOT NULL,
    id_requisito_documento integer NOT NULL,
    tx_archivo text NOT NULL,
    tx_extension character varying(5) NOT NULL,
    tx_ruta character varying(50) NOT NULL,
    id_estatus_documento integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.documentos OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 43372)
-- Name: requisito_documento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisito_documento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.requisito_documento_id_seq OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 43373)
-- Name: requisito_documento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisito_documento (
    id_requisito_documento integer DEFAULT nextval('public.requisito_documento_id_seq'::regclass) NOT NULL,
    id_tipo_documento integer NOT NULL,
    id_tipo_carrera integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.requisito_documento OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 43365)
-- Name: tipo_documento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_documento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_documento_id_seq OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 43366)
-- Name: tipo_documento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_documento (
    id_tipo_documento integer DEFAULT nextval('public.tipo_documento_id_seq'::regclass) NOT NULL,
    nb_tipo_documento character varying(50) NOT NULL,
    ab_tipo_documento character varying(50) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tipo_documento OWNER TO postgres;

--
-- TOC entry 3323 (class 0 OID 43350)
-- Dependencies: 210
-- Data for Name: documentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documentos (id_documento, id_requisito_documento, tx_archivo, tx_extension, tx_ruta, id_estatus_documento, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3327 (class 0 OID 43373)
-- Dependencies: 214
-- Data for Name: requisito_documento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requisito_documento (id_requisito_documento, id_tipo_documento, id_tipo_carrera, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3325 (class 0 OID 43366)
-- Dependencies: 212
-- Data for Name: tipo_documento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_documento (id_tipo_documento, nb_tipo_documento, ab_tipo_documento, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 209
-- Name: documentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documentos_id_seq', 1, false);


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 213
-- Name: requisito_documento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisito_documento_id_seq', 1, false);


--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 211
-- Name: tipo_documento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_documento_id_seq', 1, false);


--
-- TOC entry 3178 (class 2606 OID 43357)
-- Name: documentos documentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_pkey PRIMARY KEY (id_documento);


--
-- TOC entry 3182 (class 2606 OID 43378)
-- Name: requisito_documento requisito_documento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisito_documento
    ADD CONSTRAINT requisito_documento_pkey PRIMARY KEY (id_requisito_documento);


--
-- TOC entry 3180 (class 2606 OID 43371)
-- Name: tipo_documento tipo_documento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_documento
    ADD CONSTRAINT tipo_documento_pkey PRIMARY KEY (id_tipo_documento);


-- Completed on 2023-11-02 20:23:12

--
-- PostgreSQL database dump complete
--

