--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2023-07-27 19:26:33

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
-- TOC entry 255 (class 1259 OID 25217)
-- Name: aulas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aulas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aulas_id_seq OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 24627)
-- Name: m001t_estados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m001t_estados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m001t_estados_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 25024)
-- Name: m001t_estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m001t_estados (
    id_estado integer DEFAULT nextval('public.m001t_estados_id_seq'::regclass) NOT NULL,
    id_region smallint NOT NULL,
    nb_estado character varying(50),
    cod_estado character varying(50)
);


ALTER TABLE public.m001t_estados OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24681)
-- Name: m002t_municipios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m002t_municipios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m002t_municipios_id_seq OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 25036)
-- Name: m002t_municipios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m002t_municipios (
    id_municipio integer DEFAULT nextval('public.m002t_municipios_id_seq'::regclass) NOT NULL,
    id_estado integer,
    nombre character varying(50),
    cod_municipio character varying(20)
);


ALTER TABLE public.m002t_municipios OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24700)
-- Name: m003t_parroquias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m003t_parroquias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m003t_parroquias_id_seq OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 25048)
-- Name: m003t_parroquias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m003t_parroquias (
    id_parroquia integer DEFAULT nextval('public.m003t_parroquias_id_seq'::regclass) NOT NULL,
    nombre character varying(50),
    cod_parroquia character varying(20),
    id_municipio integer NOT NULL
);


ALTER TABLE public.m003t_parroquias OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24811)
-- Name: m004t_regiones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m004t_regiones (
    id_region smallint NOT NULL,
    nb_region character varying(40) NOT NULL
);


ALTER TABLE public.m004t_regiones OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24791)
-- Name: m005t_materias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m005t_materias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m005t_materias_id_seq OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 25269)
-- Name: m005t_materias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m005t_materias (
    id_materia integer DEFAULT nextval('public.m005t_materias_id_seq'::regclass) NOT NULL,
    co_materia character varying(50),
    nb_materia character varying(100) NOT NULL,
    nu_credito integer,
    tp_materia integer,
    hr_semanal integer,
    id_prelacion boolean,
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m005t_materias OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24771)
-- Name: m006t_carreras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m006t_carreras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m006t_carreras_id_seq OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 25293)
-- Name: m006t_carreras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m006t_carreras (
    id_carrera integer DEFAULT nextval('public.m006t_carreras_id_seq'::regclass) NOT NULL,
    co_carrera character varying(50) NOT NULL,
    nb_carrera character varying(100) NOT NULL,
    tp_carrera character varying(10) NOT NULL,
    id_ciclo character varying(50),
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m006t_carreras OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24779)
-- Name: m007t_tipo_periodo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m007t_tipo_periodo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m007t_tipo_periodo_id_seq OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24900)
-- Name: m007t_tipo_periodo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m007t_tipo_periodo (
    id_periodo integer DEFAULT nextval('public.m007t_tipo_periodo_id_seq'::regclass) NOT NULL,
    cod_periodo integer NOT NULL,
    nb_periodo character varying(50) NOT NULL,
    tx_descripcion character varying(50) NOT NULL,
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m007t_tipo_periodo OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24908)
-- Name: m008t_tipopersonal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m008t_tipopersonal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m008t_tipopersonal_id_seq OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24909)
-- Name: m008t_tipo_personal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m008t_tipo_personal (
    id_tpersonal integer DEFAULT nextval('public.m008t_tipopersonal_id_seq'::regclass) NOT NULL,
    cod_tpersonal integer NOT NULL,
    nb_tpersonal character varying(50) NOT NULL,
    tx_tpersonal character varying(50) NOT NULL,
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m008t_tipo_personal OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24612)
-- Name: m009t_discapacidad_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m009t_discapacidad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m009t_discapacidad_id_seq OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 24921)
-- Name: m009t_discapacidad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m009t_discapacidad (
    id_discapacidad integer DEFAULT nextval('public.m009t_discapacidad_id_seq'::regclass) NOT NULL,
    nb_discapacidad character varying(50) NOT NULL,
    tx_descripcion character varying(100) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m009t_discapacidad OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24798)
-- Name: m010t_estatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m010t_estatus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m010t_estatus_id_seq OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24933)
-- Name: m010t_estatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m010t_estatus (
    id_estatu integer DEFAULT nextval('public.m010t_estatus_id_seq'::regclass) NOT NULL,
    nb_estatu character varying(5) NOT NULL,
    tx_descripcion character varying(5) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m010t_estatus OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24982)
-- Name: m010t_sedes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m010t_sedes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m010t_sedes_id_seq OWNER TO postgres;

--
-- TOC entry 260 (class 1259 OID 25275)
-- Name: m010t_sedes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m010t_sedes (
    id_sede integer DEFAULT nextval('public.m010t_sedes_id_seq'::regclass) NOT NULL,
    co_sede character varying(20) NOT NULL,
    nb_sede character varying(50) NOT NULL,
    tx_direccion character varying(100) NOT NULL,
    id_estado integer NOT NULL,
    id_municipio integer NOT NULL,
    id_parroquia integer NOT NULL,
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m010t_sedes OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 25098)
-- Name: m011t_profesion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m011t_profesion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m011t_profesion_id_seq OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 25108)
-- Name: m011t_profesion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m011t_profesion (
    id_profesion integer DEFAULT nextval('public.m011t_profesion_id_seq'::regclass) NOT NULL,
    nb_profesion character varying(5) NOT NULL,
    tx_descripcion character varying(5) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m011t_profesion OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 25138)
-- Name: m012t_tipo_materia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m012t_tipo_materia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m012t_tipo_materia_id_seq OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 25139)
-- Name: m012t_tipo_materia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m012t_tipo_materia (
    id_tmateria integer DEFAULT nextval('public.m012t_tipo_materia_id_seq'::regclass) NOT NULL,
    nb_tmateria character varying(50) NOT NULL,
    id_estatus boolean NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m012t_tipo_materia OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 25157)
-- Name: m013t_dias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m013t_dias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m013t_dias_id_seq OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 25162)
-- Name: m013t_dias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m013t_dias (
    id_dia integer DEFAULT nextval('public.m013t_dias_id_seq'::regclass) NOT NULL,
    nb_dia character varying(5) NOT NULL,
    id_estatus boolean NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m013t_dias OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 25168)
-- Name: m014t_estatus_estudiante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m014t_estatus_estudiante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m014t_estatus_estudiante_id_seq OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 25169)
-- Name: m014t_estatus_estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m014t_estatus_estudiante (
    id_activo integer DEFAULT nextval('public.m014t_estatus_estudiante_id_seq'::regclass) NOT NULL,
    nb_activo character varying(5) NOT NULL,
    tx_descripcion character varying(5) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m014t_estatus_estudiante OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 25201)
-- Name: secciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.secciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.secciones_id_seq OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 25231)
-- Name: m015t_secciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m015t_secciones (
    id_seccion integer DEFAULT nextval('public.secciones_id_seq'::regclass) NOT NULL,
    nb_seccion character varying(5) NOT NULL,
    cap_seccion integer NOT NULL,
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m015t_secciones OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 25218)
-- Name: m016t_aulas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m016t_aulas (
    id_aula integer DEFAULT nextval('public.aulas_id_seq'::regclass) NOT NULL,
    co_aula integer NOT NULL,
    nb_aula character varying(5) NOT NULL,
    cap_aula integer NOT NULL,
    id_estatus boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m016t_aulas OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 25299)
-- Name: m017t_trayectos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m017t_trayectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.m017t_trayectos_id_seq OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 25300)
-- Name: m017t_trayectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m017t_trayectos (
    id_trayecto integer DEFAULT nextval('public.m017t_trayectos_id_seq'::regclass) NOT NULL,
    nb_trayecto character varying(50) NOT NULL,
    tx_descripcion character varying(50) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.m017t_trayectos OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24743)
-- Name: r001t_docente_materia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.r001t_docente_materia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.r001t_docente_materia_id_seq OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 25088)
-- Name: r001t_docente_materia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.r001t_docente_materia (
    id_dicta integer DEFAULT nextval('public.r001t_docente_materia_id_seq'::regclass) NOT NULL,
    id_materia integer NOT NULL,
    id_personal integer NOT NULL,
    id_carrera integer NOT NULL,
    id_estatus boolean,
    hora_semanal integer NOT NULL,
    id_tpcurricular integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.r001t_docente_materia OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 25078)
-- Name: r002t_carrera_materia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.r002t_carrera_materia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.r002t_carrera_materia_id_seq OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 25306)
-- Name: r002t_carrera_materia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.r002t_carrera_materia (
    id_carrema integer DEFAULT nextval('public.r002t_carrera_materia_id_seq'::regclass) NOT NULL,
    id_carrera integer NOT NULL,
    id_materia integer NOT NULL,
    id_sede integer NOT NULL,
    id_estatus boolean,
    hora_semanal integer NOT NULL,
    id_tpcurricular integer NOT NULL,
    id_trayecto integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.r002t_carrera_materia OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 25127)
-- Name: r003t_inscripcion_materia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.r003t_inscripcion_materia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.r003t_inscripcion_materia_id_seq OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 25145)
-- Name: r003t_inscripcion_materia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.r003t_inscripcion_materia (
    id_inscrito integer DEFAULT nextval('public.r003t_inscripcion_materia_id_seq'::regclass) NOT NULL,
    id_inscripcion integer NOT NULL,
    id_materia integer NOT NULL,
    id_estatus integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.r003t_inscripcion_materia OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 24577)
-- Name: t001t_usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t001t_usuarios_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t001t_usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 25062)
-- Name: t001t_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t001t_usuarios (
    id_usuario integer DEFAULT nextval('public.t001t_usuarios_id_seq'::regclass) NOT NULL,
    tx_clave character varying NOT NULL,
    user_name character varying NOT NULL,
    bl_status boolean DEFAULT false NOT NULL,
    rol smallint NOT NULL,
    ced_usuario integer NOT NULL,
    nb_usuario character varying NOT NULL,
    ape_usuario character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.t001t_usuarios OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24591)
-- Name: t002t_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t002t_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t002t_roles_id_seq OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24877)
-- Name: t002t_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t002t_roles (
    id_rol integer DEFAULT nextval('public.t002t_roles_id_seq'::regclass) NOT NULL,
    nb_rol character varying(50) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t002t_roles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24750)
-- Name: t003t_personal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t003t_personal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t003t_personal_id_seq OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 25114)
-- Name: t003t_personal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t003t_personal (
    id_personal integer DEFAULT nextval('public.t003t_personal_id_seq'::regclass) NOT NULL,
    nac_personal character varying(5) NOT NULL,
    ced_personal integer NOT NULL,
    nb_personal character varying(50) NOT NULL,
    ape_personal character varying(50) NOT NULL,
    tlf_fijo character varying(50) NOT NULL,
    tlf_movil character varying(50) NOT NULL,
    correo character varying(50) NOT NULL,
    id_estatus boolean,
    id_tpersonal integer NOT NULL,
    carga_horaria integer NOT NULL,
    id_profesion character varying(50) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t003t_personal OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24605)
-- Name: t004t_estudiantes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t004t_estudiantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t004t_estudiantes_id_seq OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24960)
-- Name: t004t_estudiantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t004t_estudiantes (
    id_estudiante integer DEFAULT nextval('public.t004t_estudiantes_id_seq'::regclass) NOT NULL,
    nac_estudiante character varying(5) NOT NULL,
    ced_estudiante integer NOT NULL,
    nb_estudiante character varying(100) NOT NULL,
    ape_estudiante character varying(100) NOT NULL,
    sexo_estudiante character varying(20) NOT NULL,
    fechanac_estudiante timestamp without time zone,
    id_discapacidad integer NOT NULL,
    tx_direccion character varying(100) NOT NULL,
    id_estado integer NOT NULL,
    id_municipio integer NOT NULL,
    id_parroquia integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t004t_estudiantes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24764)
-- Name: t005t_inscripcion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t005t_inscripcion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t005t_inscripcion_id_seq OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 25195)
-- Name: t005t_inscripcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t005t_inscripcion (
    id_inscripcion integer DEFAULT nextval('public.t005t_inscripcion_id_seq'::regclass) NOT NULL,
    id_estudiante integer NOT NULL,
    id_periodo integer NOT NULL,
    id_activo integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t005t_inscripcion OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 24996)
-- Name: t006t_periodos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t006t_periodos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t006t_periodos_id_seq OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 25312)
-- Name: t006t_periodos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t006t_periodos (
    id_periodo integer DEFAULT nextval('public.t006t_periodos_id_seq'::regclass) NOT NULL,
    co_periodo integer NOT NULL,
    id_tperiodo integer NOT NULL,
    fe_inicio timestamp without time zone,
    fe_fin timestamp without time zone,
    fe_inicio_inscripcion timestamp without time zone,
    fe_fin_inscripcion timestamp without time zone,
    fe_inicio_oferta timestamp without time zone,
    fe_fin_oferta timestamp without time zone,
    fe_inicio_retiro timestamp without time zone,
    fe_fin_retiro timestamp without time zone,
    fe_inicio_notas timestamp without time zone,
    fe_fin_notas timestamp without time zone,
    id_estatus boolean,
    id_trayecto integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t006t_periodos OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 25175)
-- Name: t007t_horario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t007t_horario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t007t_horario_id_seq OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 25225)
-- Name: t007t_horario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t007t_horario (
    id_horario integer DEFAULT nextval('public.t007t_horario_id_seq'::regclass) NOT NULL,
    id_personal integer NOT NULL,
    id_materia integer NOT NULL,
    id_sede integer NOT NULL,
    id_periodo integer NOT NULL,
    id_dia integer NOT NULL,
    id_carrera integer NOT NULL,
    id_aula integer NOT NULL,
    id_seccion character varying(5) NOT NULL,
    hora_inicio character varying(5) NOT NULL,
    hora_fin character varying(5) NOT NULL,
    id_estatus boolean NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t007t_horario OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 25188)
-- Name: t008t_oferta_academica_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t008t_oferta_academica_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t008t_oferta_academica_id_seq OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 25189)
-- Name: t008t_oferta_academica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t008t_oferta_academica (
    id_oferta integer DEFAULT nextval('public.t008t_oferta_academica_id_seq'::regclass) NOT NULL,
    id_periodo integer NOT NULL,
    id_horario integer NOT NULL,
    nu_cupos integer NOT NULL,
    nu_seccion integer NOT NULL,
    id_estatus boolean NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.t008t_oferta_academica OWNER TO postgres;

--
-- TOC entry 3563 (class 0 OID 25024)
-- Dependencies: 233
-- Data for Name: m001t_estados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m001t_estados (id_estado, id_region, nb_estado, cod_estado) FROM stdin;
2	1	MIRANDA	2
12	4	AMAZONAS	12
13	4	APURE	13
14	4	ARAGUA	14
15	4	GUÁRICO	15
16	5	FALCÓN	16
17	5	ZULIA	17
18	6	ANZOÁTEGUI	18
19	6	BOLÍVAR	19
20	6	DELTA AMACURO	20
21	6	MONAGAS	21
22	6	NUEVA ESPARTA	22
23	6	SUCRE	23
24	7	LA GUAIRA	24
1	1	DISTRITO CAPITAL	1
3	2	BARINAS	3
4	2	TRUJILLO	4
5	2	MÉRIDA	5
6	2	TÁCHIRA	6
7	3	CARABOBO	7
8	3	COJEDES	8
9	3	LARA	9
10	3	PORTUGUESA	10
11	3	YARACUY	11
25	8	NACIONAL	0
\.


--
-- TOC entry 3564 (class 0 OID 25036)
-- Dependencies: 234
-- Data for Name: m002t_municipios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m002t_municipios (id_municipio, id_estado, nombre, cod_municipio) FROM stdin;
1	1	Libertador	1
2	2	Chacao	2
3	2	Baruta	3
4	2	Sucre	4
5	2	El Hatillo	5
6	2	Guaicaipuro	6
7	2	Carrizal	7
8	2	Los Salias	8
9	2	Lander	9
10	2	Cristóbal Rojas	10
11	2	Urdaneta	11
12	2	Simón Bolívar	12
13	2	Paz Castillo	13
14	2	Independencia	14
15	2	Plaza	15
16	2	Zamora	16
17	2	Buroz	17
18	2	Brión	18
19	2	Andrés Bello	19
20	2	Páez	20
21	2	Pedro Gual	21
22	2	Acevedo	22
23	3	Barinas	23
24	3	Alberto Arvelo Torrealba	24
25	3	Sosa	25
26	3	Antonio José de Sucre	26
27	3	Arismendi	27
28	3	Rojas	28
29	3	Bolívar	29
30	3	Cruz Paredes	30
31	3	Ezequiel Zamora	31
32	3	Andrés Eloy Blanco	32
33	3	Obispos	33
34	3	Pedraza	34
35	4	Trujillo	35
36	4	Valera	36
37	4	Escuque	37
38	4	Motatán	38
39	4	Pampanito	39
40	4	Betijoque	40
41	4	San Rafael de Carvajal	41
42	4	Boconó	42
43	4	Juan Vicente Campo Elías	43
44	4	Pampán	44
45	4	José Felipe Márquez Cañizales	45
46	4	Candelaria	46
47	4	Carache	47
48	4	Sucre	48
49	4	Bolívar	49
50	4	Miranda	50
51	4	Andrés Bello	51
52	4	Monte Carmelo	52
53	4	Urdaneta	53
54	4	La Ceiba	54
55	5	Libertador	55
56	5	Alberto Adriani	56
57	5	Andrés Bello	57
58	5	Padre Noguera	58
59	5	Pueblo Llano	59
60	5	Rangel	60
61	5	Rivas Dávila	61
62	5	Santos Marquina	62
63	5	Tovar	63
64	5	Guaraque	64
65	5	Sucre	65
66	5	Zea	66
67	5	Antonio Pinto Salinas	67
68	5	Aricagua	68
69	5	Arzobispo Chacón	69
70	5	Campo Elías	70
71	5	Obispo Ramos de Lora	71
72	5	Caracciolo Parra Olmedo	72
73	5	Cardenal Quintero	73
74	5	Julio César Salas	74
75	5	Justo Briceño	75
76	5	Tulio Febres Cordero	76
77	5	Miranda	77
78	6	San Cristóbal	78
79	6	Cárdenas	79
80	6	Andrés Bello	80
81	6	Guásimos	81
82	6	Sucre	82
83	6	Francisco de Miranda	83
84	6	Lobatera	84
85	6	Michelena	85
86	6	Pedro María Ureña	86
87	6	Torbes	87
88	6	Junín	88
89	6	Rafael Urdaneta	89
90	6	Ayacucho	90
91	6	Bolívar	91
92	6	Jáuregui	92
93	6	José María Vargas	93
94	6	Seboruco	94
95	6	Córdoba	95
96	6	Fernández Feo	96
97	6	Libertador	97
98	6	Uribante	98
99	6	Independencia	99
100	6	Libertad	100
101	6	García de Hevia	101
102	6	Antonio Rómulo Costa	102
103	6	Panamericano	103
104	6	Samuel Darío Maldonado	104
105	6	Simón Rodríguez	105
106	6	San Judas Tadeo	106
107	7	Bejuma	107
108	7	Carlos Arvelo	108
109	7	Diego Ibarra	109
110	7	Guacara	110
111	7	Juan José Mora	111
112	7	Libertador	112
113	7	Los Guayos	113
114	7	Miranda	114
115	7	Montalbán	115
116	7	Naguanagua	116
117	7	Puerto Cabello	117
118	7	San Diego	118
119	7	San Joaquín	119
120	7	Valencia	120
121	8	 Anzoátegui	121
122	8	Falcón	122
123	8	Girardot	123
124	8	Lima Blanco	124
125	8	Pao de San Juan Bautista	125
126	8	Ricaurte	126
127	8	Rómulo Gallegos	127
128	8	San Carlos	128
129	8	Tinaco	129
130	9	Iribarren	130
131	9	Simón Planas	131
132	9	Morán	132
133	9	Palavecino	133
134	9	Crespo	134
135	9	Andrés Eloy Blanco	135
136	9	Urdaneta	136
137	9	Torres	137
138	9	Jiménez	138
139	10	Agua Blanca	139
140	10	Araure	140
141	10	Esteller	141
142	10	Guanare	142
143	10	Guanarito	143
144	10	Monseñor José Vicente de Unda	144
145	10	Ospino	145
146	10	Páez	146
147	10	Papelón	147
148	10	San Génaro de Boconoito	148
149	10	San Rafael de Onoto	149
150	10	Santa Rosalía	150
151	10	Sucre	151
152	10	Turén	152
153	11	Arístides Bastidas	153
154	11	Bolívar	154
155	11	Bruzual	155
156	11	Cocorote	156
157	11	Independencia	157
158	11	José Antonio Páez	158
159	11	La Trinidad	159
160	11	Manuel Monge	160
161	11	Nirgua	161
162	11	Peña	162
163	11	San Felipe	163
164	11	Sucre	164
165	11	Urachiche	165
166	11	Veroes	166
167	12	Autónomo Atures	167
168	12	Autónomo Alto Orinoco	168
169	12	Autónomo Atabapo	169
170	12	Autónomo Maroa	170
171	12	Autónomo Autana	171
172	12	Autónomo Manapiare	172
173	12	Autónomo Río Negro	173
174	13	San Fernando	174
175	13	Achaguas	175
176	13	Pedro Camejo	176
177	13	Muñoz	177
178	13	Biruaca	178
179	13	Páez	179
180	13	Rómulo Gallegos	180
181	14	Girardot	181
182	14	Francisco Linares Alcántara	182
183	14	Mario Briceño Iragorry	183
184	14	Santiago Mariño	184
185	14	Ocumare de La Costa de Oro	185
186	14	José Félix Ribas	186
187	14	Bolívar	187
188	14	José Rafael Revenga	188
189	14	Tovar	189
190	14	Zamora	190
191	14	Sucre	191
192	14	José Angel Lamas	192
193	14	Libertador	193
194	14	Camatagua	194
195	14	San Casimiro	195
196	14	San Sebastián	196
197	14	Urdaneta	197
198	14	Santos Michelena	198
199	15	Juan Germán Roscio	199
200	15	Francisco de Miranda	200
201	15	Leonardo Infante	201
202	15	Chaguaramas	202
203	15	El Socorro	203
204	15	Juan José Rondón	204
205	15	José Félix Ribas	205
206	15	Santa María de Ipire	206
207	15	José Tadeo Monagas	207
208	15	San José de Guaribe	208
209	15	Pedro Zaraza	209
210	15	Ortíz	210
211	15	Camaguán	211
212	15	San Gerónimo de Guayabal	212
213	15	Julián Mellado	213
214	16	Miranda	214
215	16	Carirubana	215
216	16	Falcón	216
217	16	Colina	217
218	16	Zamora	218
219	16	Píritu	219
220	16	Tocópero	220
221	16	Silva	221
222	16	Monseñor Iturriza	222
223	16	San Francisco	223
224	16	Acosta	224
225	16	Jacura	225
226	16	Cacique Manaure	226
227	16	Palmasola	227
228	16	Los Taques	228
229	16	Federación	229
230	16	Unión	230
231	16	Petit	231
232	16	Democracia	232
233	16	Bolívar	233
234	16	Sucre	234
235	16	Mauroa	235
236	16	Buchivacoa	236
237	16	Dabajuro	237
238	16	Urumaco	238
239	17	Maracaibo	239
240	17	San Francisco	240
241	17	Cabimas	241
242	17	Santa Rita	242
243	17	Lagunillas	243
244	17	Simón Bolívar	244
245	17	Mara	245
246	17	Indigena Bolivariano Guajira	246
247	17	Almirante Padilla	247
248	17	Colón	248
249	17	Catatumbo	249
250	17	Jesús María Semprún	250
251	17	Sucre	251
252	17	Francisco Javier Pulgar	252
253	17	Machiques de Perijá	253
254	17	Jesús Enrique Lossada	254
255	17	La Cañada de Urdaneta	255
256	17	Miranda	256
257	17	Baralt	257
258	17	Valmore Rodríguez	258
259	17	Rosario de Perijá	259
260	18	Simón Bolívar	260
261	18	Aragua	261
262	18	Anaco	262
263	18	San Juan de Capistrano	263
264	18	Pedro María Freites	264
265	18	Manuel Ezequiel Bruzual	265
266	18	Francisco del Carmen Carvajal	266
267	18	Independencia	267
268	18	Guanta	268
269	18	Turístico Diego Bautista Urbaneja	269
270	18	Juan Manuel Cajigal	270
271	18	Fernando de Peñalver	271
272	18	Píritu	272
273	18	Juan Antonio Sotillo	273
274	18	Santa Ana	274
275	18	Libertad	275
276	18	Simón Rodríguez	276
277	18	Sir Arthur Mc Gregor	277
278	18	Francisco de Miranda	278
279	18	San José de Guanipa	279
280	18	José Gregorio Monagas	280
281	19	Angostura del Orinoco	281
282	19	Sucre	282
283	19	Bolivariano Angostura	283
284	19	Cedeño	284
285	19	Gran Sabana	285
286	19	Padre Pedro Chien	286
287	19	Caroní	287
288	19	Piar	288
289	19	Roscio	289
290	19	El Callao	290
291	19	Sifontes	291
292	20	Antonio Díaz	292
293	20	Casacoima	293
294	20	Pedernales	294
295	20	Tucupita	295
296	21	Acosta	296
297	21	Aguasay	297
298	21	Bolívar	298
299	21	Caripe	299
300	21	Cedeño	300
301	21	Ezequiel Zamora	301
302	21	Libertador	302
303	21	Maturín	303
304	21	Piar	304
305	21	Púnceres	305
306	21	Santa Bárbara	306
307	21	Sotillo	307
308	21	Uracoa	308
309	22	Antolín del Campo	309
310	22	Arismendi	310
311	22	Díaz	311
312	22	García	312
313	22	Mariño	313
314	22	Gómez	314
315	22	Maneiro	315
316	22	Marcano	316
317	22	Península de Macanao	317
318	22	Tubores	318
319	22	Villalba	319
320	23	Sucre	320
321	23	Cruz Salmerón Acosta	321
322	23	Montes	322
323	23	Bolívar	323
324	23	Mejía	324
325	23	Ribero	325
326	23	Bermúdez	326
327	23	Benítez	327
328	23	Libertador	328
329	23	Cajigal	329
330	23	Mariño	330
331	23	Valdez	331
332	23	Arismendi	332
333	23	Andrés Mata	333
334	23	Andrés Eloy Blanco	334
335	24	Vargas	335
\.


--
-- TOC entry 3565 (class 0 OID 25048)
-- Dependencies: 235
-- Data for Name: m003t_parroquias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m003t_parroquias (id_parroquia, nombre, cod_parroquia, id_municipio) FROM stdin;
1	Antímano	1	1
2	Caricuao	2	1
3	Macarao	3	1
4	Altagracia	4	1
5	La Pastora	5	1
6	San José	6	1
7	La Candelaria	7	1
8	San Bernardino	8	1
9	Catedral	9	1
10	Santa Teresa	10	1
11	Santa Rosalía	11	1
12	San Juan	12	1
13	San Agustín	13	1
14	El Paraíso	14	1
15	La Vega	15	1
16	Sucre	16	1
17	El Junquito	17	1
18	23 de Enero	18	1
19	El Valle	19	1
20	San Pedro	20	1
21	El Recreo	21	1
22	Coche	22	1
23	Chacao	23	2
24	Baruta	24	3
25	Las Minas de Baruta	25	3
26	Petare	26	4
27	Fila de Mariches	27	4
28	Leoncio Martínez	28	4
29	Caucaguita	29	4
30	La Dolorita	30	4
31	La Dolorita	31	5
32	El Hatillo	32	5
33	Los Teques	33	6
34	El Jarillo	34	6
35	Paracotos	35	6
36	San Pedro	36	6
37	Altagracia de La Montaña	37	6
38	Tácata	38	6
39	Carrizal	39	7
40	Cecilio Acosta	40	7
41	San Antonio de Los Altos	41	8
42	Ocumare del Tuy	42	9
43	La Democracia	43	9
44	Santa Bárbara	44	9
45	Charallave	45	10
46	Las Brisas	46	10
47	Cúa	47	11
48	Nueva Cúa	48	11
49	San Francisco de Yare	49	12
50	San Antonio de Yare	50	12
51	Santa  Lucía	51	13
52	Santa Teresa del Tuy	52	14
53	El Cartanal	53	14
54	Guarenas	54	15
55	Guatire	55	16
56	Bolívar	56	16
57	Mamporal	57	17
58	Higuerote	58	18
59	Curiepe	59	18
60	Tacarigua	60	18
61	San José de Barlovento	61	19
62	Cumbo	62	19
63	Río Chico	63	20
64	Tacarigua de La Laguna	64	20
65	Paparo	65	20
66	El Guapo	66	20
67	San Fernando del Guapo	67	20
68	Cúpira	68	21
69	Caucagua	69	22
70	Marizapa	70	22
71	Aragüita	71	22
72	Ribas	72	22
73	Capaya	73	22
74	El Café	74	22
75	Panaquire	75	22
76	Arévalo González	76	22
77	Barinas	77	23
78	Alfredo Arvelo Larriva	78	23
79	Santa Inés	79	23
80	Santa Lucía	80	23
81	Torunos	81	23
82	El Carmen	82	23
83	Rómulo Betancourt	83	23
84	Corazón de Jesús	84	23
85	Ramón Ignacio Méndez	85	23
86	Alto Barinas	86	23
87	Manuel Palacio Fajardo	87	23
88	Juan Antonio Rodríguez Domínguez	88	23
89	Dominga Ortíz de Páez	89	23
90	San Silvestre	90	23
91	Sabaneta	91	24
92	Rodríguez Domínguez	92	24
93	Ciudad de Nutrias	93	25
94	El Regalo	94	25
95	Puerto de Nutrias	95	25
96	Santa Catalina	96	25
97	Ticoporo	97	26
98	Andrés Bello	98	26
99	Nicolás Pulido	99	26
100	Arismendi	100	27
101	Guadarrama	101	27
102	La Unión	102	27
103	San Antonio	103	27
104	Libertad	104	28
105	Dolores	105	28
106	Palacios Fajardo	106	28
107	Santa Rosa	107	28
108	Barinitas	108	29
109	Altamira	109	29
110	Calderas	110	29
111	Barrancas	111	30
112	El Socorro	112	30
113	Masparrito	113	30
114	Santa Bárbara	114	31
115	José Ignacio del Pumar	115	31
116	Pedro Briceño Méndez	116	31
117	Ramón Ignacio Méndez	117	31
118	El Cantón	118	32
119	Santa Cruz de Guacas	119	32
120	Puerto Vivas	120	32
121	Obispos	121	33
122	El Real	122	33
123	La Luz	123	33
124	Los Guasimitos	124	33
125	Ciudad Bolivia	125	34
126	Ignacio Briceño	126	34
127	José Félix Ribas	127	34
128	Páez	128	34
129	Matríz	129	35
130	Andrés Linares	130	35
131	Chiquinquirá	131	35
132	Cristóbal Mendoza	132	35
133	Cruz Carrillo	133	35
134	Monseñor Carrillo	134	35
135	Tres Esquinas	135	35
136	Juan Ignacio Montilla	136	36
137	La Beatríz	137	36
138	Mercedes Díaz	138	36
139	San Luis	139	36
140	La Puerta	140	36
141	Mendoza	141	36
142	Escuque	142	37
143	La Unión	143	37
144	Sabana Libre	144	37
145	Santa Rita	145	37
146	Motatán	146	38
147	El Baño	147	38
148	Jalisco	148	38
149	Pampanito	149	39
150	La Concepción	150	39
151	Pampanito ll	151	39
152	Betijoque	152	40
153	La Pueblita	153	40
154	Los Cedros	154	40
155	José Gregorio Hernández	155	40
156	Carvajal	156	41
157	Antonio Nicolás Briceño	157	41
158	Campo Alegre	158	41
159	José Leonardo Suárez	159	41
160	Boconó	160	42
161	El Carmen	161	42
162	Mosquey	162	42
163	Ayacucho	163	42
164	Burbusay	164	42
165	General Rivas	165	42
166	Guaramacal	166	42
167	Vega de Guaramacal	167	42
168	Monseñor Jáuregui	168	42
169	Rafael Rangel	169	42
170	San Miguel	170	42
171	San José	171	42
172	Campo Elías	172	43
173	Arnoldo Gabaldón	173	43
174	Pampán	174	44
175	Flor de Patria	175	44
176	La Paz	176	44
177	Santa Ana	177	44
178	El Socorro	178	45
179	Antonio José de Sucre	179	45
180	Los Caprichos	180	45
181	Chejendé	181	46
182	Arnoldo Gabaldón	182	46
183	Bolivia	183	46
184	Carrillo	184	46
185	Cegarra	185	46
186	Manuel Salvador Ulloa	186	46
187	San José	187	46
188	Carache	188	47
189	Cuicas	189	47
190	La Concepción	190	47
191	Panamericana	191	47
192	Santa Cruz	192	47
193	Sabana de Mendoza	193	48
194	El Paraíso	194	48
195	Junín	195	48
196	Valmore Rodríguez	196	48
197	Sabana Grande	197	49
198	Cheregüé	198	49
199	Granados	199	49
200	El Dividive	200	50
201	Agua Santa	201	50
202	Agua Caliente	202	50
203	El Cenizo	203	50
204	Valerita	204	50
205	Santa Isabel	205	51
206	Araguaney	206	51
207	El Jagüito	207	51
208	La Esperanza	208	51
209	Monte Carmelo	209	52
210	Buena Vista	210	52
211	Santa María del Horcón	211	52
212	La Quebrada	212	53
213	Cabimbú	213	53
214	Jajó	214	53
215	La Mesa	215	53
216	Santiago	216	53
217	Tuñame	217	53
218	Santa Apolonia	218	54
219	El Progreso	219	54
220	Tres de Febrero	220	54
221	La Ceiba	221	54
222	Sagrario	222	55
223	Antonio Spinetti Dini	223	55
224	Arías	224	55
225	Caracciolo Parra Pérez	225	55
226	Domingo Peña	226	55
227	El Llano	227	55
228	Gonzalo Picón Febres	228	55
229	Jacinto Plaza	229	55
230	Lasso de La Vega	230	55
231	Mariano Picón Salas	231	55
232	Milla	232	55
233	Osuna Rodríguez	233	55
234	Juan Rodríguez Suárez	234	55
235	El Morro	235	55
236	Los Nevados	236	55
237	Los Nevados	237	56
238	Presidente Betancourt	238	56
239	Presidente Páez	239	56
240	Presidente Rómulo Gallegos	240	56
241	Gabriel Picón González	241	56
242	Héctor Amable Mora	242	56
243	José Nucete Sardi	243	56
244	Pulido Méndez	244	56
245	Pulido Méndez	245	57
246	Pulido Méndez	246	58
247	Pulido Méndez	247	59
248	Capital Rangel	248	60
249	La Toma	249	60
250	San Rafael	250	60
251	Cacute	251	60
252	Macurubá	252	60
253	Capital Rivas Dávila	253	61
254	Gerónimo Maldonado	254	61
255	Gerónimo Maldonado	255	62
256	Tovar	256	63
257	El Amparo	257	63
258	El Llano	258	63
259	San Francisco	259	63
260	Mesa de Quintero	260	64
261	Río Negro	261	64
262	Capital Sucre	262	65
263	Chiguará	263	65
264	Estánquez	264	65
265	La Trampa	265	65
266	Pueblo Nuevo del Sur	266	65
267	San Juan	267	65
268	Capital Zea	268	66
269	Caño El Tigre	269	66
270	Capital Antonio Pinto Salinas	270	67
271	Mesa Bolívar	271	67
272	Mesa de Las Palmas	272	67
273	Capital Aricagua	273	68
274	San Antonio	274	68
275	Capital Arzobispo Chacón	275	69
276	Capurí	276	69
277	Chacantá	277	69
278	El Molino	278	69
279	Guaimaral	279	69
280	Mucuchachí	280	69
281	Mucutuy	281	69
282	Fernández Peña	282	70
283	Matriz	283	70
284	Montalbán	284	70
285	Acequias	285	70
286	Jají	286	70
287	La Mesa	287	70
288	San José del Sur	288	70
289	Obispo Ramos de Lora	289	71
290	Eloy Paredes	290	71
291	San Rafael de Alcázar	291	71
292	Capital Caracciolo Parra Olmedo	292	72
293	Florencio Ramírez	293	72
294	Capital Cardenal Quintero	294	73
295	Las Piedras	295	73
296	Capital Julio César Salas	296	74
297	Palmira	297	74
298	Palmira	298	75
299	Capital Justo Briceño	299	75
300	Tulio Febres Cordero	300	76
301	Independencia	301	76
302	María de la Concepción Palacios Blanco	302	76
303	Capital de Miranda	303	77
304	Andrés Eloy Blanco	304	77
305	La Venta	305	77
306	Piñango	306	77
307	San Sebastián	307	78
308	San Juan Bautista	308	78
309	Pedro María Morantes	309	78
310	La Concordia	310	78
311	Dr. Francisco Romero Lobo	311	78
312	Cárdenas	312	79
313	La Florida	313	79
314	Amenodoro Rangel Lamús	314	79
315	Amenodoro Rangel Lamús	315	80
316	Sucre	317	82
317	Eleazar López Contreras	318	82
318	San Pablo	319	82
319	San Pablo	320	83
320	Lobatera	321	84
321	Constitución	322	84
322	Constitución	323	85
323	Pedro María Ureña	324	86
324	Nueva Arcadia	325	86
325	Junín	327	88
326	Capital Palmira	316	81
327	La Petrólea	328	88
328	Quinimarí	329	88
329	Bramón	330	88
330	Bramón	331	89
331	Ayacucho	332	90
332	Rivas Berti	333	90
333	San Pedro del Río	334	90
334	Bolívar	335	91
335	Juan Vicente Gómez	336	91
336	Palotal	337	91
337	Isaías Medina Angarita	338	91
338	Jáuregui	339	92
339	Emilio Constantino Guerrero	340	92
340	Monseñor Miguel Antonio Salas	341	92
341	Monseñor Miguel Antonio Salas	342	93
342	Monseñor Miguel Antonio Salas	343	94
343	Monseñor Miguel Antonio Salas	344	95
344	Fernández Feo	345	96
345	Alberto Adriani	346	96
346	Santo Domingo	347	96
347	Libertador	348	97
348	Don Emeterio Ochoa	349	97
349	San Joaquín de Navay	350	97
350	Doradas	351	97
351	Uribante	352	98
352	Cárdenas	353	98
353	Juan Pablo Peñaloza	354	98
354	Potosí	355	98
355	Independencia	356	99
356	Román Cárdenas	357	99
357	Juan Germán Roscio	358	99
358	Libertad	359	100
359	Cipriano Castro	360	100
360	Manuel Felipe Rugeles	361	100
361	García de Hevia	362	101
362	Boca de Grita	363	101
363	José Antonio Páez	364	101
364	José Antonio Páez	365	102
365	Panamericano	366	103
366	La Palmita	367	103
367	Samuel Darío Maldonado	368	104
368	Boconó	369	104
369	Hernández	370	104
370	Hernández	371	105
371	Hernández	372	106
372	Urbana Bejuma	373	107
373	Canoabo	374	107
374	Simón Bolívar	375	107
375	Urbana Güigüe	376	108
376	Tacarigua	377	108
377	Belén	378	108
378	Urbana Mariara	379	109
379	Urbana Aguas Calientes	380	109
380	Urbana Aguas Calientes	381	110
381	Urbana Guacara	382	110
382	Yagua	383	110
383	Urbana Ciudad Alianza	384	110
384	Urbana Morón	385	111
385	Urama	386	111
386	Urbana Tocuyito	387	112
387	Urbana Independencia	388	112
388	Urbana Los Guayos	389	113
389	Urbana Miranda	390	114
390	Urbana Montalbán	391	115
391	Urbana Naguanagua	392	116
392	Urbana Bartolomé Salom	393	117
393	Borburata	394	117
394	Urbana Democracia	395	117
395	Urbana Fraternidad	396	117
396	Goaigoaza	397	117
397	Juan José Flores	398	117
398	Patanemo	399	117
399	Urbana Unión	400	117
400	Urbana San Diego	401	118
401	Urbana San Joaquín	402	119
402	Urbana Candelaria	403	120
403	Urbana Catedral	404	120
404	El Socorro	405	120
405	Urbana Miguel Peña	406	120
406	Urbana San Blás	407	120
407	Urbana Santa Rosa	408	120
408	Urbana San José	409	120
409	Urbana Rafael Urdaneta	410	120
410	Negro Primero	411	120
411	Negro Primero	412	121
412	Cojedes	413	121
413	Juan de Mata Suárez	414	121
414	Tinaquillo	415	122
415	El Baúl	416	123
416	Sucre	417	123
417	Macapo	418	124
418	La Aguadita	419	124
419	El Pao	420	125
420	El Pao	421	126
421	El Amparo	422	126
422	Libertad de Cojedes	423	126
423	Rómulo Gallegos	424	127
424	Rómulo Gallegos	425	128
425	San Carlos de Austria	426	128
426	Juan Ángel Bravo	427	128
427	Manuel Manrique	428	128
428	Manuel Manrique	429	129
429	General en Jefe José Laurencio Silva	430	129
430	Catedral	431	130
431	Concepción	432	130
432	El Cují	433	130
433	Guerrera Ana Soto	434	130
434	Santa Rosa	435	130
435	Tamaca	436	130
436	Unión	437	130
437	Aguedo Felipe Alvarado	438	130
438	Buena Vista	439	130
439	Juárez	440	130
440	Juárez	441	131
441	Capital Sarare	442	131
442	Buría	443	131
443	Gustavo Vegas León	444	131
444	Gustavo Vegas León	445	132
445	Capital Bolivar	446	132
446	Bolívar	447	132
447	Morán	448	132
448	La Candelaria	449	132
449	Anzoátegui	450	132
450	Hilario Luna y Luna	451	132
451	Guárico	452	132
452	Humocaro Alto	453	132
453	Humocaro Bajo	454	132
454	Capital Cabudare	455	133
455	José Gregorio Bastidas	456	133
456	Agua Viva	457	133
457	Agua Viva	458	134
458	Capital Duaca	459	134
459	Freitez	460	134
460	José María Blanco	461	134
461	Capital Andrés Eloy Blanco	462	135
462	Pío Tamayo	463	135
463	Quebrada Honda de Guache	464	135
464	Yacambú	465	135
465	Siquisique	466	136
466	Moroturo	467	136
467	San Miguel	468	136
468	Xaquas	469	136
469	Trinidad Samuel	470	137
470	Antonio Díaz	471	137
471	Camacaro	472	137
472	Castañeda	473	137
473	Cecilio Zubillaga	474	137
474	Chiquinquirá	475	137
475	El Blanco	476	137
476	Espinoza de Los Monteros	477	137
477	Lara	478	137
478	Las Mercedes	479	137
479	Manuel Morillo	480	137
480	Montaña Verde	481	137
481	Montes de Oca	482	137
482	Torres	483	137
483	Reyes Vargas	484	137
484	Altagracia	485	137
485	Altagracia	486	138
486	Juan Bautista Rodríguez	487	138
487	Cuara	488	138
488	Diego de Lozada	489	138
489	Paraíso de San José	490	138
490	San Miguel	491	138
491	Tintorero	492	138
492	José Bernardo Dorante	493	138
493	Coronel Mariano Peraza	494	138
494	Coronel Mariano Peraza	495	139
495	Capital Araure	496	140
496	Río Acarigua	497	140
497	Capital Esteller	498	141
498	Uveral	499	141
499	Capital Guanare	500	142
500	Córdoba	501	142
501	San Juan de Guanaguanare	502	142
502	Virgen de la Coromoto	503	142
503	San José de la Montaña	504	142
504	Capital Guanarito	505	143
505	Trinidad de la Capilla	506	143
506	Divina Pastora	507	143
507	Capital Monseñor José Vicente de Unda	508	144
508	Peña Blanca	509	144
509	Capital Ospino	510	145
510	Aparición	511	145
511	la Estación	512	145
512	Capital Páez	513	146
513	Payara	514	146
514	Ramón Peraza	515	146
515	Pimpinela	516	146
516	Capital Papelón	517	147
517	Caño Delgadito	518	147
518	Capital San Genaro de Boconoito	519	148
519	Antolín Tovar	520	148
520	Capital San Rafael  de Onoto	521	149
521	Santa Fe	522	149
522	Thermo Morles	523	149
523	Capital Santa Rosalia	524	150
524	Florida	525	150
525	Capital Sucre	526	151
526	Concepción	527	151
527	San Rafael de Palo Alzado	528	151
528	Uvencio Antonio Velásquez	529	151
529	San José de Saguaz	530	151
530	Villa Rosa	531	151
531	Capital Turén	532	152
532	Canelones	533	152
533	Santa Cruz	534	152
534	San Isidro Labrador	535	152
535	San Isidro Labrador	536	153
536	San Isidro Labrador	537	154
537	Capital Bruzual	538	155
538	Campo Elías	539	155
539	Campo Elías	541	157
540	Campo Elías	542	158
541	Campo Elías	543	159
542	Campo Elías	544	160
543	Capital Nirgua	545	161
544	Salom	546	161
545	Temerla	547	161
546	Capital Peña	548	162
547	San Andrés	549	162
548	Capital San Felipe	550	163
549	San Javier	551	163
550	Albarico	552	163
551	Albarico	553	164
552	Albarico	554	165
553	Capital Veroes	555	166
554	El Guayabo	556	166
555	Fernando Girón Tovar	557	167
556	Luis Alberto Gómez	558	167
557	Parhueña	559	167
558	Platanillal	560	167
559	Huachamacare	561	168
560	Marawaka	562	168
561	Mavaca	563	168
562	Sierra Parima	564	168
563	Ucata	565	169
564	Yapacana	566	169
565	Caname	567	169
566	Victorino	568	170
567	Samariapo	569	171
568	Sipapo	570	171
569	Munduapo	571	171
570	Guayapo	572	171
571	Alto Ventuari	573	172
572	Medio Ventuari	574	172
573	Bajo Ventuari	575	172
574	Solano	576	173
575	Casiquiare	577	173
576	Cocuy	578	173
577	Urbana San Fernando	579	174
578	El Recreo	580	174
579	Peñalver	581	174
580	San Rafael de Atamaica	582	174
581	Urbana Achaguas	583	175
582	El Yagual	584	175
583	Guachara	585	175
584	Queseras del Medio	586	175
585	Mucuritas	587	175
586	Urbana San Juan de Payara	588	176
587	Codazzi	589	176
588	Cunaviche	590	176
589	Urbana Bruzual	591	177
590	Quintero	592	177
591	Rincón Hondo	593	177
592	Mantecal	594	177
593	San Vicente	595	177
594	Urbana Biruaca	596	178
595	Urbana Guasdualito	597	179
596	Aramendi	598	179
597	El Amparo	599	179
598	San Camilo	600	179
599	Urdaneta	601	179
600	Urbana Elorza	602	180
601	La Trinidad	603	180
602	Urbana Las Delicias	604	181
603	Urbana Madre María de San José	605	181
604	 Urbana Joaquín Crespo	606	181
605	 Urbana Pedro José Ovalles	607	181
606	Urbana José Casanova Godoy	608	181
607	Urbana Andrés Eloy Blanco	609	181
608	Urbana Los Tacariguas	610	181
609	Choroní	611	181
610	Francisco Linares Alcántara	612	182
611	Francisco de Miranda	613	182
612	Monseñor Feliciano González	614	182
613	Mario Briceño Iragorry	615	183
614	Caña de Azúcar	616	183
615	Santiago Mariño	617	184
616	Arévalo Aponte	618	184
617	Chuao	619	184
618	Alfredo Pacheco Miranda	620	184
619	Samán de Güere	621	184
620	Samán de Güere	622	185
621	Urbana Juan Vicente Bolívar	623	186
622	Castor Nieves Ríos	624	186
623	Las Guacamayas	625	186
624	Pao de Zárate	626	186
625	Zuata	627	186
626	Zuata	628	187
627	Zuata	629	188
628	Zamora	631	190
629	San Francisco de Asís	632	190
630	Valles de Tucutunemo	633	190
631	Augusto Mijares	634	190
632	Magdaleno	635	190
633	Sucre	636	191
634	Bella Vista	637	191
635	Bella Vista	638	192
636	Libertador	639	193
637	San Martín de Porres	640	193
638	Camatagua	641	194
639	Carmen de Cura	642	194
640	San Casimiro	643	195
641	Güiripa	644	195
642	Colonia Tovar	630	189
643	Ollas de Caramacate	645	195
644	Valle Morín	646	195
645	Valle Morín	647	196
646	Urdaneta	648	197
647	Las Peñitas	649	197
648	San Francisco de Cara	650	197
649	Taguay	651	197
650	Santos Michelena	652	198
651	Tiara	653	198
652	Capital San Juan de Los Morros	654	199
653	Cantagallo	655	199
654	Parapara	656	199
655	Calabozo	657	200
656	El Calvario	658	200
657	El Rastro	659	200
658	Guardatinajas	660	200
659	Valle de la Pascua	661	201
660	Espino	662	201
661	Chaguaramas	663	202
662	El Socorro	664	203
663	Capital Las Mercedes	665	204
664	Cabruta	666	204
665	Santa Rita de Manapire	667	204
666	Tucupido	668	205
667	San Rafael de Laya	669	205
668	Santa María de Ipire	670	206
669	Altamira	671	206
670	Capital Altagracia de Orituco	672	207
671	Lezama	673	207
672	Libertad de Orituco	674	207
673	Paso Real de Macaira	675	207
674	San Francisco de Macaira	676	207
675	San Rafael de Orituco	677	207
676	Soublette	678	207
677	San José de Guaribe	679	208
678	Capital Zaraza	680	209
679	San José de Unare	681	209
680	Capital Ortíz	682	210
681	San Lorenzo de Tiznado	683	210
682	San Francisco de Tiznado	684	210
683	San José de Tiznado	685	210
684	Capital Camaguán	686	211
685	Puerto Miranda	687	211
686	Uverito	688	211
687	San Gerónimo de Guayabal	689	212
688	Cazorla	690	212
689	Capital El Sombrero	691	213
690	Sosa	692	213
691	San Antonio	693	214
692	San Gabriel	694	214
693	Santa Ana	695	214
694	Guzmán Guillermo	696	214
695	Mitare	697	214
696	Río Seco	698	214
697	Sabaneta	699	214
698	Carirubana	700	215
699	Norte	701	215
700	Punta Cardón	702	215
701	Santa Ana	703	215
702	Pueblo Nuevo	704	216
703	Adícora	705	216
704	Baraived	706	216
705	Buena Vista	707	216
706	Jadacaquiva	708	216
707	Moruy	709	216
708	Adaure	710	216
709	El Hato	711	216
710	El Vínculo	712	216
711	La Vela de Coro	713	217
712	Acurigua	714	217
713	Guaibacoa	715	217
714	Las Calderas	716	217
715	Macoruca	717	217
716	Puerto Cumarebo	718	218
717	La Ciénaga	719	218
718	La Soledad	720	218
719	Pueblo Cumarebo	721	218
720	Zazárida	722	218
721	Píritu	723	219
722	San José de la Costa	724	219
723	San José de la Costa	725	220
724	Tucacas	726	221
725	Boca de Aroa	727	221
726	Chichiriviche	728	222
727	Boca de Tocuyo	729	222
728	Tocuyo de la Costa	730	222
729	Tocuyo de la Costa	731	223
730	San Juan de los Cayos	732	224
731	Capadare	733	224
732	La Pastora	734	224
733	Libertador	735	224
734	Jacura	736	225
735	Agua Linda	737	225
736	Araurima	738	225
737	Araurima	739	226
738	Araurima	740	227
739	Los Taques	741	228
740	Judibana	742	228
741	Churuguara	743	229
742	El Paují	744	229
743	Independencia	745	229
744	Agua Larga	746	229
745	Mapararí	747	229
746	Santa Cruz de Bucaral	748	230
747	El Charal	749	230
748	Las Vegas del Tuy	750	230
749	Cabure	751	231
750	Colina	752	231
751	Curimagua	753	231
752	Pedregal	754	232
753	Agua Clara	755	232
754	Avaria	756	232
755	Piedra Grande	757	232
756	Purureche	758	232
757	San Luis	759	233
758	Aracua	760	233
759	La Peña	761	233
760	Sucre	762	234
761	Pecaya	763	234
762	Mene de Mauroa	764	235
763	Casigua	765	235
764	San Félix	766	235
765	Capatárida	767	236
766	Bariro	768	236
767	Borojó	769	236
768	Guajiro	770	236
769	Seque	771	236
770	Zazárida	772	236
771	Zazárida	773	237
772	Urumaco	774	238
773	Bruzual	775	238
774	Bolívar	776	239
775	Cacique Mara	777	239
776	Cecilio Acosta	778	239
777	Cristo de Aranza	779	239
778	Manuel Dagnino	780	239
779	San Isidro	781	239
780	Santa Lucía	782	239
781	Francisco Eugenio Bustamante	783	239
782	Coquivacoa	784	239
783	Olegario Villalobos	785	239
784	Venancio Pulgar	786	239
785	Antonio Borjas Romero	787	239
786	Caracciolo Parra Pérez	788	239
787	Chiquinquirá	789	239
788	Idelfonso Vásquez	790	239
789	Juana de Ávila	791	239
790	Raúl Leoni	792	239
791	Luis Hurtado Higuera	793	240
792	San Francisco	794	240
793	El Bajo	795	240
794	Domitila Flores	796	240
795	Francisco Ochoa	797	240
796	Marcial Hernández	798	240
797	Los Cortijos	799	240
798	Ambrosio	800	241
799	Carmen Herrera	801	241
800	Germán Ríos Linares	802	241
801	La Rosa	803	241
802	Jorge Hernández	804	241
803	Rómulo Betancourt	805	241
804	San Benito	806	241
805	Arístides Calvani	807	241
806	Punta Gorda	808	241
807	Santa Rita	809	242
808	El Mene	810	242
809	José Cenovio Urribarri	811	242
810	Pedro Lucas Urribarri	812	242
811	Alonso de Ojeda	813	243
812	Libertad	814	243
813	Campo Lara	815	243
814	Eleazar López Contreras	816	243
815	Venezuela	817	243
816	Venezuela	818	244
817	Rafael María Baralt	819	244
818	Rafael Urdaneta	820	244
819	Tamare	821	245
820	La Sierrita	822	245
821	Las Parcelas	823	245
822	Luis de Vicente	824	245
823	Monseñor Marcos Sergio Godoy	825	245
824	Ricaurte	826	245
825	Alta Guajira	827	246
826	Elías Sánchez Rubio	828	246
827	Guajira	829	246
828	Isla de Toas	830	247
829	Monagas	831	247
830	San Carlos del Zulia	832	248
831	Moralito	833	248
832	Santa Bárbara	834	248
833	Santa Cruz del Zulia	835	248
834	Urribarri	836	248
835	Encontrados	837	249
836	Udón Pérez	838	249
837	Udón Pérez	839	250
838	Barí	840	250
839	Gibraltar	841	251
840	Heras	842	251
841	Monseñor Arturo Celestino Álvarez	843	251
842	Rómulo Gallegos	844	251
843	Simón Rodríguez	845	252
844	Carlos Quevedo	846	252
845	Francisco Javier Pulgar	847	252
846	Libertad	848	253
847	Bartolomé de las Casas	849	253
848	Río Negro	850	253
849	San José de Perijá	851	253
850	La Concepción	852	254
851	José Ramón Yépez	853	254
852	Mariano Parra León	854	254
853	San José	855	254
854	La Concepción	856	255
855	Andrés Bello	857	255
856	Chiquinquirá	858	255
857	El Carmelo	859	255
858	Potreritos	860	255
859	Altagracia	861	256
860	Ana María Campos	862	256
861	Faría	863	256
862	San Antonio	864	256
863	San José	865	256
864	San Timoteo	866	257
865	General Urdaneta	867	257
866	Libertador	868	257
867	Manuel Guanipa Matos	869	257
868	Marcelino Briceño	870	257
869	Pueblo Nuevo	871	257
870	La Victoria	872	258
871	Rafael Urdaneta	873	258
872	Raúl Cuenca	874	258
873	Raúl Cuenca	875	259
874	El Rosario	876	259
875	Donaldo García	877	259
876	Sixto Zambrano	878	259
877	El Carmen	879	260
878	San Cristóbal	880	260
879	Bergantín	881	260
880	Caigua	882	260
881	El Pilar	883	260
882	Naricual	884	260
883	Capital Aragua	885	261
884	Cachipo	886	261
885	Capital Anaco	887	262
886	San Joaquín	888	262
887	Capital de Boca de Chávez	889	263
888	Capital Pedro María Freites	890	264
889	Santa Rosa	891	264
890	Urica	892	264
891	Capital Manuel Ezequiel Bruzual	893	265
892	Sabana de Uchire	894	265
893	Capital Francisco del Carmen Carvajal	895	266
894	Santa Bárbara	896	266
895	Capital Independencia	897	267
896	Mamo	898	267
897	Capital Guanta	899	268
898	Chorrerón	900	268
899	Capital Diego Bautista Urbaneja	901	269
900	El Morro	902	269
901	Capital Juan Manuel Cajigal	903	270
902	San Pablo	904	270
903	Capital Fernando de Peñalver	905	271
904	San Miguel	906	271
905	Sucre	907	271
906	Capital Píritu	908	272
907	San Francisco	909	272
908	Capital Puerto La Cruz	910	273
909	Pozuelos	911	273
910	Guanape	912	273
911	Capital Santa Ana	913	274
912	Pueblo Nuevo	914	274
913	Capital Libertad	915	275
914	El Carito	916	275
915	Santa Inés	917	275
916	Edmundo Barrios	918	276
917	Miguel Otero Silva	919	276
918	Capital Sir Arthur Mc Gregor	920	277
919	Tomás Alfaro Calatrava	921	277
920	Capital Francisco de Miranda	922	278
921	Atapirire	923	278
922	Boca del Pao	924	278
923	El Pao	925	278
924	Múcura	926	279
925	Capital José Gregorio Monagas	927	280
926	Piar	928	280
927	San Diego de Cabrutica	929	280
928	Santa Clara	930	280
929	Uverito	931	280
930	Zuata	932	280
931	Agua Salada	933	281
932	Catedral	934	281
933	José Antonio Páez	935	281
934	La Sabanita	936	281
935	Marhuanta	937	281
936	Vista Hermosa	938	281
937	Orinoco	939	281
938	Panapana	940	281
939	Zea	941	281
940	Sección Capital Sucre	942	282
941	Aripao	943	282
942	Guarataro	944	282
943	Las Majadas	945	282
944	Moitaco	946	282
945	Sección Capital Angostura	947	283
946	Barceloneta	948	283
947	San Francisco	949	283
948	Santa Bárbara	950	283
949	Santa Bárbara	951	284
950	Sección Capital Cedeño	952	284
951	Altagracia	953	284
952	Ascensión Farreras	954	284
953	Guaniamo	955	284
954	La Urbana	956	284
955	Pijiguaos	957	284
956	Sección Capital Gran Sabana	958	285
957	Ikabarú	959	285
958	Ikabarú	960	286
959	Cachamay	961	287
960	Unare	962	287
961	Universidad	963	287
962	Simón Bolívar	964	287
963	Vista al Sol	965	287
964	Pozo Verde	966	287
965	Yocoima	967	287
966	Chirica	968	287
967	Dalla Costa	969	287
968	Once de Abril	970	287
969	Sección Capital Piar	971	288
970	Pedro Cova	972	288
971	Sección Capital Roscio	973	289
972	Salom	974	289
973	Salom	975	290
974	Sección Capital Sifontes	976	291
975	Dalla Costa	977	291
976	San Isidro	978	291
977	Curiapo	979	292
978	Almirante Luis Brión	980	292
979	Francisco Aniceto Lugo	981	292
980	Manuel Renaud	982	292
981	Padre Barral	983	292
982	Santos de Abelgas	984	292
983	Imataca	985	293
984	Cinco de Julio	986	293
985	Juan Bautista Arismendi	987	293
986	Manuel Piar	988	293
987	Rómulo Gallegos	989	293
988	Pedernales	990	294
989	Luis Beltrán Prieto Figueroa	991	294
990	San José	992	295
991	José Vidal Marcano	993	295
992	Juan Millán	994	295
993	Leonardo Ruíz Pineda	995	295
994	Mariscal Antonio José de Sucre	996	295
995	Monseñor Argimiro García	997	295
996	San Rafael	998	295
997	Virgen del Valle	999	295
998	Capital Acosta	1000	296
999	San Francisco	1001	296
1000	San Francisco	1002	297
1001	San Francisco	1003	298
1002	Capital Caripe	1004	299
1003	El Guácharo	1005	299
1004	La Guanota	1006	299
1005	Sabana de Piedra	1007	299
1006	San Agustín	1008	299
1007	Teresén	1009	299
1008	Capital Cedeño	1010	300
1009	Areo	1011	300
1010	San Félix	1012	300
1011	Viento Fresco	1013	300
1012	Capital Ezequiel Zamora	1014	301
1013	El Tejero	1015	301
1014	Capital Libertador	1016	302
1015	Chaguaramas	1017	302
1016	Las Alhuacas	1018	302
1017	Tabasca	1019	302
1018	Capital Maturín	1020	303
1019	Alto de los Godos	1021	303
1020	Boquerón	1022	303
1021	Las Cocuizas	1023	303
1022	San Simón	1024	303
1023	Santa Cruz	1025	303
1024	El Corozo	1026	303
1025	El Furrial	1027	303
1026	Jusepín	1028	303
1027	La Pica	1029	303
1028	San Vicente	1030	303
1029	Capital Piar	1031	304
1030	Aparicio	1032	304
1031	Chaguaramal	1033	304
1032	El Pinto	1034	304
1033	Guanaguana	1035	304
1034	La Toscana	1036	304
1035	Taguaya	1037	304
1036	Capital Púnceres	1038	305
1037	Cachipo	1039	305
1038	Cachipo	1040	306
1039	Capital Sotillo	1041	307
1040	Los Barrancos de Fajardo	1042	307
1041	Los Barrancos de Fajardo	1043	308
1042	Capital Díaz	1046	311
1043	Zabala	1047	311
1044	Capital García	1048	312
1045	Francisco Fajardo	1049	312
1046	Capital Goméz	1051	314
1047	Bolívar	1052	314
1048	Guevara	1053	314
1049	Matasiete	1054	314
1050	Sucre	1055	314
1051	Capital Maneiro	1056	315
1052	Aguirre	1057	315
1053	Capital Marcano	1058	316
1054	Adrián	1059	316
1055	Capital Península de Macanao	1060	317
1056	San Francisco	1061	317
1057	Capital Tubores	1062	318
1058	Los Barales	1063	318
1059	Capital Villalba	1064	319
1060	Vicente Fuentes	1065	319
1061	Altagracia	1066	320
1062	Ayacucho	1067	320
1063	Santa Inés	1068	320
1064	Valentín Valiente	1069	320
1065	San Juan	1070	320
1066	Raúl Leoni	1071	320
1067	Gran Mariscal	1072	320
1068	Araya	1073	321
1069	Chacopata	1074	321
1070	Manicuare	1075	321
1071	Cumanacoa	1076	322
1072	Arenas	1077	322
1073	Aricagua	1078	322
1074	Cocollar	1079	322
1075	San Fernando	1080	322
1076	San Lorenzo	1081	322
1077	San Lorenzo	1082	323
1078	San Lorenzo	1083	324
1079	Villa Frontado (Muelle de Cariaco)	1084	325
1080	Catuaro	1085	325
1081	Rendón	1086	325
1082	Santa Cruz	1087	325
1083	Santa María	1088	325
1084	Bolívar	1089	326
1085	Macarapana	1090	326
1086	Santa Catalina	1091	326
1087	Santa Rosa	1092	326
1088	Santa Teresa	1093	326
1089	El Pilar	1094	327
1090	El Rincón	1095	327
1091	General Francisco Antonio Vásquez	1096	327
1092	Guaraúnos	1097	327
1093	Tunapuicito	1098	327
1094	Unión	1099	327
1095	Tunapuy	1100	328
1096	Campo Elías	1101	328
1097	Yaguaraparo	1102	329
1098	El Paujil	1103	329
1099	Libertad	1104	329
1100	Irapa	1105	330
1101	Campo Claro	1106	330
1102	Marabal	1107	330
1103	San Antonio de Irapa	1108	330
1104	Soro	1109	330
1105	Güiria	1110	331
1106	Bideau	1111	331
1107	Cristóbal Colón	1112	331
1108	Punta de Piedras	1113	331
1109	Río Caribe	1114	332
1110	Antonio José de Sucre	1115	332
1111	El Morro de Puerto Santo	1116	332
1112	Puerto Santo	1117	332
1113	San Juan de Las Galdonas	1118	332
1114	San José de Aerocuar	1119	333
1115	Tavera Acosta	1120	333
1116	Mariño	1121	334
1117	Rómulo Gallegos	1122	334
1118	La Guaira	1123	335
1119	Maiquetía	1124	335
1120	Carlos Soublette	1125	335
1121	Urimare	1126	335
1122	Catia La Mar	1127	335
1123	Macuto	1128	335
1124	Caraballeda	1129	335
1125	Naiguatá	1130	335
1126	C.M. San José de Paraguachi	1044	309
1127	C.M. Porlamar	1050	313
1128	Carayaca	1131	335
1129	Caruao	1132	335
1130	La Asunción	1045	310
1131	San Josecito	326	87
1132	El Cafetal	1133	3
1133	Cocorote	540	156
\.


--
-- TOC entry 3553 (class 0 OID 24811)
-- Dependencies: 223
-- Data for Name: m004t_regiones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m004t_regiones (id_region, nb_region) FROM stdin;
2	ANDINA
1	CAPITAL
3	CENTRAL
4	CENTRO LLANO
5	OCCIDENTAL
6	ORIENTAL
7	VARGAS
8	NACIONAL
\.


--
-- TOC entry 3589 (class 0 OID 25269)
-- Dependencies: 259
-- Data for Name: m005t_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m005t_materias (id_materia, co_materia, nb_materia, nu_credito, tp_materia, hr_semanal, id_prelacion, id_estatus, created_at, updated_at) FROM stdin;
1	LPTC-DT14	Lenguaje Plástico y teoría del color	14	1	12	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
2	DAMG3-DT9	Dibujo Analítico. Matemática y Geometría	9	1	8	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
3	STC-DS2	Seminario Tecnico Conceptual	2	2	2	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
5	GD-DT5	Gestión de Datos, Bases de Datos y Sistemas de Colecciones	5	1	4	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
6	GMI-DT8	Gestión de Museos I	8	1	6	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
7	CPC-DT5	Conservación Preventiva de Colecciones	5	1	4	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
8	CMI-DS5	Comunicación de Museos I	5	2	4	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
9	STC-DS2	Seminario técnico conceptual	2	2	2	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
10	PCI-DP10	Proyecto de Creación I	10	2	10	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
4	PCI-DP10	Proyecto de Creación I	10	5	8	t	t	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3591 (class 0 OID 25293)
-- Dependencies: 261
-- Data for Name: m006t_carreras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m006t_carreras (id_carrera, co_carrera, nb_carrera, tp_carrera, id_ciclo, id_estatus, created_at, updated_at) FROM stdin;
8	CBC-APP35	ARTES PLÁSTICAS	PNF	BÁSICO COMÚN	t	2023-07-27 15:26:56	2023-07-27 15:26:56
9	CBC-MP35	ARTES PLÁSTICAS, MUSEOLOGÍA	PNF	BÁSICO COMÚN	t	2023-07-27 15:26:56	2023-07-27 15:26:56
10	CBC-OP35	ORFEBRERÍA Y JOYERÍA	PNF	BÁSICO COMÚN	t	2023-07-27 15:26:56	2023-07-27 15:26:56
11	CBC-AAP35	ARTES AUDIOVISUALES	PNF	BÁSICO COMÚN	t	2023-07-27 15:26:56	2023-07-27 15:26:56
12	CIDC-DP35	DANZA	PNF	BÁSICO COMÚN	t	2023-07-27 15:26:56	2023-07-27 15:26:56
14	CBC-DP35	DANZA. DANZA CREATIVA, COREOGRAFÍA, TRADICIONAL POPULAR.	PNF	BÁSICO COMÚN	t	2023-07-27 15:26:56	2023-07-27 15:26:56
13	CIDC-DP35	DANZA. Danza Contemporánea.	PNF	BÁSICO INICIAL	t	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3555 (class 0 OID 24900)
-- Dependencies: 225
-- Data for Name: m007t_tipo_periodo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m007t_tipo_periodo (id_periodo, cod_periodo, nb_periodo, tx_descripcion, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3557 (class 0 OID 24909)
-- Dependencies: 227
-- Data for Name: m008t_tipo_personal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m008t_tipo_personal (id_tpersonal, cod_tpersonal, nb_tpersonal, tx_tpersonal, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3558 (class 0 OID 24921)
-- Dependencies: 228
-- Data for Name: m009t_discapacidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m009t_discapacidad (id_discapacidad, nb_discapacidad, tx_descripcion, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3559 (class 0 OID 24933)
-- Dependencies: 229
-- Data for Name: m010t_estatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m010t_estatus (id_estatu, nb_estatu, tx_descripcion, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3590 (class 0 OID 25275)
-- Dependencies: 260
-- Data for Name: m010t_sedes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m010t_sedes (id_sede, co_sede, nb_sede, tx_direccion, id_estado, id_municipio, id_parroquia, id_estatus, created_at, updated_at) FROM stdin;
1	S001CCS	BELLAS ARTES	LOS CAOBOS	1	1	1	t	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3570 (class 0 OID 25108)
-- Dependencies: 240
-- Data for Name: m011t_profesion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m011t_profesion (id_profesion, nb_profesion, tx_descripcion, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3574 (class 0 OID 25139)
-- Dependencies: 244
-- Data for Name: m012t_tipo_materia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m012t_tipo_materia (id_tmateria, nb_tmateria, id_estatus, created_at, updated_at) FROM stdin;
1	Taller	t	2023-07-27 15:26:56	2023-07-27 15:26:56
2	Seminario	t	2023-07-27 15:26:56	2023-07-27 15:26:56
3	Electiva	t	2023-07-27 15:26:56	2023-07-27 15:26:56
4	Trayecto	t	2023-07-27 15:26:56	2023-07-27 15:26:56
5	Proyecto	t	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3577 (class 0 OID 25162)
-- Dependencies: 247
-- Data for Name: m013t_dias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m013t_dias (id_dia, nb_dia, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3579 (class 0 OID 25169)
-- Dependencies: 249
-- Data for Name: m014t_estatus_estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m014t_estatus_estudiante (id_activo, nb_activo, tx_descripcion, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3588 (class 0 OID 25231)
-- Dependencies: 258
-- Data for Name: m015t_secciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m015t_secciones (id_seccion, nb_seccion, cap_seccion, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3586 (class 0 OID 25218)
-- Dependencies: 256
-- Data for Name: m016t_aulas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m016t_aulas (id_aula, co_aula, nb_aula, cap_aula, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3593 (class 0 OID 25300)
-- Dependencies: 263
-- Data for Name: m017t_trayectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.m017t_trayectos (id_trayecto, nb_trayecto, tx_descripcion, created_at, updated_at) FROM stdin;
1	Trayecto I	Semestre I	2023-07-27 15:26:56	2023-07-27 15:26:56
2	Trayecto II	Semestre II	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3568 (class 0 OID 25088)
-- Dependencies: 238
-- Data for Name: r001t_docente_materia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.r001t_docente_materia (id_dicta, id_materia, id_personal, id_carrera, id_estatus, hora_semanal, id_tpcurricular, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3594 (class 0 OID 25306)
-- Dependencies: 264
-- Data for Name: r002t_carrera_materia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.r002t_carrera_materia (id_carrema, id_carrera, id_materia, id_sede, id_estatus, hora_semanal, id_tpcurricular, id_trayecto, created_at, updated_at) FROM stdin;
1	8	1	1	t	12	1	1	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3575 (class 0 OID 25145)
-- Dependencies: 245
-- Data for Name: r003t_inscripcion_materia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.r003t_inscripcion_materia (id_inscrito, id_inscripcion, id_materia, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3566 (class 0 OID 25062)
-- Dependencies: 236
-- Data for Name: t001t_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t001t_usuarios (id_usuario, tx_clave, user_name, bl_status, rol, ced_usuario, nb_usuario, ape_usuario, created_at, updated_at) FROM stdin;
3	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	jpineda	t	2	56156165	Juan	Pineda	2023-07-27 15:26:56-04	2023-07-27 15:26:56-04
4	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	gmarcano	t	2	28484689	Gabriel	Marcano	2023-07-27 15:26:56-04	2023-07-27 15:26:56-04
\.


--
-- TOC entry 3554 (class 0 OID 24877)
-- Dependencies: 224
-- Data for Name: t002t_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t002t_roles (id_rol, nb_rol, created_at, updated_at) FROM stdin;
2	Administración	2023-07-27 15:26:56	2023-07-27 15:26:56
3	Inventario	2023-07-27 15:26:56	2023-07-27 15:26:56
\.


--
-- TOC entry 3571 (class 0 OID 25114)
-- Dependencies: 241
-- Data for Name: t003t_personal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t003t_personal (id_personal, nac_personal, ced_personal, nb_personal, ape_personal, tlf_fijo, tlf_movil, correo, id_estatus, id_tpersonal, carga_horaria, id_profesion, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3560 (class 0 OID 24960)
-- Dependencies: 230
-- Data for Name: t004t_estudiantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t004t_estudiantes (id_estudiante, nac_estudiante, ced_estudiante, nb_estudiante, ape_estudiante, sexo_estudiante, fechanac_estudiante, id_discapacidad, tx_direccion, id_estado, id_municipio, id_parroquia, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3583 (class 0 OID 25195)
-- Dependencies: 253
-- Data for Name: t005t_inscripcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t005t_inscripcion (id_inscripcion, id_estudiante, id_periodo, id_activo, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3595 (class 0 OID 25312)
-- Dependencies: 265
-- Data for Name: t006t_periodos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t006t_periodos (id_periodo, co_periodo, id_tperiodo, fe_inicio, fe_fin, fe_inicio_inscripcion, fe_fin_inscripcion, fe_inicio_oferta, fe_fin_oferta, fe_inicio_retiro, fe_fin_retiro, fe_inicio_notas, fe_fin_notas, id_estatus, id_trayecto, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3587 (class 0 OID 25225)
-- Dependencies: 257
-- Data for Name: t007t_horario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t007t_horario (id_horario, id_personal, id_materia, id_sede, id_periodo, id_dia, id_carrera, id_aula, id_seccion, hora_inicio, hora_fin, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3582 (class 0 OID 25189)
-- Dependencies: 252
-- Data for Name: t008t_oferta_academica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t008t_oferta_academica (id_oferta, id_periodo, id_horario, nu_cupos, nu_seccion, id_estatus, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 255
-- Name: aulas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aulas_id_seq', 1, false);


--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 213
-- Name: m001t_estados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m001t_estados_id_seq', 1, false);


--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 214
-- Name: m002t_municipios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m002t_municipios_id_seq', 1, false);


--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 215
-- Name: m003t_parroquias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m003t_parroquias_id_seq', 1, false);


--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 221
-- Name: m005t_materias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m005t_materias_id_seq', 10, true);


--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 219
-- Name: m006t_carreras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m006t_carreras_id_seq', 14, true);


--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 220
-- Name: m007t_tipo_periodo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m007t_tipo_periodo_id_seq', 1, false);


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 226
-- Name: m008t_tipopersonal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m008t_tipopersonal_id_seq', 1, false);


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 212
-- Name: m009t_discapacidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m009t_discapacidad_id_seq', 1, false);


--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 222
-- Name: m010t_estatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m010t_estatus_id_seq', 1, false);


--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 231
-- Name: m010t_sedes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m010t_sedes_id_seq', 1, true);


--
-- TOC entry 3612 (class 0 OID 0)
-- Dependencies: 239
-- Name: m011t_profesion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m011t_profesion_id_seq', 1, false);


--
-- TOC entry 3613 (class 0 OID 0)
-- Dependencies: 243
-- Name: m012t_tipo_materia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m012t_tipo_materia_id_seq', 5, true);


--
-- TOC entry 3614 (class 0 OID 0)
-- Dependencies: 246
-- Name: m013t_dias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m013t_dias_id_seq', 1, false);


--
-- TOC entry 3615 (class 0 OID 0)
-- Dependencies: 248
-- Name: m014t_estatus_estudiante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m014t_estatus_estudiante_id_seq', 1, false);


--
-- TOC entry 3616 (class 0 OID 0)
-- Dependencies: 262
-- Name: m017t_trayectos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m017t_trayectos_id_seq', 2, true);


--
-- TOC entry 3617 (class 0 OID 0)
-- Dependencies: 216
-- Name: r001t_docente_materia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.r001t_docente_materia_id_seq', 1, false);


--
-- TOC entry 3618 (class 0 OID 0)
-- Dependencies: 237
-- Name: r002t_carrera_materia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.r002t_carrera_materia_id_seq', 1, true);


--
-- TOC entry 3619 (class 0 OID 0)
-- Dependencies: 242
-- Name: r003t_inscripcion_materia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.r003t_inscripcion_materia_id_seq', 1, false);


--
-- TOC entry 3620 (class 0 OID 0)
-- Dependencies: 254
-- Name: secciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.secciones_id_seq', 1, false);


--
-- TOC entry 3621 (class 0 OID 0)
-- Dependencies: 209
-- Name: t001t_usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t001t_usuarios_id_seq', 4, true);


--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 210
-- Name: t002t_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t002t_roles_id_seq', 3, true);


--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 217
-- Name: t003t_personal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t003t_personal_id_seq', 1, false);


--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 211
-- Name: t004t_estudiantes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t004t_estudiantes_id_seq', 1, false);


--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 218
-- Name: t005t_inscripcion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t005t_inscripcion_id_seq', 1, false);


--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 232
-- Name: t006t_periodos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t006t_periodos_id_seq', 1, false);


--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 250
-- Name: t007t_horario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t007t_horario_id_seq', 1, false);


--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 251
-- Name: t008t_oferta_academica_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t008t_oferta_academica_id_seq', 1, false);


--
-- TOC entry 3390 (class 2606 OID 25298)
-- Name: m006t_carreras carreras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m006t_carreras
    ADD CONSTRAINT carreras_pkey PRIMARY KEY (id_carrera);


--
-- TOC entry 3358 (class 2606 OID 25074)
-- Name: t001t_usuarios ced_user_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t001t_usuarios
    ADD CONSTRAINT ced_user_unique UNIQUE (ced_usuario);


--
-- TOC entry 3349 (class 2606 OID 25029)
-- Name: m001t_estados estados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m001t_estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id_estado);


--
-- TOC entry 3347 (class 2606 OID 24965)
-- Name: t004t_estudiantes estudiantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t004t_estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id_estudiante);


--
-- TOC entry 3356 (class 2606 OID 25053)
-- Name: m003t_parroquias i006t_parroquia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m003t_parroquias
    ADD CONSTRAINT i006t_parroquia_pkey PRIMARY KEY (id_parroquia);


--
-- TOC entry 3378 (class 2606 OID 25200)
-- Name: t005t_inscripcion inscripcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t005t_inscripcion
    ADD CONSTRAINT inscripcion_pkey PRIMARY KEY (id_inscripcion);


--
-- TOC entry 3386 (class 2606 OID 25274)
-- Name: m005t_materias m005t_materias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m005t_materias
    ADD CONSTRAINT m005t_materias_pkey PRIMARY KEY (id_materia);


--
-- TOC entry 3339 (class 2606 OID 24905)
-- Name: m007t_tipo_periodo m007t_tipo_periodo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m007t_tipo_periodo
    ADD CONSTRAINT m007t_tipo_periodo_pkey PRIMARY KEY (id_periodo);


--
-- TOC entry 3341 (class 2606 OID 24914)
-- Name: m008t_tipo_personal m008t_tipo_personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m008t_tipo_personal
    ADD CONSTRAINT m008t_tipo_personal_pkey PRIMARY KEY (id_tpersonal);


--
-- TOC entry 3343 (class 2606 OID 24926)
-- Name: m009t_discapacidad m009t_discapacidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m009t_discapacidad
    ADD CONSTRAINT m009t_discapacidades_pkey PRIMARY KEY (id_discapacidad);


--
-- TOC entry 3345 (class 2606 OID 24938)
-- Name: m010t_estatus m010t_estatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m010t_estatus
    ADD CONSTRAINT m010t_estatus_pkey PRIMARY KEY (id_estatu);


--
-- TOC entry 3388 (class 2606 OID 25280)
-- Name: m010t_sedes m010t_sedes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m010t_sedes
    ADD CONSTRAINT m010t_sedes_pkey PRIMARY KEY (id_sede);


--
-- TOC entry 3364 (class 2606 OID 25113)
-- Name: m011t_profesion m011t_profesion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m011t_profesion
    ADD CONSTRAINT m011t_profesion_pkey PRIMARY KEY (id_profesion);


--
-- TOC entry 3368 (class 2606 OID 25144)
-- Name: m012t_tipo_materia m012t_tipo_materia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m012t_tipo_materia
    ADD CONSTRAINT m012t_tipo_materia_pkey PRIMARY KEY (id_tmateria);


--
-- TOC entry 3372 (class 2606 OID 25167)
-- Name: m013t_dias m013t_dias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m013t_dias
    ADD CONSTRAINT m013t_dias_pkey PRIMARY KEY (id_dia);


--
-- TOC entry 3374 (class 2606 OID 25174)
-- Name: m014t_estatus_estudiante m014t_estatus_estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m014t_estatus_estudiante
    ADD CONSTRAINT m014t_estatus_estudiante_pkey PRIMARY KEY (id_activo);


--
-- TOC entry 3384 (class 2606 OID 25236)
-- Name: m015t_secciones m015t_secciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m015t_secciones
    ADD CONSTRAINT m015t_secciones_pkey PRIMARY KEY (id_seccion);


--
-- TOC entry 3380 (class 2606 OID 25223)
-- Name: m016t_aulas m016t_aulas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m016t_aulas
    ADD CONSTRAINT m016t_aulas_pkey PRIMARY KEY (id_aula);


--
-- TOC entry 3392 (class 2606 OID 25305)
-- Name: m017t_trayectos m017t_trayectos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m017t_trayectos
    ADD CONSTRAINT m017t_trayectos_pkey PRIMARY KEY (id_trayecto);


--
-- TOC entry 3353 (class 2606 OID 25041)
-- Name: m002t_municipios municipio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m002t_municipios
    ADD CONSTRAINT municipio_pkey PRIMARY KEY (id_municipio);


--
-- TOC entry 3366 (class 2606 OID 25119)
-- Name: t003t_personal personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t003t_personal
    ADD CONSTRAINT personal_pkey PRIMARY KEY (id_personal);


--
-- TOC entry 3362 (class 2606 OID 25093)
-- Name: r001t_docente_materia r001t_materia_personal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.r001t_docente_materia
    ADD CONSTRAINT r001t_materia_personal_pkey PRIMARY KEY (id_dicta);


--
-- TOC entry 3394 (class 2606 OID 25311)
-- Name: r002t_carrera_materia r002t_carrera_materia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.r002t_carrera_materia
    ADD CONSTRAINT r002t_carrera_materia_pkey PRIMARY KEY (id_carrema);


--
-- TOC entry 3370 (class 2606 OID 25150)
-- Name: r003t_inscripcion_materia r003t_inscripcion_materia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.r003t_inscripcion_materia
    ADD CONSTRAINT r003t_inscripcion_materia_pkey PRIMARY KEY (id_inscrito);


--
-- TOC entry 3335 (class 2606 OID 24815)
-- Name: m004t_regiones regiones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m004t_regiones
    ADD CONSTRAINT regiones_pkey PRIMARY KEY (id_region);


--
-- TOC entry 3337 (class 2606 OID 24882)
-- Name: t002t_roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t002t_roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 3396 (class 2606 OID 25317)
-- Name: t006t_periodos t006t_periodos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t006t_periodos
    ADD CONSTRAINT t006t_periodos_pkey PRIMARY KEY (id_periodo);


--
-- TOC entry 3382 (class 2606 OID 25230)
-- Name: t007t_horario t007t_horario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t007t_horario
    ADD CONSTRAINT t007t_horario_pkey PRIMARY KEY (id_horario);


--
-- TOC entry 3376 (class 2606 OID 25194)
-- Name: t008t_oferta_academica t008t_oferta_academica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t008t_oferta_academica
    ADD CONSTRAINT t008t_oferta_academica_pkey PRIMARY KEY (id_oferta);


--
-- TOC entry 3360 (class 2606 OID 25072)
-- Name: t001t_usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t001t_usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3351 (class 1259 OID 25047)
-- Name: fki_FK_estado_munucipio_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_estado_munucipio_id" ON public.m002t_municipios USING btree (id_estado);


--
-- TOC entry 3350 (class 1259 OID 25035)
-- Name: fki_FK_estado_regiones_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_estado_regiones_id" ON public.m001t_estados USING btree (id_region);


--
-- TOC entry 3354 (class 1259 OID 25059)
-- Name: fki_FK_municipio_parroquia_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_municipio_parroquia_id" ON public.m003t_parroquias USING btree (id_municipio);


--
-- TOC entry 3398 (class 2606 OID 25042)
-- Name: m002t_municipios FK_estado_munucipio_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m002t_municipios
    ADD CONSTRAINT "FK_estado_munucipio_id" FOREIGN KEY (id_estado) REFERENCES public.m001t_estados(id_estado);


--
-- TOC entry 3397 (class 2606 OID 25030)
-- Name: m001t_estados FK_estado_regiones_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m001t_estados
    ADD CONSTRAINT "FK_estado_regiones_id" FOREIGN KEY (id_region) REFERENCES public.m004t_regiones(id_region);


--
-- TOC entry 3399 (class 2606 OID 25054)
-- Name: m003t_parroquias FK_municipio_parroquia_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m003t_parroquias
    ADD CONSTRAINT "FK_municipio_parroquia_id" FOREIGN KEY (id_municipio) REFERENCES public.m002t_municipios(id_municipio);


-- Completed on 2023-07-27 19:26:34

--
-- PostgreSQL database dump complete
--

