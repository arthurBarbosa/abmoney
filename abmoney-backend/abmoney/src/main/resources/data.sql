INSERT INTO tb_category (name) VALUES ('books');
INSERT INTO tb_category (name) VALUES ('Lanches');
INSERT INTO tb_category (name) VALUES ('Informática');
INSERT INTO tb_category (name) VALUES ('Restaurantes');
INSERT INTO tb_category (name) VALUES ('Eletrodomesticos');
INSERT INTO tb_category (name) VALUES ('Lazer');
INSERT INTO tb_category (name) VALUES ('Alimentação');
INSERT INTO tb_category (name) VALUES ('Supermercado');
INSERT INTO tb_category (name) VALUES ('Farmácia');

INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('João Silva', 'Rua do Abacaxi', '10', null, 'Brasil', '38.400-12', 'Uberlândia', 'MG', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Maria Rita', 'Rua do Sabiá', '110', 'Apto 101', 'Colina', '11.400-12', 'Ribeirão Preto', 'SP', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Pedro Santos', 'Rua da Bateria', '23', null, 'Morumbi', '54.212-12', 'Goiânia', 'GO', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Ricardo Pereira', 'Rua do Motorista', '123', 'Apto 302', 'Aparecida', '38.400-12', 'Salvador', 'BA', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Josué Mariano', 'Av Rio Branco', '321', null, 'Jardins', '56.400-12', 'Natal', 'RN', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Pedro Barbosa', 'Av Brasil', '100', null, 'Tubalina', '77.400-12', 'Porto Alegre', 'RS', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Henrique Medeiros', 'Rua do Sapo', '1120', 'Apto 201', 'Centro', '12.400-12', 'Rio de Janeiro', 'RJ', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Carlos Santana', 'Rua da Manga', '433', null, 'Centro', '31.400-12', 'Belo Horizonte', 'MG', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Leonardo Oliveira', 'Rua do Músico', '566', null, 'Segismundo Pereira', '38.400-00', 'Uberlândia', 'MG', true);
INSERT INTO tb_person (name, public_place, number, complement, neighborhood, zip_code, city, state, status) values ('Isabela Martins', 'Rua da Terra', '1233', 'Apto 10', 'Vigilato', '99.400-12', 'Manaus', 'AM', true);

INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Salário mensal', '2021-01-10', null, 6500.00, 'Distribuição de lucros', 'RECEITA', 1, 1);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Bahamas', '2021-02-10', '2017-02-10', 100.32, null, 'DESPESA', 2, 2);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Top Club', '2021-01-10', null, 120, null, 'RECEITA', 3, 3);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('CEMIG', '2021-03-10', '2017-02-10', 110.44, 'Geração', 'RECEITA', 3, 4);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('DMAE', '2021-01-10', null, 200.30, null, 'DESPESA', 3, 5);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Extra', '2021-03-10', '2017-03-10', 1010.32, null, 'RECEITA', 4, 6);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Bahamas', '2021-03-10', null, 500, null, 'RECEITA', 1, 7);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Top Club', '2021-03-10', '2017-03-10', 400.32, null, 'DESPESA', 4, 8);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Despachante', '2021-03-10', null, 123.64, 'Multas', 'DESPESA', 3, 9);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Pneus', '2021-02-10', '2017-04-10', 665.33, null, 'RECEITA', 5, 10);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Café', '2021-02-10', null, 8.32, null, 'DESPESA', 1, 5);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Eletrônicos', '2021-02-10', '2017-04-10', 2100.32, null, 'DESPESA', 5, 4);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Instrumentos', '2021-03-04', null, 1040.32, null, 'DESPESA', 4, 3);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Café', '2021-03-01', '2017-04-10', 4.32, null, 'DESPESA', 4, 2);
INSERT INTO tb_book_entry (description, due_date, payment_date, value, observation, type, category_id, person_id) values ('Lanche', '2021-03-02', null, 10.20, null, 'DESPESA', 4, 1);

INSERT INTO tb_user (name, email, password) VALUES('Anna Brown', 'anna@gmail.com', '$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu');
INSERT INTO tb_user (name, email, password) VALUES ('Jack Brown', 'jack@gmail.com', '$2a$10$NYFZ/8WaQ3Qb6FCs.00jce4nxX9w7AkgWVsQCG6oUwTAcZqP9Flqu');

INSERT INTO tb_role (role_name) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (role_name) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);