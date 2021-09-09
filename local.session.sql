describe estabelecimento;


-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ae_chefia
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ae_chefia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ae_chefia` ;
USE `ae_chefia` ;

-- -----------------------------------------------------
-- Table `ae_chefia`.`proprietario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`proprietario` (
  `id_proprietario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(30) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `cpf` BIGINT(20) NOT NULL,
  `telefone` BIGINT(20) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_proprietario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`estabelecimento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`estabelecimento` (
  `id_estabelecimento` INT NOT NULL AUTO_INCREMENT,
  `nome_estabelecimento` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(500) NULL,
  `cep` BIGINT(20) NOT NULL,
  `endereco` VARCHAR(200) NOT NULL,
  `mesa` INT(15) NULL,
  `id_proprietario` INT NOT NULL,
  PRIMARY KEY (`id_estabelecimento`),
  INDEX `fk_estabelecimento_proprietario` (`id_proprietario` ASC) ,
  CONSTRAINT `fk_estabelecimento_proprietario`
    FOREIGN KEY (`id_proprietario`)
    REFERENCES `ae_chefia`.`proprietario` (`id_proprietario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`cardapio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`cardapio` (
  `id_cardapio` INT NOT NULL AUTO_INCREMENT,
  `id_estabelecimento` INT NOT NULL,
  PRIMARY KEY (`id_cardapio`),
  INDEX `fk_cardapio_estabelecimento1_idx` (`id_estabelecimento` ASC) ,
  CONSTRAINT `fk_cardapio_estabelecimento1`
    FOREIGN KEY (`id_estabelecimento`)
    REFERENCES `ae_chefia`.`estabelecimento` (`id_estabelecimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`funcionario` (
  `id_funcionario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `login` VARCHAR(20) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `id_estabelecimento` INT NOT NULL,
  PRIMARY KEY (`id_funcionario`),
  INDEX `fk_funcionario_estabelecimento1_idx` (`id_estabelecimento` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) ,
  CONSTRAINT `fk_funcionario_estabelecimento1`
    FOREIGN KEY (`id_estabelecimento`)
    REFERENCES `ae_chefia`.`estabelecimento` (`id_estabelecimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`bebida_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`bebida_tipo` (
  `id_bebida_tipo` INT NOT NULL AUTO_INCREMENT,
  `nome_tipo` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_bebida_tipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`medidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`medidas` (
  `id_medidas` INT NOT NULL AUTO_INCREMENT,
  `medida` VARCHAR(20) NULL,
  `porcao` VARCHAR(20) NULL,
  PRIMARY KEY (`id_medidas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`marcas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`marcas` (
  `id_marcas` INT NOT NULL AUTO_INCREMENT,
  `nome_marca` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_marcas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`item_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`item_tipo` (
  `id_item_tipo` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_item_tipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`itens_do_cardapio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`itens_do_cardapio` (
  `id_itens_do_cardapio` INT NOT NULL AUTO_INCREMENT,
  `id_cardapio` INT NOT NULL,
  `id_item_tipo` INT NOT NULL,
  `id_bebida_tipo` INT NULL,
  `id_marcas` INT NULL,
  `id_medidas` INT NOT NULL,
  `nome_comida` VARCHAR(20) NULL,
  `preco` FLOAT NOT NULL,
  PRIMARY KEY (`id_itens_do_cardapio`),
  INDEX `fk_itens_do_cardapio_cardapio1_idx` (`id_cardapio` ASC) ,
  INDEX `fk_itens_do_cardapio_item_tipo1_idx` (`id_item_tipo` ASC) ,
  INDEX `fk_itens_do_cardapio_bebida_tipo1_idx` (`id_bebida_tipo` ASC) ,
  INDEX `fk_itens_do_cardapio_marcas1_idx` (`id_marcas` ASC) ,
  INDEX `fk_itens_do_cardapio_medidas1_idx` (`id_medidas` ASC) ,
  CONSTRAINT `fk_itens_do_cardapio_cardapio1`
    FOREIGN KEY (`id_cardapio`)
    REFERENCES `ae_chefia`.`cardapio` (`id_cardapio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_do_cardapio_item_tipo1`
    FOREIGN KEY (`id_item_tipo`)
    REFERENCES `ae_chefia`.`item_tipo` (`id_item_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_do_cardapio_bebida_tipo1`
    FOREIGN KEY (`id_bebida_tipo`)
    REFERENCES `ae_chefia`.`bebida_tipo` (`id_bebida_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_do_cardapio_marcas1`
    FOREIGN KEY (`id_marcas`)
    REFERENCES `ae_chefia`.`marcas` (`id_marcas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_do_cardapio_medidas1`
    FOREIGN KEY (`id_medidas`)
    REFERENCES `ae_chefia`.`medidas` (`id_medidas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`mesas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`mesas` (
  `id_mesas` INT NOT NULL AUTO_INCREMENT,
  `nome_cliente` VARCHAR(45) NULL,
  `telefone` SMALLINT(15) NULL,
  PRIMARY KEY (`id_mesas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`caixa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`caixa` (
  `id_caixa` INT NOT NULL AUTO_INCREMENT,
  `id_mesas` INT NOT NULL,
  PRIMARY KEY (`id_caixa`),
  INDEX `fk_caixa_mesas1_idx` (`id_mesas` ASC) ,
  CONSTRAINT `fk_caixa_mesas1`
    FOREIGN KEY (`id_mesas`)
    REFERENCES `ae_chefia`.`mesas` (`id_mesas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ae_chefia`.`user_1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`user_1` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
