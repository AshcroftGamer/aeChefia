CREATE SCHEMA IF NOT EXISTS `ae_chefia` DEFAULT CHARACTER SET latin1 ;
USE `ae_chefia` ;

-- -----------------------------------------------------
-- Table `ae_chefia`.`bebida_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`bebida_tipo` (
  `id_bebida_tipo` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_tipo` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_bebida_tipo`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`mesas`
-- -----------------------------------------------------

--CREATE TABLE IF NOT EXISTS `ae_chefia`.`mesas` (
 -- `id_mesas` INT(11) NOT NULL AUTO_INCREMENT,
  --`numero_mesa` INT(11) NULL DEFAULT NULL
  --`nome_cliente` VARCHAR(45) NULL DEFAULT NULL,
  --`telefone` SMALLINT(15) NULL DEFAULT NULL,
  --PRIMARY KEY (`id_mesas`))
--ENGINE = InnoDB
--DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`caixa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`caixa` (
  `id_caixa` INT(11) NOT NULL AUTO_INCREMENT,
  `id_mesas` INT(11) NOT NULL,
  PRIMARY KEY (`id_caixa`),
  INDEX `fk_caixa_mesas1_idx` (`id_mesas` ASC) ,
  CONSTRAINT `fk_caixa_mesas1`
    FOREIGN KEY (`id_mesas`)
    REFERENCES `ae_chefia`.`mesas` (`id_mesas`)
        ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`proprietario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`proprietario` (
  `id_proprietario` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(30) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `cpf` VARCHAR(20) NULL DEFAULT NULL,
  `telefone` VARCHAR(20) NULL DEFAULT NULL,
  `senha` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_proprietario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`estabelecimento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`estabelecimento` (
  `id_estabelecimento` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_estabelecimento` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(500) NULL DEFAULT NULL,
  `cep` VARCHAR(25) NULL DEFAULT NULL,
  `endereco` VARCHAR(200) NOT NULL,
  `mesa` INT(15) NULL DEFAULT NULL,
  `id_proprietario` INT(11) NOT NULL,
  PRIMARY KEY (`id_estabelecimento`),
  INDEX `fk_estabelecimento_proprietario` (`id_proprietario` ASC) ,
  CONSTRAINT `fk_estabelecimento_proprietario`
    FOREIGN KEY (`id_proprietario`)
    REFERENCES `ae_chefia`.`proprietario` (`id_proprietario`)
        ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`cardapio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`cardapio` (
  `id_cardapio` INT(11) NOT NULL AUTO_INCREMENT,
  `id_estabelecimento` INT(11) NOT NULL,
  PRIMARY KEY (`id_cardapio`),
  INDEX `fk_cardapio_estabelecimento1_idx` (`id_estabelecimento` ASC) ,
  CONSTRAINT `fk_cardapio_estabelecimento1`
    FOREIGN KEY (`id_estabelecimento`)
    REFERENCES `ae_chefia`.`estabelecimento` (`id_estabelecimento`)
        ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`funcionario` (
  `id_funcionario` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_funcionario` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `login` VARCHAR(20) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `id_estabelecimento` INT(11) NOT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) ,
  INDEX `fk_funcionario_estabelecimento1_idx` (`id_estabelecimento` ASC) ,
  CONSTRAINT `fk_funcionario_estabelecimento1`
    FOREIGN KEY (`id_estabelecimento`)
    REFERENCES `ae_chefia`.`estabelecimento` (`id_estabelecimento`)
        ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`item_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`item_tipo` (
  `id_item_tipo` INT(11) NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_item_tipo`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`marcas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`marcas` (
  `id_marcas` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_marca` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_marcas`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`medidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`medidas` (
  `id_medidas` INT(11) NOT NULL AUTO_INCREMENT,
  `medida` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id_medidas`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`itens_do_cardapio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`itens_do_cardapio` (
  `id_itens_do_cardapio` INT(11) NOT NULL AUTO_INCREMENT,
  `id_cardapio` INT(11) NOT NULL,
  `id_item_tipo` INT(11) NOT NULL,
  `id_bebida_tipo` INT(11) NULL DEFAULT NULL,
  `id_marcas` INT(11) NULL DEFAULT NULL,
  `id_medidas` INT(11)NOT NULL ,
  `nome_comida` VARCHAR(20) NULL DEFAULT NULL,
  `preco` FLOAT NOT NULL,
  PRIMARY KEY (`id_itens_do_cardapio`),
  INDEX `fk_itens_do_cardapio_cardapio1_idx` (`id_cardapio` ASC) ,
  INDEX `fk_itens_do_cardapio_item_tipo1_idx` (`id_item_tipo` ASC) ,
  INDEX `fk_itens_do_cardapio_bebida_tipo1_idx` (`id_bebida_tipo` ASC) ,
  INDEX `fk_itens_do_cardapio_marcas1_idx` (`id_marcas` ASC),
  INDEX `fk_itens_do_cardapio_medidas1_idx` (`id_medidas` ASC) ,
  CONSTRAINT `fk_itens_do_cardapio_bebida_tipo1`
    FOREIGN KEY (`id_bebida_tipo`)
    REFERENCES `ae_chefia`.`bebida_tipo` (`id_bebida_tipo`)
        ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_itens_do_cardapio_cardapio1`
    FOREIGN KEY (`id_cardapio`)
    REFERENCES `ae_chefia`.`cardapio` (`id_cardapio`)
        ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_itens_do_cardapio_item_tipo1`
    FOREIGN KEY (`id_item_tipo`)
    REFERENCES `ae_chefia`.`item_tipo` (`id_item_tipo`)
        ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_itens_do_cardapio_marcas1`
    FOREIGN KEY (`id_marcas`)
    REFERENCES `ae_chefia`.`marcas` (`id_marcas`)
        ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_itens_do_cardapio_medidas1`
    FOREIGN KEY (`id_medidas`)
    REFERENCES `ae_chefia`.`medidas` (`id_medidas`)
        ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `ae_chefia`.`user_1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ae_chefia`.`user_1` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE TABLE IF NOT EXISTS `ae_chefia`.`comanda` (
  `id_comanda` INT(11) NOT NULL AUTO_INCREMENT,
  `mesa` INT(11) NOT NULL,
  `cliente` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(25) NOT NULL,
  `status` TINYINT(4) NOT NULL,
  `id_estabelecimento` int(11)NOT NULL
  PRIMARY KEY (`id_comanda`),
    INDEX `fk_comanda_estabelecimento_idx` (`id_estabelecimento` ASC) ,
  CONSTRAINT `fk__comanda_estabelecimento`
    FOREIGN KEY (`id_estabelecimento`)
    REFERENCES `ae_chefia`.`id_estabelecimento` (`id_estabelecimento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ae_chefia`.`pedidos_comanda` (
  `id_pedido` INT(11) NOT NULL AUTO_INCREMENT,
  `id_comanda` INT(11) NOT NULL,
  `quant` VARCHAR(45) NULL DEFAULT NULL,
  `id_itens_do_cardapio` INT(11) NOT NULL,
  `id_funcionario` INT(11) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedidos_comanda_itens_do_cardapio1_idx` (`id_itens_do_cardapio` ASC) ,
  INDEX `fk_pedidos_comanda_comanda1_idx` (`id_comanda` ASC) ,
  INDEX `fk_pedidos_comanda_funcionario1_idx` (`id_funcionario` ASC) ,
  CONSTRAINT `fk_pedidos_comanda_itens_do_cardapio1`
    FOREIGN KEY (`id_itens_do_cardapio`)
    REFERENCES `ae_chefia`.`itens_do_cardapio` (`id_itens_do_cardapio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_comanda_comanda1`
    FOREIGN KEY (`id_comanda`)
    REFERENCES `ae_chefia`.`comanda` (`id_comanda`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_comanda_funcionario1`
    FOREIGN KEY (`id_funcionario`)
    REFERENCES `ae_chefia`.`funcionario` (`id_funcionario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
