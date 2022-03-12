import {MigrationInterface, QueryRunner} from "typeorm";

const cardsToAdd = [
    { id: 101, name: 'Fxdpt', description: `Le schweppes tonic est sa kryptonite`, level: 2, imageName: 'fxdpt.jpg', isFusion: false, lore: 'Fx a un souci cardiaque et dans le Schweppes Tonic il y a de la quinine qui est un excitant' },
    { id: 102, name: 'Dron', description: `Auteur et parolier de rap aux gouts douteux`, level: 2, imageName: 'dron.jpg', isFusion: false, lore: 'Dron aime le rap FR et sortir des punchlines ou faire des citations de rappeur, mais en terme de jeu vidéo il a apprécié des jeux ne faisant pas l\'unanimité dirons nous' },
    { id: 103, name: 'Tribal', description: `Il adore s'envoyer en l'air`, level: 2, imageName: 'tribal.jpg', isFusion: false, lore: 'Tribal (ou encore Swordcrash) est fan d\'aviation, voilà tout' },
    { id: 104, name: 'Devola et Popola', description: `Waifu material, debat parallèle`, level: 3, imageName: 'devolapopola.jpg', isFusion: false, lore: '2 waifus incroyables de Nier Replicant et Nier Automata. Ici à la rédac\', on aime beaucoup' },
    { id: 105, name: 'Yuito & Kasane', description: `Héros unis par les fils rouges`, level: 2, imageName: 'scarlet.jpg', isFusion: false, lore: 'Le fil rouge est leur pouvoir commun et ils font parti des rares personnes capable d\'utiliser ce pouvoir' },
    { id: 106, name: 'Arashi', description: `Rapide comme l'éclair, fainéante comme jamais`, level: 4, imageName: 'arashi.jpg', isFusion: false, lore: 'Petit traitement de faveur parce que je la trouve trop stylée. Son pouvoir est une rapidité extrême, mais elle aime par dessus tout ne rien faire, comme moi' },
    { id: 107, name: 'Bastion', description: `Le premier chef d'oeuvre avec un narrateur à la voix suave`, level: 2, imageName: 'bastion.jpg', isFusion: false, lore: 'Un petit jeu indé incroyable avec un narrateur exceptionnel' },
    { id: 108, name: 'Transistor', description: `Meilleur jeu indé de l'année 2014 à la BO incroyable`, level: 4, imageName: 'transistor.jpg', isFusion: false, lore: 'Le premier jeu indé qui m\'a mis sur le cul tellement il est exceptionnel avec une BO incroyable de Darren Korb' },
    { id: 109, name: 'Pyre', description: `Mix entre du hand-ball et réfugié syrien simulator`, level: 1, imageName: 'pyre.jpg', isFusion: false, lore: 'Un jeu avec beaucoup de blabla, un gameplay avec un ballon ressemblant au handball, où le but est de fuir la zone où nos héros sont, une zone où tous les rebuts de la société se trouve' },
    { id: 110, name: 'Hades', description: `Le jeu indépendant qui a conquis le monde`, level: 3, imageName: 'hades.jpg', isFusion: false, lore: 'Indé primé moulte fois, le plus gros succès de Supergiant Games' },
    { id: 111, name: 'Supergiant Games', description: `L'un des meilleurs studios indé`, level: 3, imageName: 'supergiant.jpg', isFusion: true, lore: 'Un studio de développement qui a produit uniquement des dingueries, avec une politique non toxique <3', fusionDeps: [107, 108, 109, 110] },
    { id: 112, name: 'Remember Me', description: `N'a pas eu le succès escompté mais un véritable chef d'oeuvre`, level: 2, imageName: 'remember.jpg', isFusion: false, lore: 'Un jeu incroyable, mélangeant Beat\'em\'all, plate-forme et réflexion avec une histoire très cool, mais qui ne s\'est pas vendu autant qu\'il aurait mérité' },
    { id: 113, name: 'Life is Strange', description: `La vie est bizarre, surtout quand t'as des super-pouvoirs`, level: 2, imageName: 'lis.jpg', isFusion: false, lore: 'Jeu narratif qui a un peu redéfini le genre, chaque jeu est une nouvelle histoire avec des capacités particulières (le 2 est nul)' },
    { id: 114, name: 'Vampyr', description: `Etre médecin et vampire, ça aide pour les prises de sang`, level: 1, imageName: 'vampyr.jpg', isFusion: false, lore: 'Jeu dans un 18e siècle victorien, où on joue un médecin vampire, dans une ville infectée par la Peste' },
    { id: 115, name: 'Dontnod Studio', description: `Parce que la FRANCE fait aussi de bons jeux`, level: 2, imageName: 'dontnod.jpg', isFusion: true, lore: 'Studio Parisien qui a fait des jeux très cools et variés', fusionDeps: [112, 113, 114] },
    { id: 116, name: 'Ori', description: `Un métroidvania magnifique aux controles très agréables`, level: 3, imageName: 'ori.jpg', isFusion: false, lore: 'Deux jeux de plate-forme sublimes, à la bande son incroyable et au gameplay d\'une fluidité exceptionnelle' },
    { id: 117, name: 'Horizon', description: `A quel moment appeler son personnage principal 'alliage' est une bonne idée ?`, level: 4, imageName: 'horizon.jpg', isFusion: false, lore: 'Le personnage principal s\'appelle Aloy, et Alloy en anglais ça veut dire alliage. Comme celui des robots du jeu. c tro mal1' },
    { id: 118, name: 'Nier', description: `L'un est bon, l'autre est surcoté`, level: 2, imageName: 'nier.jpg', isFusion: false, lore: 'J\'ai découvert la licence avec Nier Automata où les gens se branlent sur l\'histoire que je trouve claqué, le jeu est soit disant philosophique alors que bof, y\'avait bien mieux à faire, mais au moins Nier Replicant (premier du nom ou son remake peu importe) a déjà une histoire plus compréhensible et qui exploite correctement son univers' },
    { id: 119, name: 'Mass Effect', description: `Surcoté, une étoile télérama et encore c'est généreux`, level: 1, imageName: 'masseffect.jpg', isFusion: false, lore: 'Je vous ai déjà dit que j\'avais pas aimé ?' },
    { id: 120, name: 'Inmost', description: `Une pépite au pixel art sublimé par la lumière avec une histoire avec un theme dur`, level: 3, imageName: 'inmost.jpg', isFusion: false, lore: 'Petit jeu sans prétention qui est incroyablement beau avec son pixel art soigné et surtout ses lumières, et qui parle d\'un sujet pas très cool mais bon je vais rien dire sinon jvais vous spoil. Faites le jeu <3' },
    { id: 121, name: 'Cave Story', description: `Un petit jeu fait par un Japonais solo qui a fini par être un classique`, level: 1, imageName: 'cave.jpg', isFusion: false, lore: 'Ce jeu est sorti sur PC en 2004, créé par un mec solo en 5 ans. Il est gratuit en plus. Le jeu a ensuite été porté par son créateur et une autre personne pour sortir le jeu sur le WiiWare en 2010, puis le jeu a été refait en mieux et est sorti en 2011 sur Steam, 3DS en 2012 et Switch en 2017 !' },
    { id: 122, name: 'The Last of Us', description: `Le jeu qui ne suit pas les codes Holywoodiens et ça plait pas aux joueurs`, level: 3, imageName: 'tlou.jpg', isFusion: false, lore: 'On a toujours des films ou des jeux avec les mêmes développement d\'histoire et de personnage, avec la même happy ending, alors quand les choses changent un peu, forcément les gens sont surpris et ralent... La peur du changement que voulez vous' },
    { id: 123, name: 'Hellblade', description: `Entendre des voix pour une immersion incroyable`, level: 2, imageName: 'hellblade.jpg', isFusion: false, lore: 'Senua, le personnage principal, a des petits problèmes dans sa tête, et le jeu retranscrit ça de plusieurs manières et notamment avec de multiples murmures très immersifs' },
    { id: 124, name: 'Electronic Super Joy', description: `Un jeu où le pape vole ton cul est forcément exceptionnel (attention à l'épilepsie)`, level: 1, imageName: 'esj.jpg', isFusion: false, lore: 'La description, c\'est littéralement la base de l\'histoire du premier jeu. Le jeu a beaucoup d\'effets visuels, d\'où le warning' },
    { id: 125, name: 'Hollow Knight', description: `Silksong annoncé incessament sous peu, c'est sûr`, level: 3, imageName: 'hollow.jpg', isFusion: false, lore: 'Silksong, la suite du premier jeu, est attendu depuis très longtemps et chaque conf est le moment parfait pour espérer l\'annonce' },
    { id: 126, name: 'Celeste', description: `Quand tu combats la dépression en t'enfonçant dans le tryhard`, level: 2, imageName: 'celeste.jpg', isFusion: false, lore: 'Le jeu représente le combat contre la dépression (escalader la montagne, affronter ses démons, tout ça), mais avec sa difficulté il faut bien tryhard et si vous êtes pas persévérants, potentiellement vous déprimer' },
    { id: 127, name: 'Gris', description: `Un jeu indé qu'Ashara a trouvé beau, c'est vous dire la qualité du jeu`, level: 2, imageName: 'gris.jpg', isFusion: false, lore: 'Ashara est quelqu\'un d\'exigeant. Alors quand un jeu indé le rend aussi enthousiaste, c\'est que le jeu est exceptionnel' },
    { id: 128, name: 'A Hat in time', description: `Mario mais en mieux, et tout mignon`, level: 1, imageName: 'hat.jpg', isFusion: false, lore: 'Jeu de plate-forme très agréable, tout mignon, avec plusieurs petites histoires par monde qui change du sauvetage de princesse. L\'illustration c\'est un screenshot de mon personnage, il est meugnon hein ?' },
    { id: 129, name: 'Spyro', description: `Le dragon le plus mignon du jeu vidéo`, level: 2, imageName: 'spyro.jpg', isFusion: false, lore: 'Classique parmi les classiques, je ne pense pas devoir vous le présenter !' },
    { id: 130, name: 'Crash Bandicoot', description: `Le bandicoot le plus barré de l'univers`, level: 2, imageName: 'crash.jpg', isFusion: false, lore: 'Crash est le bandicoot le plus barré de l\'univers mais en même temps, il y en a pas des masses vu que cette race est issue des experimentations de Docteur Cortex' },
    { id: 131, name: 'Read Dead Redemption', description: `Des cowboys qui s'attirent des ennuis`, level: 3, imageName: 'rdr.jpg', isFusion: false, lore: 'Jeu de cowboy par excellence, tout commence bien aux débuts des jeux quand soudain : c\'est la merde' },
    { id: 132, name: 'Dragon Quest VIII', description: `A la poursuite d'un clown et d'un sceptre magique`, level: 3, imageName: 'dq8.jpg', isFusion: false, lore: 'Le méchant de l\'histoire est Dhoulmagus, un fou du roi, et il possède un sceptre maléfique qui nous obligera à parcourir le monde et ses dangers !' },
    { id: 133, name: 'Dragon Quest XI', description: `Le jeu de schrodinger : Je l'ai fini mais je l'ai pas fini`, level: 3, imageName: 'dq11.jpg', isFusion: false, lore: 'J\'ai fini l\'histoire normale du jeu, à la fin de celle ci.... En fait il y a une suite ! Et je n\'ai jamais eu/pris le temps de la faire' },
    { id: 134, name: 'Ruiner', description: `Violence and Cyberpunk intensifies`, level: 1, imageName: 'ruiner.jpg', isFusion: false, lore: 'Bon bah... C\'est juste un jeu ultra violent dans un univers cyberpunk quoi' },
    { id: 135, name: 'Detroit Become Human', description: `Le sauveur, l'android au grand coeur, et le connard`, level: 1, imageName: 'detroit.jpg', isFusion: false, lore: 'On joue 3 personnages, un robot qui veut sauver son espèce, une autre qui protège une petite fille, et un connard (robot aussi) qui est du coté des flics et de l\'oppression' },
    { id: 136, name: 'The order 1886', description: `Un jeu très cool qui n'aura jamais de suite, c'est triste`, level: 1, imageName: 'order.jpg', isFusion: false, lore: 'Le jeu est sorti au début de l\'air PS4, il était très cool mais forcément bien moins avancé et connu que les jeux de fin de génération. Il était pourtant très sympa dans un univers original' },
    { id: 137, name: 'Prey', description: `Une masterclass du jeu vidéo, avec un DLC innovant, qui enseigne que les gros sont méchants`, level: 2, imageName: 'prey.jpg', isFusion: false, lore: 'Jeu qui nous a enseigné que chaque personnage gros dans un jeu vidéo est un méchant, malgré tout c\'est un jeu incroyable, mais je vous conseille encore plus son DLC qui est exceptionnel (Deathloop mais en bien finalement)' },
    { id: 138, name: 'Spec Ops', description: `C'était pas ma guerre`, level: 1, imageName: 'specops.jpg', isFusion: false, lore: 'Un jeu de guerre où on incarne un soldat et qui retranscrit, pour une fois, les traumatismes que cela peut avoir' },
    { id: 139, name: 'Crysis', description: `C'était mieux avant`, level: 1, imageName: 'crysis.jpg', isFusion: false, lore: 'Typiquement le genre de jeux qui ne s\'est pas bonifié avec le temps. Les deux premiers sont très bien, c\'est tout ce que je dirais' },
    { id: 140, name: 'Undertale', description: `Surcoté, rip Toriel`, level: 1, imageName: 'undertale.jpg', isFusion: false, lore: 'Jeu apprécié par une bonne partie des joueurs mais que j\'ai trouvé pas fou sur tous les points (à part Mettaton). Ah et j\'ai tué personne dans ma run à part notre mère adoptive, ne suis je pas un enfant modèle ?' },
    { id: 141, name: 'Gran Turismo 7', description: `ELLE EST BELLE MA SUBARU HEIN ?`, level: 2, imageName: 'gt7.jpg', isFusion: false, lore: 'La réponse à la question de la description est : oui' },
    { id: 142, name: 'Lost Ark', description: `Je déteste les MMOs, mais je suis conquis`, level: 3, imageName: 'lostark.jpg', isFusion: false, lore: 'Je ne suis pas un grand fan de MMO, loin de là, mais il y a des exceptions à tout' },
]

export class NewBunchOfCards1647106697860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fusions = []
        for (let i = 0; i < cardsToAdd.length; ++i) {
            const card = cardsToAdd[i]

            if (card.isFusion) {
                fusions.push(card);
            }

            await queryRunner.query(`INSERT INTO card_type(id, name, description, level, imageName, isFusion, lore) VALUES(${card.id}, "${card.name}", "${card.description}", ${card.level}, "/${card.imageName}", ${card.isFusion}, "${card.lore}");`)
        }

        for (let i = 0; i < fusions.length; ++i) {
            const fusionCard = fusions[i]

            await Promise.all(
                fusionCard.fusionDeps.map((depId) =>
                    queryRunner.query(`INSERT INTO fusion_dependencies(fusion, dependency) VALUES(${fusionCard.id}, ${depId});`)
                )
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM card_type WHERE id >= ${cardsToAdd[0].id} AND id <= ${cardsToAdd[cardsToAdd.length - 1].id}`)
        await queryRunner.query(`DELETE FROM fusion_dependencies WHERE fusion >= ${cardsToAdd[0].id} AND fusion <= ${cardsToAdd[cardsToAdd.length - 1].id}`)
    }

}
