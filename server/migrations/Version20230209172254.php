<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230209172254 extends AbstractMigration
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
                            team_one_id INT NOT NULL, 
                            team_two_id INT NOT NULL, 
                            tournament_id INT NOT NULL, 
                            team_one_score INT NOT NULL, 
                            team_two_score INT NOT NULL, PRIMARY KEY(game_id))');
        $this->addSql('CREATE UNIQUE INDEX ux_game_team_one_id ON game (team_one_id)');
        $this->addSql('CREATE UNIQUE INDEX ux_game_team_two_id ON game (team_two_id)');
        $this->addSql('CREATE INDEX ix_game_tournament_id ON game (tournament_id)');
        $this->addSql('CREATE TABLE player (
                            player_id INT NOT NULL, 
                            team_id INT NOT NULL, 
                            role_id INT NOT NULL, 
                            first_name TEXT NOT NULL, 
                            last_name TEXT NOT NULL, 
                            foreground VARCHAR(255) NOT NULL, 
                            background VARCHAR(255) NOT NULL, PRIMARY KEY(player_id))');
        $this->addSql('CREATE UNIQUE INDEX ux_player_team_id ON player (team_id)');
        $this->addSql('CREATE UNIQUE INDEX ux_player_role_id ON player (role_id)');
        $this->addSql('CREATE TABLE role (
                            role_id INT NOT NULL, 
                            name VARCHAR(255) NOT NULL, PRIMARY KEY(role_id))');
        $this->addSql('CREATE TABLE team (
                            team_id INT NOT NULL, 
                            name VARCHAR(255) NOT NULL, PRIMARY KEY(team_id))');
        $this->addSql('CREATE TABLE tournament (
                            tournament_id INT NOT NULL, 
                            start_date DATE NOT NULL, 
                            end_date DATE NOT NULL, 
                            name VARCHAR(255) NOT NULL, PRIMARY KEY(tournament_id))');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT fk_team_game FOREIGN KEY (team_one_id) REFERENCES team (team_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT fk_team_game FOREIGN KEY (team_two_id) REFERENCES team (team_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT fk_tournament_game FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT fk_team_player FOREIGN KEY (team_id) REFERENCES team (team_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT fk_player_role FOREIGN KEY (role_id) REFERENCES role (role_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
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
        $this->addSql('ALTER TABLE game DROP CONSTRAINT fk_team_game');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT fk_team_game');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT fk_tournament_game');
        $this->addSql('ALTER TABLE player DROP CONSTRAINT fk_team_player');
        $this->addSql('ALTER TABLE player DROP CONSTRAINT fk_player_role');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE player');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE team');
        $this->addSql('DROP TABLE tournament');
    }
}
