<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230202194402 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE game_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE player_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE role_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE team_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE tournament_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE game (
                            game_id INT NOT NULL, 
                            team_id_one INT NOT NULL, 
                            team_id_two INT NOT NULL, 
                            team_one_score INT NOT NULL,
                            team_two_score INT NOT NULL, 
                            tournament_id INT NOT NULL, PRIMARY KEY(game_id))');
        $this->addSql('CREATE TABLE player (
                            player_id INT NOT NULL, 
                            player_first_name VARCHAR(255) NOT NULL, 
                            player_last_name VARCHAR(255) NOT NULL, 
                            player_foreground VARCHAR(255) NOT NULL, 
                            player_background VARCHAR(255) NOT NULL, 
                            team_id INT NOT NULL, 
                            user_role_id INT NOT NULL, PRIMARY KEY(player_id))');
        $this->addSql('CREATE TABLE role (
                            role_id INT NOT NULL, 
                            player_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(role_id))');
        $this->addSql('CREATE INDEX IDX_57698A6A99E6F5DF ON role (player_id)');
        $this->addSql('CREATE TABLE team (
                            team_id INT NOT NULL,
                            player_id INT DEFAULT NULL, 
                            game_id INT DEFAULT NULL, 
                            team_name VARCHAR(255) NOT NULL, PRIMARY KEY(team_id))');
        $this->addSql('CREATE INDEX IDX_C4E0A61F99E6F5DF ON team (player_id)');
        $this->addSql('CREATE INDEX IDX_C4E0A61FE48FD905 ON team (game_id)');
        $this->addSql('CREATE TABLE tournament (
                            tournament_id INT NOT NULL, 
                            game_id INT DEFAULT NULL, 
                            tournament_start_date DATE DEFAULT NULL, 
                            tournament_end_date DATE NOT NULL, 
                            tournament_name VARCHAR(255) NOT NULL, PRIMARY KEY(tournament_id))');
        $this->addSql('CREATE INDEX IDX_BD5FB8D9E48FD905 ON tournament (game_id)');
        $this->addSql('ALTER TABLE role ADD CONSTRAINT FK_57698A6A99E6F5DF FOREIGN KEY (player_id) REFERENCES player (player_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61F99E6F5DF FOREIGN KEY (team_id) REFERENCES player (player_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FE48FD905 FOREIGN KEY (team_id) REFERENCES game (game_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tournament ADD CONSTRAINT FK_BD5FB8D9E48FD905 FOREIGN KEY (tournament_id) REFERENCES game (game_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE game_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE player_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE role_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE team_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE tournament_id_seq CASCADE');
        $this->addSql('ALTER TABLE role DROP CONSTRAINT FK_57698A6A99E6F5DF');
        $this->addSql('ALTER TABLE team DROP CONSTRAINT FK_C4E0A61F99E6F5DF');
        $this->addSql('ALTER TABLE team DROP CONSTRAINT FK_C4E0A61FE48FD905');
        $this->addSql('ALTER TABLE tournament DROP CONSTRAINT FK_BD5FB8D9E48FD905');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE player');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE team');
        $this->addSql('DROP TABLE tournament');
    }
}
