const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const band = await Band.create({
            name: 'The Beatles',
            genre: 'Rock'
        });
        expect(band.name).toBe('The Beatles');
        expect(band.genre).toBe('Rock');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician = await Musician.create({
            name: 'Travis Barker',
            instrument: 'Drums'
        });
        expect(musician.name).toBe('Travis Barker');
        expect(musician.instrument).toBe('Drums');
    })

    test('can create a Song', async () => {
        // TODO - test creating a song
        const song = await Song.create({
            title: 'Stairway to Heaven',
            year: 1971,
            length: 480
        });
        expect(song.title).toBe('Stairway to Heaven');
        expect(song.year).toBe(1971);
        expect(song.length).toBe(480);
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        const band = await Band.create({
            name: 'Backstreet Boys',
            genre: 'Alternative'
        });
        await band.update({ genre: 'Pop' });
        expect(band.genre).toBe('Pop');
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const musician = await Musician.create({
            name: 'Hans Zimmer',
            instrument: 'Flute'
        });
        await musician.update({ instrument: 'Piano' });
        expect(musician.instrument).toBe('Piano');
    })

    test('can update a Song', async () => {
        // TODO - test updating a song
        const song = await Song.create({
            title: 'Bohemian Rhapsody',
            year: 1975,
            length: 354
        });
        await song.update({ length: 367 });
        expect(song.length).toBe(367);
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const band = await Band.create({
            name: '98 Degrees',
            genre: 'Pop'
        });
        await band.destroy();
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const musician = await Musician.create({
            name: 'Taylor Swift',
            instrument: 'Guitar'
        });
        await musician.destroy();
    })

    test('can delete a Song', async () => {
        // TODO - test deleting a song
        const song = await Song.create({
            title: 'Hotel California',
            year: 1976,
            length: 390
        });
        await song.destroy();
    })

    // Part 2
    // One-to-Many Test

    test('Band can have Musicians', async () => {
        const band = await Band.create({
            name: 'Blink-182',
            genre: 'Punk'
        });
        await Musician.create({
            name: 'Mark Hoppus',
            instrument: 'Bass',
            bandId: band.id
        });
        await Musician.create({
            name: 'Travis Barker',
            instrument: 'Drums',
            bandId: band.id
        });
        const bands = await Band.findAll();
        const musicians = await band.getMusicians();
        expect(musicians.length).toBe(2);
    });

    // Many-to-Many Test

    test('Band can have Songs', async () => {
        const band = await Band.create({
            name: 'Backstreet Boys',
            genre: 'Pop'
        });
        const song1 = await Song.create({
            title: 'I Want It That Way',
            year: 1999,
            length: 200
        }); 
        const song2 = await Song.create({
            title: 'Everybody', 
            year: 1997, 
            length: 210 
        });
        await band.addSong(song1);
        await band.addSong(song2);
        const songs = await band.getSongs();
        expect(songs.length).toBe(2);
    });

    test('Band can have multiple Musicians and Songs', async () => {
        const band = await Band.create({
            name: 'Blackpink',
            genre: 'K-Pop'
        });
        await Musician.create({
            name: 'Jennie Kim',
            instrument: 'Vocals',
            bandId: band.id
        });
        await Musician.create({
            name: 'Lisa Manoban',
            instrument: 'Rap',
            bandId: band.id
        });
        const song1 = await Song.create({
            title: 'Kill This Love',
            year: 2019,
            length: 190
        });
        const song2 = await Song.create({
            title: 'How You Like That',
            year: 2020,
            length: 200
        });
        await band.addSongs([song1, song2]);

        const musicians = await band.getMusicians();
        const songs = await band.getSongs();
        expect(musicians.length).toBe(2);
        expect(songs.length).toBe(2);
    });
});