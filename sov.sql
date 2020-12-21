-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Гру 21 2020 р., 12:57
-- Версія сервера: 5.6.47
-- Версія PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `sov`
--

-- --------------------------------------------------------

--
-- Структура таблиці `cafedra`
--

CREATE TABLE `cafedra` (
  `id` int(11) NOT NULL,
  `cafedra_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `cafedra`
--

INSERT INTO `cafedra` (`id`, `cafedra_name`) VALUES
(1, 'Кафедра захисту інформації');

-- --------------------------------------------------------

--
-- Структура таблиці `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `faculty_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `faculty`
--

INSERT INTO `faculty` (`id`, `faculty_name`) VALUES
(1, 'Копьютерні науки');

-- --------------------------------------------------------

--
-- Структура таблиці `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `item_value` smallint(3) UNSIGNED NOT NULL,
  `coefficient` smallint(3) UNSIGNED NOT NULL,
  `type_of_category` smallint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `items`
--

INSERT INTO `items` (`id`, `item_name`, `item_value`, `coefficient`, `type_of_category`) VALUES
(4, 'прибирання', 10, 2, 1),
(5, 'прибирання', 10, 3, 1),
(6, 'Стаття в зарубіжному виданні', 50, 1, 2),
(7, 'Стаття у вітчизняних наукових фахових виданнях категорії А', 100, 1, 1),
(8, 'Стаття у вітчизняних наукових фахових виданнях категорії Б', 40, 1, 1),
(9, 'Стаття у вітчизняних наукових фахових виданнях категорії В', 20, 1, 1),
(10, 'Монографія у видавництвах категорій А, В за класифікацією SENSE', 500, 1, 1),
(11, 'Керівництво стажуванням викладачів з інших ЗВО', 10, 1, 2),
(12, 'Підготовка та видання навчальних посібників та підручників, хрестоматій, словників (у т.ч електронних)', 30, 1, 2),
(13, 'Підвищення кваліфікації у вітчизняних ЗВО, установах, організаціях та підприємствах', 50, 1, 3),
(14, 'Підвищення кваліфікації у закордонних ЗВО, установах, організаціях та підприємствах', 500, 1, 3),
(15, 'Участь у вітчизняних тренінгах, програмах, курсах особистісного розвитку', 50, 1, 3),
(16, 'Участь у міжнародних тренінгах, програмах, курсах особистісного розвитку', 100, 1, 3),
(17, 'Організація, супровід, проведення міжнародних виставок за участю університету', 10, 1, 4),
(18, 'Участь у розроблені стратегії університету', 10, 1, 4),
(19, 'Проведення виховних та мистецьких заходів', 10, 1, 4);

-- --------------------------------------------------------

--
-- Структура таблиці `subscriber`
--

CREATE TABLE `subscriber` (
  `id` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `items` longtext COMMENT 'Items which was added by teacher',
  `value` float UNSIGNED NOT NULL COMMENT 'Premision for functional of site',
  `premision` smallint(3) UNSIGNED NOT NULL,
  `cafedra_id` int(11) DEFAULT NULL,
  `faculty_id` int(11) DEFAULT NULL,
  `rank` smallint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `subscriber`
--

INSERT INTO `subscriber` (`id`, `login`, `password`, `full_name`, `items`, `value`, `premision`, `cafedra_id`, `faculty_id`, `rank`) VALUES
(1, 'panas', 'panas', 'Гнатюк Денис Янович', '{\"items\":{\"6\":{\"id\":\"6\",\"item_name\":\"Стаття в зарубіжному виданні\",\"item_value\":\"50\",\"coefficient\":\"1\",\"type_of_category\":\"2\",\"item_result\":50}},\"item\":null}', 20, 1, 1, 1, 1),
(2, 'vlad', 'vlad', 'Каленіков Владислав Сергійович', '{\"items\":{\"4\":{\"id\":\"4\",\"item_name\":\"прибирання\",\"item_value\":\"10\",\"coefficient\":\"2\",\"type_of_category\":\"1\",\"item_result\":20},\"6\":{\"id\":\"6\",\"item_name\":\"Стаття в зарубіжному виданні\",\"item_value\":\"50\",\"coefficient\":\"1\",\"type_of_category\":\"2\",\"item_result\":50},\"5\":{\"id\":\"5\",\"item_name\":\"прибирання\",\"item_value\":\"10\",\"coefficient\":\"3\",\"type_of_category\":\"1\",\"item_result\":30}},\"item\":null}', 0, 1, 1, 1, 1);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `cafedra`
--
ALTER TABLE `cafedra`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriber_to_cafedra` (`cafedra_id`),
  ADD KEY `subscriber_to_faculty` (`faculty_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `cafedra`
--
ALTER TABLE `cafedra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблиці `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `subscriber`
--
ALTER TABLE `subscriber`
  ADD CONSTRAINT `subscriber_to_cafedra` FOREIGN KEY (`cafedra_id`) REFERENCES `cafedra` (`id`),
  ADD CONSTRAINT `subscriber_to_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
