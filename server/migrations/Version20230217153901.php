<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230217153901 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE game_game_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE player_player_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE role_role_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE team_team_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE tournament_tournament_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE game (game_id INT NOT NULL, team_one_id INT NOT NULL, team_two_id INT NOT NULL, tournament_id INT NOT NULL, team_one_score INT NOT NULL, team_two_score INT NOT NULL, PRIMARY KEY(game_id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_232B318C8D8189CA ON game (team_one_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_232B318CE6DD6E05 ON game (team_two_id)');
        $this->addSql('CREATE INDEX IDX_232B318C33D1A3E7 ON game (tournament_id)');
        $this->addSql('CREATE TABLE player (player_id INT NOT NULL, team_id INT NOT NULL, role_id INT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, foreground VARCHAR(255) NOT NULL, background VARCHAR(255) NOT NULL, PRIMARY KEY(player_id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_98197A65296CD8AE ON player (team_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_98197A65D60322AC ON player (role_id)');
        $this->addSql('CREATE TABLE role (role_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(role_id))');
        $this->addSql('CREATE TABLE team (team_id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(team_id))');
        $this->addSql('CREATE TABLE tournament (tournament_id INT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(tournament_id))');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C8D8189CA FOREIGN KEY (team_one_id) REFERENCES team (team_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CE6DD6E05 FOREIGN KEY (team_two_id) REFERENCES team (team_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C33D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A65296CD8AE FOREIGN KEY (team_id) REFERENCES team (team_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A65D60322AC FOREIGN KEY (role_id) REFERENCES role (role_id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE game_game_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE player_player_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE role_role_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE team_team_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE tournament_tournament_id_seq CASCADE');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT FK_232B318C8D8189CA');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT FK_232B318CE6DD6E05');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT FK_232B318C33D1A3E7');
        $this->addSql('ALTER TABLE player DROP CONSTRAINT FK_98197A65296CD8AE');
        $this->addSql('ALTER TABLE player DROP CONSTRAINT FK_98197A65D60322AC');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE player');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE team');
        $this->addSql('DROP TABLE tournament');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
