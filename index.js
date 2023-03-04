class Character { // FIRST CLASS
    constructor(name, talent) {
        this.name = name;
        this.talent = talent;
    }
    
    describe() {
        return `${this.name} mains ${this.talent}.`;
    }
}

class Guild { // SECOND CLASS
    constructor(name) {
        this.name = name
        this.character = []; // THIS IS MY ARRAY
    }

    addCharacter(character) {
        if (character instanceof Character) {
            this.guilds.push(character);
        } else {
            throw new Error(`You can only add a character. Argument is not a character: ${character}`);
        }
    }

    describe() {
        return `${this.name} has ${this.character.length} characters in slots.`;
    }
}

class Menu {
    constructor() {
        this.guilds = [];
        this.selectedGuild = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createGuild();
                    break;
                case '2':
                    this.viewGuild();
                    break;
                case '3':
                    this.deleteGuild();
                    break;
                case '4':
                    this.displayGuilds();
                    break;
                default:
                    selection = 0;
                    break;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Disconnected.');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new guild
            2) view guild
            3) delete guild
            4) display all guilds
        `);
    }

    showGuildMenuOptions(teamInfo) {
        return prompt(`
            0) back
            1) create player
            2) delete player
            ------------------------
            ${teamInfo}
        `);
    }

    displayGuilds() {
        let guildString = '';
        for (let i = 0; i < this.guilds.length; i++) {
            guildString += i + ') ' + this.guilds[i].name + '\n';
        }
        alert(guildString);
    }

    createGuild() {
        let name = prompt('Enter name for new Guild:');
        this.guilds.push(new Guild(name));
    }

    viewGuild() {
        let index = prompt('Enter the index of the faction you wish to view:');
        if (index > -1 && index < this.guilds.length) {
            this.selectedGuild = this.guilds[index];
            let description = 'Guild Name: ' + this.selectedGuild.name + '\n';

            for(let i = 0; i < this.selectedGuild.character.length; i++) {
                description += i + ') ' + this.selectedGuild.character[i].name + ' - ' + this.selectedGuild.character[i].talent + '\n';
            }

            let selection = this.showGuildMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createCharacter();
                    break;
                case '2':
                    this.deleteCharacter();4
                    break;
            }
        }
    }

    deleteGuild() {
        let index = prompt('Enter the index of the guild you wish to delete: ');
        if (index > -1 && index < this.guilds.length) {
            this.guilds.splice(index, 1);
        }
    }

    createCharacter() {
        let name = prompt('Enter name for your new character: ');
        let talent = prompt('Enter what talent your character will be: ');
        this.selectedGuild.character.push(new Character(name, talent));
    }

    deleteCharacter() {
        let index = prompt('Enter the index of the character you wish to delete: ');
        if (index > -1 && index < this.selectedGuild.character.length) {
            this.selectedGuild.character.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();





