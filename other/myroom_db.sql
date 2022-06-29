--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Ubuntu 13.7-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-06-29 14:56:35

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

DROP DATABASE daqrv81u7jb4a;
--
-- TOC entry 4052 (class 1262 OID 20918408)
-- Name: daqrv81u7jb4a; Type: DATABASE; Schema: -; Owner: gsjydlkxutwswk
--

CREATE DATABASE daqrv81u7jb4a WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE daqrv81u7jb4a OWNER TO gsjydlkxutwswk;

\connect daqrv81u7jb4a

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
-- TOC entry 205 (class 1259 OID 23330231)
-- Name: BasketOrders; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."BasketOrders" (
    uuid uuid NOT NULL,
    status integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUuid" uuid,
    "ProductUuid" uuid
);


ALTER TABLE public."BasketOrders" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 202 (class 1259 OID 23330184)
-- Name: Categories; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."Categories" (
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    "ENname" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categories" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 204 (class 1259 OID 23330211)
-- Name: Comments; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."Comments" (
    uuid uuid NOT NULL,
    content text NOT NULL,
    "productRate" double precision DEFAULT '0'::double precision NOT NULL,
    "selfRate" double precision DEFAULT '0'::double precision,
    "rateCount" double precision NOT NULL,
    "postedAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUuid" uuid,
    "ProductUuid" uuid
);


ALTER TABLE public."Comments" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 207 (class 1259 OID 23330263)
-- Name: Orders; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."Orders" (
    uuid uuid NOT NULL,
    "daliveryDate" timestamp with time zone NOT NULL,
    count integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ProductUuid" uuid
);


ALTER TABLE public."Orders" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 206 (class 1259 OID 23330246)
-- Name: ProductPhotos; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."ProductPhotos" (
    uuid uuid NOT NULL,
    url character varying(255),
    "publicID" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ProductUuid" uuid
);


ALTER TABLE public."ProductPhotos" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 203 (class 1259 OID 23330196)
-- Name: Products; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."Products" (
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    price double precision NOT NULL,
    "madeIn" character varying(255) NOT NULL,
    materials character varying(255)[] NOT NULL,
    dimensions double precision[] NOT NULL,
    weight double precision NOT NULL,
    warranty integer,
    count integer,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "CategoryUuid" uuid
);


ALTER TABLE public."Products" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 201 (class 1259 OID 23330172)
-- Name: Tokens; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."Tokens" (
    uuid uuid NOT NULL,
    value uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUuid" uuid
);


ALTER TABLE public."Tokens" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 200 (class 1259 OID 23330161)
-- Name: Users; Type: TABLE; Schema: public; Owner: gsjydlkxutwswk
--

CREATE TABLE public."Users" (
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "roleUUID" uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
    email character varying(255) NOT NULL,
    phone character varying(255),
    "photoURL" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO gsjydlkxutwswk;

--
-- TOC entry 4044 (class 0 OID 23330231)
-- Dependencies: 205
-- Data for Name: BasketOrders; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('d6681f41-d842-44ad-bb28-04a5ab2e32a2', 0, '2022-06-19 23:13:53.632+00', '2022-06-19 23:13:55.664+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ec646238-a6ee-406c-a1aa-d867819df5d6', 3, '2022-06-11 15:49:47.572+00', '2022-06-18 19:42:06.051+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('353d11a9-1e81-445c-b045-197840f71543', 3, '2022-06-15 08:59:32.748+00', '2022-06-18 19:49:06.326+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('bcf6ed91-0637-49c5-986d-ab196a597422', 0, '2022-06-19 23:15:27.956+00', '2022-06-19 23:15:29.527+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('3ccb340c-cf40-4e17-beb7-47bc105bba53', 4, '2022-06-15 21:23:34.488+00', '2022-06-18 20:04:55.091+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '23f7eb91-980e-452e-8df9-cf3600aee85f');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('a23be8d4-8d08-4334-84a7-7ee43c93456f', 4, '2022-06-15 21:20:54.653+00', '2022-06-18 20:04:59.641+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '463c1dd3-a372-4dc0-9a6b-e790d91739fc');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('393f7b34-4f01-4e7a-8457-2107cc23021d', 0, '2022-06-19 11:39:23.685+00', '2022-06-19 11:39:23.903+00', 'c14e31fc-05a4-4a53-af45-e462ca735d76', '8ec77cb9-27f3-4bfb-a192-f45474037481');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('f53eb578-4d5a-423e-ba12-c17f40834b91', 0, '2022-06-20 06:46:29.105+00', '2022-06-20 06:47:12.531+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('da06b943-c3e0-46a4-9fd9-b5a39e29f7af', 0, '2022-06-20 06:46:30.411+00', '2022-06-20 06:47:14.227+00', NULL, '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('cc637378-0a18-4d0a-ba7f-c9fd372ef401', 2, '2022-06-19 11:39:21.567+00', '2022-06-19 19:59:57.136+00', 'c14e31fc-05a4-4a53-af45-e462ca735d76', '8ec77cb9-27f3-4bfb-a192-f45474037481');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('715179b9-f024-47b5-9741-b5ba18bf2cd2', 2, '2022-06-19 19:59:46.501+00', '2022-06-19 19:59:57.136+00', 'c14e31fc-05a4-4a53-af45-e462ca735d76', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ccbbf147-385e-49d3-9e29-aec70d79877d', 4, '2022-06-19 21:13:43.338+00', '2022-06-19 21:13:43.338+00', 'c14e31fc-05a4-4a53-af45-e462ca735d76', '463c1dd3-a372-4dc0-9a6b-e790d91739fc');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('f50868d9-0264-488b-aed1-b2a62a3141f2', 4, '2022-06-18 18:20:19.421+00', '2022-06-20 06:53:03.118+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '69ca64da-6538-4897-bf75-d193008be0bc');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('4489f551-4c06-48bc-950a-41482a1b936c', 4, '2022-06-15 21:20:53.295+00', '2022-06-20 06:53:05.627+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '23f7eb91-980e-452e-8df9-cf3600aee85f');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('df37f587-cfa6-47fe-8206-cc489248f325', 1, '2022-06-16 10:40:27.103+00', '2022-06-16 10:40:27.109+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('d6d9df5d-1dc3-42fd-ae22-0f235edd69a6', 0, '2022-06-19 23:02:27.937+00', '2022-06-19 23:05:20.834+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('17e5a5a1-db74-4372-812a-5d4ddfecdf5b', 0, '2022-06-16 17:04:54.175+00', '2022-06-16 17:04:54.182+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('7ace972a-0004-4f3d-b605-ca99728634ae', 1, '2022-06-16 17:04:57.766+00', '2022-06-16 17:04:57.772+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('35626e95-896e-4fc3-b749-670023ff81aa', 1, '2022-06-19 23:02:22.694+00', '2022-06-19 23:09:05.769+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('b66c2718-48de-4b90-aabe-74993b3e992f', 0, '2022-06-15 09:03:03.835+00', '2022-06-15 09:03:03.981+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '69ca64da-6538-4897-bf75-d193008be0bc');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('b67a9cff-84f9-4057-97c5-6c4b0f63e3e6', 2, '2022-06-20 06:55:56.907+00', '2022-06-20 06:56:09.53+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ec3fed09-66d0-40e1-97fd-933156a918fd', 2, '2022-06-20 06:56:01.279+00', '2022-06-20 06:56:09.53+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '7fb9a336-2e42-423a-b42e-af96e9420779');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('e88f129a-73e2-4a07-8adb-7701f2435c6e', 2, '2022-06-20 06:56:04.564+00', '2022-06-20 06:56:09.53+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '8ec77cb9-27f3-4bfb-a192-f45474037481');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('cfab66b4-605e-43cc-b452-d81cd787a7db', 1, '2022-06-19 23:09:09.763+00', '2022-06-19 23:09:26.125+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ae8cbd65-dd8a-42fe-b868-eedeb1c5facd', 0, '2022-06-18 07:00:22.917+00', '2022-06-18 07:00:22.924+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('6ed3876e-6ac1-492d-9a15-4fac001929ac', 2, '2022-06-15 08:59:45.424+00', '2022-06-18 18:18:08.811+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '69ca64da-6538-4897-bf75-d193008be0bc');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('9c3ef270-0009-4c39-a2b4-e2603928d6d4', 0, '2022-06-19 23:05:24.556+00', '2022-06-19 23:09:45.298+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('a55be976-aa56-480b-9434-facd14433fe2', 0, '2022-06-19 23:09:47.201+00', '2022-06-19 23:12:48.642+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('b00b679d-06c7-4aa6-a4c1-5c44012e2ecf', 1, '2022-06-19 23:12:15.72+00', '2022-06-19 23:12:50.108+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ab6c3564-d14e-46a5-8260-f9aae44178c0', 1, '2022-06-25 07:48:37.748+00', '2022-06-25 07:49:18.176+00', NULL, '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('f11950fd-1aa7-4c9a-94fd-f86469bab705', 1, '2022-06-19 23:13:33.723+00', '2022-06-19 23:13:35.114+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('0f9c2df2-317b-43ae-9876-d22c48ec457f', 2, '2022-06-25 07:49:15.808+00', '2022-06-25 07:49:26.28+00', 'cd6b987b-7719-4374-8820-e478d6c762bb', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('b25a8b7e-0453-46f4-908c-81dde6666e0d', 0, '2022-06-19 23:13:36.862+00', '2022-06-19 23:13:38.026+00', NULL, '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('317c290e-0f55-414d-9903-10e57887fa4d', 0, '2022-06-15 07:43:28.2+00', '2022-06-15 07:43:28.374+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ae34a8ae-6738-45c9-9c5e-4fdd713ea783', 2, '2022-06-25 07:49:40.075+00', '2022-06-25 07:49:46.276+00', 'cd6b987b-7719-4374-8820-e478d6c762bb', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('23aabafc-f68c-43e2-9710-53dfa077f1b1', 2, '2022-06-25 07:49:51.929+00', '2022-06-25 07:50:03.959+00', 'cd6b987b-7719-4374-8820-e478d6c762bb', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."BasketOrders" (uuid, status, "createdAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('35a26e92-0d0f-4b17-92e5-5dd0cb3567b6', 1, '2022-06-25 07:50:08.193+00', '2022-06-25 07:50:08.337+00', 'cd6b987b-7719-4374-8820-e478d6c762bb', '7a448358-431a-46bb-b131-578cc88cc4cb');


--
-- TOC entry 4041 (class 0 OID 23330184)
-- Dependencies: 202
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('98f7c6b5-a927-4338-bcc9-477e4a37437c', 'Кресла', 'armchairs', '2022-06-01 21:38:36.817+00', '2022-06-01 21:38:36.817+00');
INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('a9c71ac9-7f1d-40e2-b422-a7c06f3c1358', 'Кровати', 'beds', '2022-06-01 21:38:36.817+00', '2022-06-01 21:38:36.817+00');
INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('a8116a43-86e6-44ee-bcb9-efb7d191eafe', 'Шкафы', 'wardrobes', '2022-06-01 21:38:36.817+00', '2022-06-01 21:38:36.817+00');
INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('4a222351-7abf-43b9-ac74-bb89c789e955', 'Освещение', 'lighting', '2022-06-01 21:38:36.817+00', '2022-06-01 21:38:36.817+00');
INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('66d16411-769e-4513-9f78-a0cd8021d8f9', 'Столы', 'tables', '2022-06-01 21:38:36.817+00', '2022-06-01 21:38:36.817+00');
INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('7610f95e-65ba-4e7f-abdb-df10f20b65d1', 'Диваны', 'Диваны', '2022-06-01 21:38:36.817+00', '2022-06-20 00:20:54.191+00');
INSERT INTO public."Categories" (uuid, name, "ENname", "createdAt", "updatedAt") VALUES ('ec66ea7f-d56c-41c1-8050-d21d7d022ad5', 'впавп', 'vpavp', '2022-06-20 06:49:53.737+00', '2022-06-20 06:49:53.737+00');


--
-- TOC entry 4043 (class 0 OID 23330211)
-- Dependencies: 204
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."Comments" (uuid, content, "productRate", "selfRate", "rateCount", "postedAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ed88d084-735b-4d94-a4bf-1360cbe9a1d7', 'Хорошая цена и качество, мне очень понравился', 5, 1, 1, '2022-06-16 07:23:53.047+00', '2022-06-16 20:06:37.765+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."Comments" (uuid, content, "productRate", "selfRate", "rateCount", "postedAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('ddb70452-8be8-46cf-90e2-ecd9395f78b5', 'Хороший диван', 4, 10, 18, '2022-06-14 20:40:59.036+00', '2022-06-16 21:02:38.519+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."Comments" (uuid, content, "productRate", "selfRate", "rateCount", "postedAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('d7e60317-1e8e-4f7d-b5b1-41223228b151', 'Слишком дорогой, мне не понравился(', 3, 1, 3, '2022-06-16 07:23:15.55+00', '2022-06-19 23:16:11.292+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."Comments" (uuid, content, "productRate", "selfRate", "rateCount", "postedAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('24c437d2-10d5-4858-b444-41bf17f5117c', 'покупай, не пожалеешь)))', 5, 4, 8, '2022-06-16 07:21:17.763+00', '2022-06-20 06:46:37.571+00', '9af0f091-2592-4f19-bb0f-32868a76582a', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."Comments" (uuid, content, "productRate", "selfRate", "rateCount", "postedAt", "updatedAt", "UserUuid", "ProductUuid") VALUES ('c76db16e-b9e8-40b3-a4d9-ee447bc8b4ee', 'sfgfdhfd
', 4, 0, 0, '2022-06-21 07:37:08.266+00', '2022-06-21 07:37:08.291+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938', '8ec77cb9-27f3-4bfb-a192-f45474037481');


--
-- TOC entry 4046 (class 0 OID 23330263)
-- Dependencies: 207
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('5130e646-82be-4db7-9429-5eaefdef98e4', '2022-06-14 18:53:28.746+00', 1, '2022-06-04 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('6bb84505-b411-4534-937c-c5dd227ec6ad', '2022-06-17 18:53:28.746+00', 2, '2022-06-04 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '23f7eb91-980e-452e-8df9-cf3600aee85f');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('70abbca8-1bfa-41bd-b0df-976ff8e46cd7', '2022-06-24 17:02:51.208+00', 2, '2022-06-13 17:02:51.209+00', '2022-06-19 17:02:51.209+00', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('73cffa46-04a6-4c00-9dfd-e5951543fc14', '2022-06-09 18:53:28.746+00', 1, '2022-06-02 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '7fb9a336-2e42-423a-b42e-af96e9420779');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('7949d2a1-d5fd-43c5-9d63-8b7f35248cc9', '2022-06-20 17:02:51.208+00', 3, '2022-06-11 17:02:51.209+00', '2022-06-19 17:02:51.209+00', '8ec77cb9-27f3-4bfb-a192-f45474037481');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('84a761cc-cdc3-46c1-9a12-16bc639bb0bd', '2022-06-13 18:53:28.746+00', 2, '2022-06-04 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '463c1dd3-a372-4dc0-9a6b-e790d91739fc');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('8d5ea376-af8a-4663-9106-04745119a38b', '2022-06-14 18:53:28.746+00', 1, '2022-06-01 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '8ec77cb9-27f3-4bfb-a192-f45474037481');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('f2cf92f5-2f5e-488c-ab5d-d7371724f5a8', '2022-06-22 17:02:51.208+00', 1, '2022-06-14 17:02:51.209+00', '2022-06-19 17:02:51.209+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('a7a5d02e-3ab7-46fa-a990-4f4c93786435', '2022-06-10 18:53:28.746+00', 5, '2022-06-06 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('ccb13975-9cc5-4df5-9c20-ea0bbc7e857e', '2022-06-10 18:53:28.746+00', 2, '2022-06-06 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '69ca64da-6538-4897-bf75-d193008be0bc');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('e9420ab7-5f03-4b2a-9cdc-1139b0a95e1b', '2022-06-14 18:53:28.746+00', 2, '2022-06-11 18:53:28.747+00', '2022-06-19 18:53:28.747+00', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('a4108b76-6baa-475b-8da3-97214c95f1d2', '2022-06-22 21:15:12.918+00', 3, '2022-06-19 21:15:12.919+00', '2022-06-19 21:15:12.919+00', '23f7eb91-980e-452e-8df9-cf3600aee85f');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('9431340d-acde-4413-8b2b-582bd056bcc6', '2022-06-23 21:15:12.918+00', 3, '2022-06-19 21:15:12.919+00', '2022-06-19 21:15:12.919+00', '463c1dd3-a372-4dc0-9a6b-e790d91739fc');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('d0ca34d0-6cd8-4339-9969-402e6e433ab2', '2022-06-14 21:16:37.797+00', 5, '2022-06-09 21:16:37.797+00', '2022-06-19 21:16:37.797+00', '8ec77cb9-27f3-4bfb-a192-f45474037481');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('e8c25f5d-0579-42aa-ab66-ee337af0e333', '2022-06-16 21:16:37.797+00', 3, '2022-06-10 21:16:37.797+00', '2022-06-19 21:16:37.797+00', '23f7eb91-980e-452e-8df9-cf3600aee85f');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('9e75ac8a-9449-449e-8d9f-c53154f4ee74', '2022-06-17 21:16:37.797+00', 4, '2022-06-12 21:16:37.797+00', '2022-06-19 21:16:37.797+00', '463c1dd3-a372-4dc0-9a6b-e790d91739fc');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('8d0e6eb7-fc9f-4821-845a-ebfa39ac3b96', '2022-06-24 06:55:03.806+00', 4, '2022-06-20 06:55:03.807+00', '2022-06-20 06:55:03.807+00', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."Orders" (uuid, "daliveryDate", count, "createdAt", "updatedAt", "ProductUuid") VALUES ('d85414e4-94a2-4df4-9683-4c7a11df92f2', '2022-06-21 06:55:03.806+00', 2, '2022-06-20 06:55:03.807+00', '2022-06-20 06:55:03.807+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');


--
-- TOC entry 4045 (class 0 OID 23330246)
-- Dependencies: 206
-- Data for Name: ProductPhotos; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('4b1c8195-c624-4cbc-bca7-805029c034d7', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156340/products/3atl_ejbhpq.png', 'products/3atl_ejbhpq', '2022-06-02 07:49:26.499+00', '2022-06-20 06:49:34.925+00', NULL);
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('4ae116de-1259-4d19-bbd3-8f7becca5251', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156324/products/2par_xjmydc.png', 'products/2par_xjmydc', '2022-06-02 07:49:11.439+00', '2022-06-02 07:49:11.517+00', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('17e2ed32-b665-4e2a-9a53-53abfcc63bb6', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156325/products/3par_ugctav.png', 'products/3par_ugctav', '2022-06-02 07:49:11.439+00', '2022-06-02 07:49:11.517+00', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('67fdc3a4-9ebc-4f6a-816d-dbaac3011b6d', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156325/products/1par_luwbmp.png', 'products/1par_luwbmp', '2022-06-02 07:49:11.439+00', '2022-06-02 07:49:11.517+00', '7a448358-431a-46bb-b131-578cc88cc4cb');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('49ce6da2-8e9b-497c-b9c8-2658e1d0aa34', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156340/products/1atl_pco5n2.png', 'products/1atl_pco5n2', '2022-06-02 07:49:26.499+00', '2022-06-02 07:49:26.573+00', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('dd14c783-8cae-4167-a05f-d8c1917828ce', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156340/products/4atl_izi6ut.png', 'products/4atl_izi6ut', '2022-06-02 07:49:26.499+00', '2022-06-02 07:49:26.573+00', '2c406eb3-5102-472b-bc52-d79b282bcfef');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('59c2ccf1-3897-4a4b-9da7-472e6e7f5fc7', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156356/products/2mad_y0uefa.png', 'products/2mad_y0uefa', '2022-06-02 07:49:42.893+00', '2022-06-02 07:49:42.967+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('038cf2ea-ea6e-49b7-bf98-387edcac182f', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156356/products/3mad_kaodds.png', 'products/3mad_kaodds', '2022-06-02 07:49:42.893+00', '2022-06-02 07:49:42.967+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('2066956e-96cb-470e-b0f5-f3a4c44353c7', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156356/products/4mad_mcjvf7.png', 'products/4mad_mcjvf7', '2022-06-02 07:49:42.893+00', '2022-06-02 07:49:42.967+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');
INSERT INTO public."ProductPhotos" (uuid, url, "publicID", "createdAt", "updatedAt", "ProductUuid") VALUES ('8e9df72c-7dda-430a-a2d0-c76544a44417', 'http://res.cloudinary.com/myroom-shop/image/upload/v1654156357/products/1mad_o62auf.png', 'products/1mad_o62auf', '2022-06-02 07:49:42.893+00', '2022-06-02 07:49:42.967+00', '2f656b62-e7e4-4a1c-a41b-1381531b2810');


--
-- TOC entry 4042 (class 0 OID 23330196)
-- Dependencies: 203
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('bcf32fc9-4fbe-4e48-9a31-186fdd8b00bc', 'Кресло Arizona', 13990, 'Китай', '{Ткань,Металл}', '{68,78.5,79.5}', 14.5, 24, 0, 'Эта модель доступна только в тех вариантах обивки, которые представлены в нашем ассортименте. Кресло Arizona по праву займет место в интерьере подчеркнуто современного звучания – в стиле лофт, индастриал, минимализм. Блок из сиденья, высокой спинки и боковин установлен на металлический каркас, придающий модели визуальную легкость. Опоры в виде полозьев оснащены пластиковыми шайбами, предотвращающими появление царапин на напольном покрытии при передвижении кресла. Дополнительные подушки в обивке из ворсистой ткани легко снимаются для регулярной чистки.', '2022-06-01 21:38:37.025+00', '2022-06-19 18:46:32.184+00', '98f7c6b5-a927-4338-bcc9-477e4a37437c');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('2c406eb3-5102-472b-bc52-d79b282bcfef', 'Диван Атлантаыаываыа', 17990, 'Россия', '{Рогожка}', '{226,87,79}', 72.5, 18, 0, 'Строгие формы дивана Атланта смягчены за счет пышных приспинных подушек, рельеф которых сформирован при помощи утяжек. Твердые накладки на боковинах выполняют роль придиванного столика: на них можно разместить небольшой поднос с кофейными чашками, положить книгу или заряжающийся гаджет.', '2022-06-01 21:38:37.022+00', '2022-06-20 06:55:19.62+00', '7610f95e-65ba-4e7f-abdb-df10f20b65d1');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('7a448358-431a-46bb-b131-578cc88cc4cb', 'Диван Парма', 14990, 'Россия', '{Рогожка}', '{195,80,78}', 40, 18, 0, 'Диван-кровать Парма выполнен в строгом минималистичном стиле. Все его поверхности имеют правильную геометрическую форму. Лаконичный и элегантный дизайн визуально не перегружает пространство, а пастельные тона обивки будут гармонично сочетаться с широкой гаммой других оттенков в интерьере. Эта модель доступна только в тех вариантах обивки, которые представлены в нашем ассортименте.', '2022-06-01 21:38:37.024+00', '2022-06-25 07:50:04.169+00', '7610f95e-65ba-4e7f-abdb-df10f20b65d1');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('69ca64da-6538-4897-bf75-d193008be0bc', 'Кресло Томас', 11990, 'Россия', '{Велюр}', '{75,89,87}', 17, 18, 0, 'Кресло Томас составит достойную пару дивану из этой коллекции мягкой мебели или займет собственное место в будуарной зоне спальни. Глубокое сиденье c качественным пружинным блоком, спинка с удобным углом наклона, покатые подлокотники — все располагает к комфортному отдыху. Элегантность дизайну придают детали отделки: чехол подушки, кант и декоративные пуговицы, использованные для утяжки спинки, выполнены из одной ткани, контрастной по отношению к велюровой обивке. Эта модель доступна только в тех вариантах обивки, которые представлены в нашем ассортименте.', '2022-06-01 21:38:37.025+00', '2022-06-20 06:55:19.612+00', '98f7c6b5-a927-4338-bcc9-477e4a37437c');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('23f7eb91-980e-452e-8df9-cf3600aee85f', 'Кровать без подъёмного механизма Соренто', 9290, 'Россия', '{ЛДСП,МДФ}', '{168,88,215}', 41.8, 24, 3, 'Основание в комплект не входит, требуется основание с ножками.
В дизайне кровати Соренто использована идея предельной лаконичности и естественности. Модель с четкими геометрическими очертаниями лишена какой-либо помпезности, ее основные достоинства: надежность каркаса и оптимальная высота спального места. Спинка имеет достаточную ширину, чтобы на нее можно было положить очки или недочитанную книгу, установить лампу с прищепкой. Декор выдержан в природных оттенках древесины дуба, что особенно уместно для спальной мебели: эти цвета способствуют покою и расслаблению. Выразительность кровати придают ножки в форме «уголка» и декоративная вставка в изголовье.', '2022-06-01 21:38:37.026+00', '2022-06-20 06:55:19.616+00', 'a9c71ac9-7f1d-40e2-b422-a7c06f3c1358');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('463c1dd3-a372-4dc0-9a6b-e790d91739fc', 'Кровать с подъёмным механизмом Victori', 36990, 'Россия', '{Велюр}', '{170,110,217}', 116.5, 18, 4, 'Кровать Victori с удобным подъёмным механизмом удобна и элегантна. Ее каркас выполнен из прочной и долговечной ДСП, обивка — из мягкого бархатистого велюра. Привлекает внимание высокая мягкая спинка в изголовье: прострочка в виде диагональных линий, образующих в центре буквы V, выглядит оригинально и эффектно. Подъёмный механизм с газлифтами открывает доступ к вместительным ящикам, которые станут дополнительным местом для хранения, что особенно важно в малогабаритных квартирах.', '2022-06-01 21:38:37.026+00', '2022-06-20 06:55:19.619+00', 'a9c71ac9-7f1d-40e2-b422-a7c06f3c1358');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('2f656b62-e7e4-4a1c-a41b-1381531b2810', 'Диван Мэдисон', 49990, 'Россия', '{Вельвет}', '{253,80,121}', 130, 18, 0, 'Диван-кровать Мэдисон с системой трансформации «Еврокнижка» («Альтернатива») предназначен для ежедневного использования. Выкатные сиденья и откидные спинки образуют спальное место. Благодаря системе трансформации диван предоставляет широкую двуспальную кровать со спальным местом 160 х 200 см. Оптимальные условия для комфортного отдыха обеспечивает независимый пружинный блок в сочетании с эластичным пенополиуретаном - мягкие составляющие дивана. Диван Мэдисон состоит из двух частей, которые трансформируются независимо друг от друга. Это преимущество позволяет, при необходимости, создать из обычного дивана угловой. Полноценное спальное место создаётся в том случае, если разложены обе части диван-кровати.', '2022-06-01 21:38:37.024+00', '2022-06-20 06:55:19.622+00', '7610f95e-65ba-4e7f-abdb-df10f20b65d1');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('7fb9a336-2e42-423a-b42e-af96e9420779', 'Кресло Сиеста', 49990, 'Россия', '{"Велюр (Лекко)"}', '{83,92,82.5}', 17, 18, 0, 'Кресло Сиеста достойно своего названия – в нем хочется не только проводить вечера в домашнем кинозале, но и устроить себе дополнительный полуденный отдых. К этому располагают сиденье комфортной глубины, закругленные подлокотники, усиленный пружинным блоком наполнитель. Высокая спинка украшена классической стяжкой капитоне, выполненной при помощи утопленных пуговиц и образующей рельефный ромбовидный рисунок. Обивка из велюра легко чистится щеткой или пылесосом с насадкой для мягкой мебели. Однотонную модель оживляет декоративная подушка из ткани с цветочным узором. Эта модель доступна только в тех вариантах обивки, которые представлены в нашем ассортименте.', '2022-06-01 21:38:37.025+00', '2022-06-20 06:56:09.543+00', '98f7c6b5-a927-4338-bcc9-477e4a37437c');
INSERT INTO public."Products" (uuid, name, price, "madeIn", materials, dimensions, weight, warranty, count, description, "createdAt", "updatedAt", "CategoryUuid") VALUES ('8ec77cb9-27f3-4bfb-a192-f45474037481', 'Кровать с подъёмным механизмом Абель', 29990, 'Россия', '{ДСП,Велюр}', '{174.5,113.5,217}', 107.5, 24, 4, 'Практичным вариантом для небольшой спальни станет кровать с подъемным механизмом Абель. Расположенный под основанием короб решит проблему хранения запасных подушек, постельного белья, вещей сезонного пользования. Газлифты поднимают и фиксируют раму с матрасом без приложения усилий, позволяя доставать вещи обеими руками. Модель в велюровой обивке оснащена ножками, благодаря чему в подкроватном пространстве не будет скапливаться пыль: в проем между полом и дном кровати легко пройдет швабра или робот-пылесос. При выборе матраса стоит ориентироваться на среднюю высоту, поскольку выемка для него не слишком глубокая.', '2022-06-01 21:38:37.025+00', '2022-06-20 06:56:09.549+00', 'a9c71ac9-7f1d-40e2-b422-a7c06f3c1358');


--
-- TOC entry 4040 (class 0 OID 23330172)
-- Dependencies: 201
-- Data for Name: Tokens; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('dddc6afc-f585-4981-b48e-43d4bfbe9118', '50c42a82-9756-4e88-84d9-b8ca18dc49f1', '2022-06-01 21:39:14.16+00', '2022-06-01 21:39:14.295+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('f8ae13d8-c012-45b4-b3ec-244c8e46006d', 'aef8e9b6-5e4c-4848-abc0-7da8e7d78a7f', '2022-06-04 13:14:27.863+00', '2022-06-04 13:14:27.878+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('511ea22d-146e-48b1-95b5-089c4245322e', '73c62619-3562-440c-a74d-c5a0d014a529', '2022-06-06 09:33:39.84+00', '2022-06-06 09:33:39.923+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('50842958-61fb-4139-9d68-a489e6ecb4f5', '9fb22fe7-f7c9-43cc-9e69-dda0da19ec01', '2022-06-14 12:35:11.06+00', '2022-06-14 12:35:11.081+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('232191db-3f51-4549-9bfc-1ae8fbcd2df6', 'a729a617-2f5b-4a94-8fdf-684b1b1c7b7d', '2022-06-20 06:55:51.328+00', '2022-06-20 06:55:51.331+00', '9af0f091-2592-4f19-bb0f-32868a76582a');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('1203ca93-a497-4d06-ab47-da6e322baeae', '0796cb60-0941-4c5b-9ce1-0c1a344accd1', '2022-06-25 07:48:17.398+00', '2022-06-25 07:48:17.47+00', 'cd6b987b-7719-4374-8820-e478d6c762bb');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('d7d01e22-ce06-45c2-8afa-472b0206c46a', 'c776c425-666d-4db0-818d-c7330ae075ee', '2022-06-18 08:04:44.434+00', '2022-06-18 08:04:44.514+00', '331e6d4d-a89b-46b6-a307-4c8a704acc53');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('798737a3-f942-4ac9-96d1-1cf7a28f3800', '1fbb3390-740c-4f80-ba8a-0663af98c605', '2022-06-16 08:22:03.195+00', '2022-06-16 08:22:03.218+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('cbafd3e6-be80-4d59-98a4-46a3e9c4675f', '5574e8bd-32cb-4c33-b958-f0a753a2e23a', '2022-06-16 08:24:49.876+00', '2022-06-16 08:24:49.887+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('0310ea11-7da7-419f-b6de-3b288c079713', 'f2565468-3573-4fba-8739-62f743f90ea7', '2022-06-18 12:09:05.953+00', '2022-06-18 12:09:06.033+00', '331e6d4d-a89b-46b6-a307-4c8a704acc53');
INSERT INTO public."Tokens" (uuid, value, "createdAt", "updatedAt", "UserUuid") VALUES ('8730f894-8b6e-4abc-9ca6-4713ef1eccf7', '5cc937fd-be0f-46a3-bd02-0a1f45b3d220', '2022-06-20 00:12:44.944+00', '2022-06-20 00:12:45.03+00', '53f8cd3b-434d-47fe-9f9c-c28bcb05f938');


--
-- TOC entry 4039 (class 0 OID 23330161)
-- Dependencies: 200
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: gsjydlkxutwswk
--

INSERT INTO public."Users" (uuid, name, login, password, "roleUUID", email, phone, "photoURL", "createdAt", "updatedAt") VALUES ('331e6d4d-a89b-46b6-a307-4c8a704acc53', 'Галина', 'accoMyRoom', '$2b$08$ludzRrAqCqoHrGjBep2ce.RAOlWtZNSbetDypHA4A6tUT.BuIIg9e', '5757484e-79e0-4a4d-a8c9-c7a08b9137fc', 'myroom.accountant@myroom.ru', '88006663535', 'http://res.cloudinary.com/myroom-shop/image/upload/v1655673769/users/accountant_lortam.jpg', '2022-06-01 21:38:36.711+00', '2022-06-19 21:22:50.593+00');
INSERT INTO public."Users" (uuid, name, login, password, "roleUUID", email, phone, "photoURL", "createdAt", "updatedAt") VALUES ('9af0f091-2592-4f19-bb0f-32868a76582a', 'Елизавета', 'lisaV', '$2b$08$Yffyu62EqaLKZgprRHwOVOqz9S.sV2KBPSo27dgZyFJssOzcJVsve', 'cc8554cb-d9c7-44e9-9c68-6ab2caac61e9', 'lisa.v@mail.ru', NULL, 'http://res.cloudinary.com/myroom-shop/image/upload/v1655283655/users/lisa_rh2x7v.jpg', '2022-06-14 21:10:08.014+00', '2022-06-20 06:51:19.334+00');
INSERT INTO public."Users" (uuid, name, login, password, "roleUUID", email, phone, "photoURL", "createdAt", "updatedAt") VALUES ('cd6b987b-7719-4374-8820-e478d6c762bb', '123', '1234', '$2b$08$j1so3p/H8XfndUvbnWbNgu.yrgfP7vDtNVQc/5zsj8Cl/8CiFkjhK', '00000000-0000-0000-0000-000000000000', '1234@mail.ru', '89083451326', NULL, '2022-06-25 07:48:07.868+00', '2022-06-25 07:48:07.868+00');
INSERT INTO public."Users" (uuid, name, login, password, "roleUUID", email, phone, "photoURL", "createdAt", "updatedAt") VALUES ('53f8cd3b-434d-47fe-9f9c-c28bcb05f938', 'Николай', 'adminMyRoom', '$2b$08$hwkGpECkdF92Pwf8lhxEg.rqh65NMd1xoOYz5nnW/dDROiucpt/gK', '56de4ebc-c616-496f-8666-a45232a900eb', 'myroom.admin@myroom.ru', '86854235241', 'https://res.cloudinary.com/myroom-shop/image/upload/v1653329349/users/admin_myroom.jpg', '2022-06-01 21:38:36.711+00', '2022-06-17 20:02:21.57+00');
INSERT INTO public."Users" (uuid, name, login, password, "roleUUID", email, phone, "photoURL", "createdAt", "updatedAt") VALUES ('c14e31fc-05a4-4a53-af45-e462ca735d76', 'Анна', 'manaMyRoom', '$2b$08$LwkpjsPgbqiveDcJp42Y4uAQMhvZtpQBhgabxghW9.EKC4Xa0rXmW', 'cc8554cb-d9c7-44e9-9c68-6ab2caac61e9', 'myroom.manager@myroom.ru', '+79003405045', 'https://res.cloudinary.com/myroom-shop/image/upload/v1653330583/users/manager_myroom.jpg', '2022-06-01 21:38:36.711+00', '2022-06-17 20:02:46.513+00');


--
-- TOC entry 3892 (class 2606 OID 23330235)
-- Name: BasketOrders BasketOrders_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."BasketOrders"
    ADD CONSTRAINT "BasketOrders_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3880 (class 2606 OID 23330195)
-- Name: Categories Categories_ENname_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_ENname_key" UNIQUE ("ENname");


--
-- TOC entry 3882 (class 2606 OID 23330193)
-- Name: Categories Categories_name_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_name_key" UNIQUE (name);


--
-- TOC entry 3884 (class 2606 OID 23330191)
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3890 (class 2606 OID 23330220)
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3900 (class 2606 OID 23330267)
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3894 (class 2606 OID 23330253)
-- Name: ProductPhotos ProductPhotos_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."ProductPhotos"
    ADD CONSTRAINT "ProductPhotos_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3896 (class 2606 OID 23330257)
-- Name: ProductPhotos ProductPhotos_publicID_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."ProductPhotos"
    ADD CONSTRAINT "ProductPhotos_publicID_key" UNIQUE ("publicID");


--
-- TOC entry 3898 (class 2606 OID 23330255)
-- Name: ProductPhotos ProductPhotos_url_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."ProductPhotos"
    ADD CONSTRAINT "ProductPhotos_url_key" UNIQUE (url);


--
-- TOC entry 3886 (class 2606 OID 23330205)
-- Name: Products Products_name_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_name_key" UNIQUE (name);


--
-- TOC entry 3888 (class 2606 OID 23330203)
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3876 (class 2606 OID 23330176)
-- Name: Tokens Tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3878 (class 2606 OID 23330178)
-- Name: Tokens Tokens_value_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_value_key" UNIQUE (value);


--
-- TOC entry 3872 (class 2606 OID 23330171)
-- Name: Users Users_login_key; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_login_key" UNIQUE (login);


--
-- TOC entry 3874 (class 2606 OID 23330169)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (uuid);


--
-- TOC entry 3906 (class 2606 OID 23330241)
-- Name: BasketOrders BasketOrders_ProductUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."BasketOrders"
    ADD CONSTRAINT "BasketOrders_ProductUuid_fkey" FOREIGN KEY ("ProductUuid") REFERENCES public."Products"(uuid) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3905 (class 2606 OID 23330236)
-- Name: BasketOrders BasketOrders_UserUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."BasketOrders"
    ADD CONSTRAINT "BasketOrders_UserUuid_fkey" FOREIGN KEY ("UserUuid") REFERENCES public."Users"(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3904 (class 2606 OID 23330226)
-- Name: Comments Comments_ProductUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_ProductUuid_fkey" FOREIGN KEY ("ProductUuid") REFERENCES public."Products"(uuid) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3903 (class 2606 OID 23330221)
-- Name: Comments Comments_UserUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_UserUuid_fkey" FOREIGN KEY ("UserUuid") REFERENCES public."Users"(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3908 (class 2606 OID 23330268)
-- Name: Orders Orders_ProductUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_ProductUuid_fkey" FOREIGN KEY ("ProductUuid") REFERENCES public."Products"(uuid) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3907 (class 2606 OID 23330258)
-- Name: ProductPhotos ProductPhotos_ProductUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."ProductPhotos"
    ADD CONSTRAINT "ProductPhotos_ProductUuid_fkey" FOREIGN KEY ("ProductUuid") REFERENCES public."Products"(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3902 (class 2606 OID 23330206)
-- Name: Products Products_CategoryUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_CategoryUuid_fkey" FOREIGN KEY ("CategoryUuid") REFERENCES public."Categories"(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3901 (class 2606 OID 23330179)
-- Name: Tokens Tokens_UserUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gsjydlkxutwswk
--

ALTER TABLE ONLY public."Tokens"
    ADD CONSTRAINT "Tokens_UserUuid_fkey" FOREIGN KEY ("UserUuid") REFERENCES public."Users"(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4053 (class 0 OID 0)
-- Dependencies: 4052
-- Name: DATABASE daqrv81u7jb4a; Type: ACL; Schema: -; Owner: gsjydlkxutwswk
--

REVOKE CONNECT,TEMPORARY ON DATABASE daqrv81u7jb4a FROM PUBLIC;


--
-- TOC entry 4054 (class 0 OID 0)
-- Dependencies: 659
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO gsjydlkxutwswk;


-- Completed on 2022-06-29 14:56:45

--
-- PostgreSQL database dump complete
--

