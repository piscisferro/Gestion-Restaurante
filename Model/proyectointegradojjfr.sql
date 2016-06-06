-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2016 a las 00:18:24
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectointegradojjfr`
--
CREATE DATABASE IF NOT EXISTS `proyectointegradojjfr` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `proyectointegradojjfr`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) COLLATE utf8_bin NOT NULL,
  `img_categoria` text COLLATE utf8_bin,
  `fecha_categoria` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `img_categoria`, `fecha_categoria`) VALUES
(1, 'Sin Categoria', '../../Views/img/categorias/img4031465054701.jpeg', '2016-06-04 17:10:07'),
(2, 'Bebidas', '../../Views/img/categorias/img8261465053324.jpeg', '0000-00-00 00:00:00'),
(3, 'Bocadillos', '../../Views/img/categorias/img3641465053338.png', '0000-00-00 00:00:00'),
(4, 'Hamburguesas', '../../Views/img/categorias/img3421465053349.jpeg', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detpedido`
--

DROP TABLE IF EXISTS `detpedido`;
CREATE TABLE IF NOT EXISTS `detpedido` (
  `id_detpedido` int(11) NOT NULL,
  `pedido_detpedido` int(11) NOT NULL,
  `producto_detpedido` int(11) NOT NULL,
  `servido_detpedido` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_detpedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `precio_detpedido` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `detpedido`
--

INSERT INTO `detpedido` (`id_detpedido`, `pedido_detpedido`, `producto_detpedido`, `servido_detpedido`, `fecha_detpedido`, `precio_detpedido`) VALUES
(2, 1, 1, 1, '2016-06-04 15:32:24', 1.5),
(3, 1, 1, 1, '2016-06-04 15:32:24', 1.5),
(4, 1, 2, 1, '2016-06-04 15:32:24', 1.8),
(5, 1, 2, 1, '2016-06-04 15:32:24', 1.8),
(6, 1, 4, 0, '2016-06-04 15:32:24', 3.5),
(7, 1, 4, 0, '2016-06-04 15:32:24', 3.5),
(8, 1, 5, 0, '2016-06-04 15:32:24', 4.25),
(9, 1, 6, 0, '2016-06-04 15:32:24', 4.5),
(10, 1, 6, 0, '2016-06-04 15:32:24', 4.5),
(11, 1, 6, 0, '2016-06-04 15:32:24', 4.5),
(12, 1, 4, 0, '2016-06-05 13:47:58', 3.5),
(13, 1, 4, 0, '2016-06-05 13:47:58', 3.5),
(14, 1, 4, 0, '2016-06-05 13:47:58', 3.5),
(15, 45, 4, 0, '2016-06-05 14:15:06', 3.5),
(16, 45, 4, 0, '2016-06-05 14:15:06', 3.5),
(17, 1, 2, 1, '2016-06-05 15:42:34', 1.8),
(18, 49, 5, 0, '2016-06-05 16:29:26', 4.25),
(19, 49, 4, 0, '2016-06-05 16:29:26', 3.5),
(20, 49, 4, 0, '2016-06-05 16:29:26', 3.5),
(21, 49, 1, 1, '2016-06-05 16:29:26', 1.5),
(22, 49, 2, 1, '2016-06-05 16:29:26', 1.8),
(23, 49, 3, 1, '2016-06-05 16:29:26', 1.2),
(24, 52, 1, 1, '2016-06-05 17:22:34', 1.5),
(25, 52, 2, 1, '2016-06-05 17:22:34', 1.8),
(26, 52, 2, 1, '2016-06-05 17:22:34', 1.8),
(27, 52, 3, 1, '2016-06-05 17:22:34', 1.2),
(28, 52, 3, 1, '2016-06-05 17:22:34', 1.2),
(29, 52, 4, 0, '2016-06-05 17:22:34', 3.5),
(30, 52, 5, 0, '2016-06-05 17:22:34', 4.25),
(31, 54, 1, 1, '2016-06-05 17:37:29', 1.5),
(32, 54, 1, 1, '2016-06-05 17:37:29', 1.5),
(33, 54, 2, 1, '2016-06-05 17:37:29', 1.8),
(34, 54, 2, 1, '2016-06-05 17:37:29', 1.8),
(35, 54, 3, 1, '2016-06-05 17:37:29', 1.2),
(36, 55, 7, 0, '2016-06-05 17:41:07', 4.65),
(37, 55, 7, 0, '2016-06-05 17:41:07', 4.65),
(38, 55, 6, 0, '2016-06-05 17:41:07', 4.5),
(39, 55, 6, 0, '2016-06-05 17:41:08', 4.5),
(40, 56, 6, 0, '2016-06-05 17:54:45', 4.5),
(41, 56, 6, 0, '2016-06-05 17:54:45', 4.5),
(42, 56, 7, 0, '2016-06-05 17:54:45', 4.65),
(43, 56, 7, 0, '2016-06-05 17:54:45', 4.65),
(44, 57, 5, 0, '2016-06-05 18:18:33', 4.25),
(45, 57, 5, 0, '2016-06-05 18:18:33', 4.25),
(46, 57, 5, 0, '2016-06-05 18:18:33', 4.25),
(47, 57, 5, 0, '2016-06-05 18:18:33', 4.25),
(48, 57, 5, 0, '2016-06-05 18:18:33', 4.25),
(49, 58, 6, 0, '2016-06-05 18:25:05', 4.5),
(50, 58, 6, 0, '2016-06-05 18:25:05', 4.5),
(51, 58, 7, 0, '2016-06-05 18:25:05', 4.65),
(52, 59, 4, 0, '2016-06-05 18:31:36', 3.5),
(53, 59, 4, 0, '2016-06-05 18:31:36', 3.5),
(54, 59, 5, 0, '2016-06-05 18:31:36', 4.25),
(55, 59, 5, 0, '2016-06-05 18:31:36', 4.25),
(56, 59, 5, 0, '2016-06-05 18:31:36', 4.25),
(57, 60, 1, 1, '2016-06-05 18:39:18', 1.5),
(58, 60, 2, 1, '2016-06-05 18:39:18', 1.8),
(59, 61, 4, 0, '2016-06-05 18:42:17', 3.5),
(60, 61, 5, 0, '2016-06-05 18:42:17', 4.25),
(61, 61, 5, 0, '2016-06-05 18:42:17', 4.25),
(62, 62, 4, 0, '2016-06-05 18:42:56', 3.5),
(63, 62, 5, 0, '2016-06-05 18:42:56', 4.25),
(64, 63, 4, 0, '2016-06-05 18:45:11', 3.5),
(65, 63, 5, 0, '2016-06-05 18:45:11', 4.25),
(66, 64, 1, 1, '2016-06-05 18:45:39', 1.5),
(67, 64, 2, 1, '2016-06-05 18:45:39', 1.8),
(68, 64, 3, 1, '2016-06-05 18:45:39', 1.2),
(69, 65, 3, 1, '2016-06-05 18:46:28', 1.2),
(70, 65, 2, 1, '2016-06-05 18:46:28', 1.8),
(71, 66, 3, 1, '2016-06-05 18:59:38', 1.2),
(72, 66, 3, 1, '2016-06-05 18:59:39', 1.2),
(73, 66, 3, 1, '2016-06-05 18:59:39', 1.2),
(74, 67, 2, 1, '2016-06-05 19:04:38', 1.8),
(75, 67, 3, 1, '2016-06-05 19:04:38', 1.2),
(76, 67, 3, 1, '2016-06-05 19:04:38', 1.2),
(77, 68, 1, 1, '2016-06-05 19:51:36', 1.5),
(78, 69, 1, 1, '2016-06-05 19:52:19', 1.5),
(79, 70, 1, 1, '2016-06-05 19:53:38', 1.5),
(80, 70, 1, 1, '2016-06-05 19:53:38', 1.5),
(81, 71, 1, 1, '2016-06-05 19:57:01', 1.5),
(82, 71, 1, 1, '2016-06-05 19:57:01', 1.5),
(83, 72, 2, 1, '2016-06-05 19:57:45', 1.8),
(84, 73, 1, 1, '2016-06-05 19:58:40', 1.5),
(85, 74, 1, 1, '2016-06-05 20:09:35', 1.5),
(86, 74, 1, 1, '2016-06-05 20:09:35', 1.5),
(87, 74, 1, 1, '2016-06-05 20:09:35', 1.5),
(88, 75, 1, 1, '2016-06-06 16:22:01', 1.5),
(89, 75, 2, 1, '2016-06-06 16:22:01', 1.8),
(90, 75, 3, 1, '2016-06-06 16:22:01', 1.2),
(91, 75, 3, 1, '2016-06-06 16:22:01', 1.2),
(92, 75, 4, 0, '2016-06-06 16:22:01', 3.5),
(93, 75, 4, 0, '2016-06-06 16:22:01', 3.5),
(94, 75, 4, 0, '2016-06-06 16:22:01', 3.5),
(95, 75, 4, 0, '2016-06-06 16:22:01', 3.5),
(96, 75, 5, 0, '2016-06-06 16:22:01', 4.25),
(97, 75, 5, 0, '2016-06-06 16:22:01', 4.25),
(98, 75, 5, 0, '2016-06-06 16:22:01', 4.25),
(99, 75, 5, 0, '2016-06-06 16:22:01', 4.25),
(100, 75, 5, 0, '2016-06-06 16:22:01', 4.25),
(101, 75, 5, 0, '2016-06-06 16:22:01', 4.25),
(102, 75, 6, 0, '2016-06-06 16:22:01', 4.5),
(103, 75, 6, 0, '2016-06-06 16:22:01', 4.5),
(104, 75, 6, 0, '2016-06-06 16:22:01', 4.5),
(105, 75, 6, 0, '2016-06-06 16:22:01', 4.5),
(106, 75, 6, 0, '2016-06-06 16:22:01', 4.5),
(107, 75, 7, 0, '2016-06-06 16:22:01', 4.65),
(108, 75, 7, 0, '2016-06-06 16:22:01', 4.65),
(109, 75, 7, 0, '2016-06-06 16:22:01', 4.65),
(110, 75, 7, 0, '2016-06-06 16:22:01', 4.65),
(111, 75, 7, 0, '2016-06-06 16:22:01', 4.65),
(112, 75, 6, 0, '2016-06-06 17:23:43', 4.5),
(113, 75, 7, 0, '2016-06-06 17:23:43', 4.65),
(114, 46, 1, 1, '2016-06-06 18:53:31', 1.5),
(115, 46, 1, 1, '2016-06-06 18:53:31', 1.5),
(116, 46, 1, 1, '2016-06-06 18:53:31', 1.5),
(117, 46, 2, 1, '2016-06-06 18:53:31', 1.8),
(118, 46, 2, 1, '2016-06-06 18:53:31', 1.8),
(119, 46, 2, 1, '2016-06-06 18:53:31', 1.8),
(120, 46, 2, 1, '2016-06-06 18:53:31', 1.8),
(121, 46, 3, 1, '2016-06-06 18:53:31', 1.2),
(122, 46, 3, 1, '2016-06-06 18:53:31', 1.2),
(123, 46, 3, 1, '2016-06-06 18:53:31', 1.2),
(125, 46, 1, 1, '2016-06-06 19:00:18', 1.5),
(126, 78, 1, 1, '2016-06-06 20:24:58', 1.5),
(127, 78, 2, 1, '2016-06-06 20:24:58', 1.8),
(128, 78, 2, 1, '2016-06-06 20:24:58', 1.8),
(129, 78, 3, 1, '2016-06-06 20:24:58', 1.2),
(130, 78, 3, 1, '2016-06-06 20:24:58', 1.2);

--
-- Disparadores `detpedido`
--
DROP TRIGGER IF EXISTS `insert`;
DELIMITER $$
CREATE TRIGGER `insert` BEFORE INSERT ON `detpedido`
 FOR EACH ROW BEGIN
SET @idProduct = NEW.producto_detpedido;

Select precio_producto, tipo_producto INTO @precio, @tipo from producto WHERE id_producto = @idProduct;

SET NEW.precio_detpedido  = @precio;

if @tipo != 1 THEN SET NEW.servido_detpedido = true;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `usuario_pedido` int(11) NOT NULL,
  `abierto_pedido` varchar(1) COLLATE utf8_bin NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `fecha_pedido`, `usuario_pedido`, `abierto_pedido`) VALUES
(1, '2016-06-04', 2, 'C'),
(44, '2016-06-05', 11, 'A'),
(45, '2016-06-05', 9, 'C'),
(46, '2016-06-05', 8, 'C'),
(47, '2016-06-05', 10, 'A'),
(48, '2016-06-05', 17, 'A'),
(49, '2016-06-05', 2, 'C'),
(50, '2016-06-05', 24, 'C'),
(51, '2016-06-05', 25, 'C'),
(52, '2016-06-05', 5, 'C'),
(53, '2016-06-05', 16, 'A'),
(54, '2016-06-05', 5, 'C'),
(55, '2016-06-05', 5, 'C'),
(56, '2016-06-05', 5, 'C'),
(57, '2016-06-05', 5, 'C'),
(58, '2016-06-05', 5, 'C'),
(59, '2016-06-05', 5, 'C'),
(60, '2016-06-05', 5, 'C'),
(61, '2016-06-05', 5, 'C'),
(62, '2016-06-05', 5, 'C'),
(63, '2016-06-05', 5, 'C'),
(64, '2016-06-05', 5, 'C'),
(65, '2016-06-05', 5, 'C'),
(66, '2016-06-05', 5, 'C'),
(67, '2016-06-05', 5, 'C'),
(68, '2016-06-05', 4, 'C'),
(69, '2016-06-05', 4, 'C'),
(70, '2016-06-05', 4, 'C'),
(71, '2016-06-05', 4, 'C'),
(72, '2016-06-05', 4, 'C'),
(73, '2016-06-05', 4, 'C'),
(74, '2016-06-05', 4, 'C'),
(75, '2016-06-06', 2, 'C'),
(76, '2016-06-06', 8, 'A'),
(77, '2016-06-06', 9, 'A'),
(78, '2016-06-06', 2, 'C'),
(79, '2016-06-06', 9, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(50) COLLATE utf8_bin NOT NULL,
  `tipo_producto` int(11) NOT NULL,
  `categoria_producto` int(11) DEFAULT NULL,
  `desc_producto` text COLLATE utf8_bin,
  `precio_producto` float NOT NULL,
  `img_producto` text COLLATE utf8_bin,
  `fecha_producto` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre_producto`, `tipo_producto`, `categoria_producto`, `desc_producto`, `precio_producto`, `img_producto`, `fecha_producto`) VALUES
(1, 'Pepsi Cola', 2, 2, 'Pepsi Cola', 1.5, '../../Views/img/productos/img1141465053381.png', '2016-06-04 00:00:00'),
(2, 'Coca Cola', 2, 2, 'Coca Cola', 1.8, '../../Views/img/productos/img2861465053409.png', '2016-06-04 00:00:00'),
(3, 'Cerveza', 2, 2, 'Cerveza', 1.2, '../../Views/img/productos/img4711465053460.jpeg', '2016-06-04 00:00:00'),
(4, 'Bocadillo', 1, 3, '', 3.5, '../../Views/img/productos/img7981465053608.jpeg', '2016-06-04 00:00:00'),
(5, 'Bocadillo de atun', 1, 3, '', 4.25, '../../Views/img/productos/img9871465053624.jpeg', '2016-06-04 00:00:00'),
(6, 'Hamburguesa con Queso', 1, 4, '', 4.5, '../../Views/img/productos/img1641465053974.jpeg', '2016-06-04 00:00:00'),
(7, 'Hamburguesa con Baicon', 1, 4, '', 4.65, '../../Views/img/productos/img8221465053998.jpeg', '2016-06-04 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoproducto`
--

DROP TABLE IF EXISTS `tipoproducto`;
CREATE TABLE IF NOT EXISTS `tipoproducto` (
  `id_tipo` int(11) NOT NULL,
  `nombre_tipo` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tipoproducto`
--

INSERT INTO `tipoproducto` (`id_tipo`, `nombre_tipo`) VALUES
(2, 'bebida'),
(1, 'comida'),
(3, 'postre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8_bin NOT NULL,
  `password_usuario` varchar(100) COLLATE utf8_bin NOT NULL,
  `tipo_usuario` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'usuario',
  `fecha_usuario` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `password_usuario`, `tipo_usuario`, `fecha_usuario`) VALUES
(1, 'administrador', 'administrador', 'administrador', '0000-00-00 00:00:00'),
(2, 'usuario', 'usuario', 'usuario', '0000-00-00 00:00:00'),
(3, 'cocina', 'cocina', 'cocina', '0000-00-00 00:00:00'),
(4, 'Usuario2', 'usuario', 'usuario', '2016-06-04 00:00:00'),
(5, 'Pepe', 'usuario', 'usuario', '2016-06-04 00:00:00'),
(8, 'barra1', 'usuario', 'barra', '2016-06-05 00:00:00'),
(9, 'barra2', 'usuario', 'barra', '2016-06-05 00:00:00'),
(10, 'barra3', 'usuario', 'barra', '2016-06-05 00:00:00'),
(11, 'barra4', 'usuario', 'barra', '2016-06-05 00:00:00'),
(16, 'barra', 'usuario', 'barra', '2016-06-05 00:00:00'),
(17, 'barra7', 'usuario', 'barra', '2016-06-05 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nombre_categoria` (`nombre_categoria`);

--
-- Indices de la tabla `detpedido`
--
ALTER TABLE `detpedido`
  ADD PRIMARY KEY (`id_detpedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `tipoproducto`
--
ALTER TABLE `tipoproducto`
  ADD PRIMARY KEY (`id_tipo`),
  ADD UNIQUE KEY `nombre_tipo` (`nombre_tipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `nombre_usuario_2` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `detpedido`
--
ALTER TABLE `detpedido`
  MODIFY `id_detpedido` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=131;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
