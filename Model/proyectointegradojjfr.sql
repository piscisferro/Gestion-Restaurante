-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2016 a las 03:15:29
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `detpedido`
--

INSERT INTO `detpedido` (`id_detpedido`, `pedido_detpedido`, `producto_detpedido`, `servido_detpedido`, `fecha_detpedido`, `precio_detpedido`) VALUES
(1, 1, 1, 1, '2016-06-04 15:32:24', 1.5),
(2, 1, 1, 1, '2016-06-04 15:32:24', 1.5),
(3, 1, 1, 1, '2016-06-04 15:32:24', 1.5),
(4, 1, 2, 1, '2016-06-04 15:32:24', 1.8),
(5, 1, 2, 1, '2016-06-04 15:32:24', 1.8),
(6, 1, 4, 0, '2016-06-04 15:32:24', 3.5),
(7, 1, 4, 0, '2016-06-04 15:32:24', 3.5),
(8, 1, 5, 0, '2016-06-04 15:32:24', 4.25),
(9, 1, 6, 0, '2016-06-04 15:32:24', 4.5),
(10, 1, 6, 0, '2016-06-04 15:32:24', 4.5),
(11, 1, 6, 0, '2016-06-04 15:32:24', 4.5);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `fecha_pedido`, `usuario_pedido`, `abierto_pedido`) VALUES
(1, '2016-06-04', 2, 'A');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `password_usuario`, `tipo_usuario`, `fecha_usuario`) VALUES
(1, 'administrador', 'administrador', 'administrador', '0000-00-00 00:00:00'),
(2, 'usuario', 'usuario', 'usuario', '0000-00-00 00:00:00'),
(3, 'cocina', 'cocina', 'cocina', '0000-00-00 00:00:00'),
(4, 'Usuario2', 'usuario', 'usuario', '2016-06-04 00:00:00'),
(5, 'Pepe', 'usuario', 'usuario', '2016-06-04 00:00:00');

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
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

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
  MODIFY `id_detpedido` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
