CREATE TABLE logs(`datetime` datetime not null default NOW(),log_message VARCHAR(200) NOT NULL);


DELIMITER //
CREATE PROCEDURE `Visit_log` (IN _flat int(11),IN _id int(11))
BEGIN
INSERT INTO `logs`(log_message) VALUES(CONCAT("The flat number is:",_flat," and the visitor id is:",_id));
END//
DELIMITER ;



DELIMITER //
CREATE TRIGGER `Visit_trigger`
AFTER INSERT ON `apartment`.`Visitor`
FOR EACH ROW
BEGIN
CALL Visit_log(NEW.`flat`,NEW.`id`);
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `Security_log` (IN _username varchar(20),IN _phone char(10))
BEGIN
UPDATE TABLE Security set logged_in=1 where username=_username and phone=_phone;
END//
DELIMITER ;



DELIMITER //
CREATE TRIGGER `Visit_trigger`
AFTER INSERT ON `apartment`.`Visitor`
FOR EACH ROW
BEGIN
CALL Visit_log(NEW.`flat`,NEW.`id`);
END//
DELIMITER ;
