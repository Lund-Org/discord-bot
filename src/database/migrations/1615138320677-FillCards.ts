import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillCards1615138320677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(1, "Madeleines", "Madeleines de Contres dans le 41", 2, "/madeleines.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(2, "Maurice, l'irradié", "Le Maurice originel", 3, "/maurice-fallout.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(3, "Maurice, le revenant", "Rien n'est difficile pour Maurice", 1, "/maurice-souls.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(4, "Maurice, le sanguinaire", "C'est le sang", 1, "/maurice-born.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(5, "Maurice, le ninja", "Un voleur reconverti", 1, "/maurice-ff1.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(6, "Maurice, l'idiot bête", "L'ami des castors", 1, "/maurice-ff2.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(7, "Maurice, le sauveur", "Ses soins ont sauvé le monde des ténèbres", 2, "/maurice-ff3.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(8, "Maurice, le sauvage", "I'm Gau ! I your friend...FRIEND !", 1, "/maurice-ff6.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(9, "Mauricette", "ça aurait pu être un chien", 1, "/maurice-ff8.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(10, "Maurice, le poney", "La foudre incarnée", 1, "/maurice-ff10.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(11, "Maurice, le weaboo", "Il a plus de queues que Naruto", 2, "/maurice-code-vein.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(12, "Exodia le Maurice", "La plus grande beauté de l'univers", 3, "/maurice-exodia.jpg", true);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(13, "Largage de croiss'", "Un meilleur largage tactique que dans n'importe quel COD", 1, "/gartic-croissant.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(14, "L'éléphant d'Ystaroth", ${'"Tout le monde a reconnu l\'éléphant donc mon dessin est valide quand même !"'}, 1, "/gartic-elephant.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(15, "La centrale de Tchernobyl", "C'est pas en Russie bordel !", 1, "/gartic-tchernobyl.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(16, "Le talent de Sashalex", ${'"Un éminent artiste du mouvement de la souris pour sure"'}, 1, "/sasha-talent.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(17, "Lund, le warlord", "Le maître de ces lieux", 4, "/lund.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(18, "Ystaroth, le copilote", "Ringfiteur de l'extreme", 4, "/ystaroth.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(19, "Vesperia, le libéro", "Ze binedigue of Isaac", 3, "/vesperia.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(20, "Equinoxe, le chateux", ${'"Mass Effect 2 c\'est de la merde"'}, 3, "/equinoxe.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(21, "Dramo, le lobbyiste", "ANTHEM, BIOWARE, XBOX, CYBERPUNK", 3, "/dramo.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(22, "Ashara, le disparu", "On pense que Dramo l'a assassiné", 1, "/ashara.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(23, "Groudon, le fanboy", "Fan invétéré de FFXIII", 1, "/groudon.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(24, "Hirkillion, le bourrin", "Aussi subtil qu'une masse", 2, "/hirkillion.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(25, "Khara, le toxique", "Aussi appelé Foxy mini gamer", 1, "/khara.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(26, "xPlayLivex", "LundProd, les origines", 1, "/xplaylivex.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(27, "La badoit rouge de Lund", "L'eau des véritables bulles-dozers", 1, "/lund-badoit.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(28, "Bande de petite pute", "Vous pouvez m'aider pour un hack CSGO ?", 1, "/petite-pute.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(29, "Le faux espoir de Dramo", "Il aura un nouveau PC un jour... un jour", 2, "/dramo-pc.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(30, "Les stères de bois de Vesperia", "Saviez vous que 4 stères équivalent à 1 corde ?", 1, "/vesperia-stere.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(31, "Les FDP", "Les forces de défense de Poudlard. On raconte qu'une mangouste est à leur tête", 1, "/fdp.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(32, "La défense, c'est ma passion", "La meilleure des défenses, c'est la défense", 1, "/battleborn.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(33, "Le programme télé de Dramo", "Salut mes petites chéries", 1, "/dramo-hanouna.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(34, "Monaco & Blackguard", "Tout le monde les déteste, sauf Dronfax", 1, "/monaco-blackguard.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(35, "Falagar", ${'"Suivez moi"'}, 1, "/falagar.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(36, "L'eurovision", "Toujours présent, toujours déçu", 1, "/eurovision.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(37, "Le sommeil d'Ysta", "S'endort pour les streams, même ceux qu'il doit faire", 1, "/ystaroth-sleeper.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(38, "Les streams avant 2016", "Les streams que vous n'avez jamais vu", 1, "/old-live.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(39, "Jeff Tuches", "Une carte, ok, mais pas 15 ?!", 1, "/jeff-tuche.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(40, "Ouvrez moi !", "Meow Meow", 1,"/equinoxe-chats.jpg" , false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(41, "Il est taquin !", "Sasha a les bases de l'humour, on espère qu'il aura celles du français un jour", 1, "/sasha-humour.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(42, "Le tchou tchou shoe", "Chaga Chaga Chaga, Chaga Chaga Chaga, Tchou tchou !", 2, "/choo-choo-shoe.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(43, "Sergent Pepper", "This is the law", 1, "/sergent-pepper.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(44, "AZZA Paladins", "2 saisons de try-hard", 2, "/azza.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(45, "Warframe Cards", "Promis, ça viendra un jour", 1, "/warframe-cards.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(46, "La vidéo lore Warframe", "Promis, ça viendra un jour", 1, "/lore-warframe.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(47, "La suite de Breath of Fire 3", "Promis, ça viendra un jour, hein Ysta ?", 1, "/ystaroth-bof.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(48, "Livedeck", "Il fut un temps où l'idée était bonne", 1, "/touch-portal.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(49, "Exploration de steam", "Gaben a fait pression pour qu'on arrête", 2, "/exploration-steam.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(50, "Flashback", "L'histoire d'une autre époque", 2, "/flashback.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(51, "Les choix humble", "Vous n'aurez plus de jeux offerts", 2, "/humble-choice.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(52, "Randomframe", "Parce qu'il n'y a pas assez d'aléatoire dans Warframe", 2, "/randomframe.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(53, "Nouvel an sous la pluie", "Commencé en coop, terminé en solo", 1, "/risk-of-rain.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(54, "Rattrapage in-extremis", "Le coude dans le foie gras et le jambon", 1, "/nouvel-an.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(55, "Top 1 sur Realm Royale", "Il est mort trop jeune", 1, "/realm-royale.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(56, "Le fuckboy", "Louis, le gars sûr", 2, "/louis-code-vein.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(57, "Puff Puff", "Jessica et Jade peuvent le faire. Les gluants aussi", 1, "/puff-puff.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(58, "L'exploit' des lasers", "Quand le chat veut ta mort", 1, "/clustertruck.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(59, "Encore une quête", "Une petite quête secondaire et après on fait la quête principale, promis", 2, "/quete-annexe.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(60, "ConsoleFun", "C'était pas si fun", 1, "/console-fun.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(61, "Les Lund & Troyer", "Y'en a un qui est plus drole que l'autre", 1, "/lund-troyer.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(62, "Les best-of Lund & Ysta", "Le duo préféré des Français", 3, "/best-of.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(63, "MauriceBot", "Il a plus de chance de planter que de mettre la balle dans le filet", 3, "/maurice-bot.jpg", true);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(64, "Ok I believe you", "Parce les héros de RPG sont crédules", 2, "/kh-believe.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(65, "Darkness", "Darkness, darkness, darkness", 1, "/kh-darkness.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(66, "Does not compute", "System shutdown", 1, "/kh-compute.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(67, "Demyx le gros cerveau", "Il tirait les ficelles depuis le début", 1, "/kh-mom-demyx.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(68, "C'est qui cette waifu ?", "Oubliée de tous", 2, "/kh-xion.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(69, "La meilleure waifu", "Mickey... you're too late", 2, "/kh-aqua.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(70, "Les glaces à l'eau de mer", "En vrai ça doit etre immonde", 1, "/kh-glace.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(71, "KEYBLADE", "KEYBLADE KEYBLADE KEYBLADE", 1, "/kh-keyblade-xehanort.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(72, "Une histoire compliquée", "Des mondes de lumière, de ténèbres, des voyages dans le temps...", 2, "/kh-nomura.jpg", true);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(73, "FFI - Samu le mage blanc", "Faut pas demander son 06, mais son 15", 2, "/ff1-samu.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(74, "FFII - La magie ultime", "Ultima, le pire sort du jeu vendu comme le plus puissant", 1, "/ff2-ultima.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(75, "FFIII - Garuda, le pire boss", "Obligé de jouer chevalier noir, ça dégoute", 1, "/ff3-garuda.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(76, "FFIV - Edward l'infirme", "Toujours à l'hosto, jamais utile", 3, "/ff4-edward.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(77, "FFV - La bonne surprise", "Gilgamesh le side kick rigolo", 3, "/ff5-gilgamesh.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(78, "FFVI - Inconnus au bataillon", "Des compagnons optionnels qui n'ont jamais eu la chance d'être récupérés", 2, "/ff6-mog-gogo-omaru.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(79, "FFVII - Les serpillères volantes", "Elles servent à dépoussiérer le jeu original", 4, "/ff7-whispers.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(80, "FFVIII - Le corona", "Le corona m'a tué", 1, "/ff8-corona.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(81, "FFIX - Le meilleur jeu du monde", "C'est 100% objectif", 4, "/ff9-best-game.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(82, "FFX - Le mec mort intuable", "Alors qu'il y en avait des opportunités", 2, "/ff10-seymour.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(83, "FFT0 - La 2eme bonne surprise", "Cater, top tier", 2, "/fft0-cater.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(84, "FFVIICC - Zack, le héros", "C'est pas des larmes, c'est la pluie", 3, "/ff7cc-zack.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(85, "FFXII - Le système de gambit", "C'est encore mieux quand on ne fait rien", 4, "/ff12-manette.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(86, "FFXIII - Le lancer de mog", "Ça vole bien ces merdes", 2, "/ff13-mog.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(87, "FFXV - Le jeu en kit", "Un film, un animé, un jeu, 5 DLCs", 3, "/ff15-kit.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(88, "Le marathon", "1 an et demi, c'est long", 4, "/ff-marathon.jpg", true);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(89, "La culotte de Moxi", "Le seul clickbait de la chaine", 1, "/borderlands-moxi.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(90, "Le buzz", "Likez pour des clefs en or", 2, "/borderlands-golden-key.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(91, "Etalon du cul", "Le plus beau de tous les poneys", 1, "/borderlands-etalon-du-cul.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(92, "Le destructeur", "C'est honteux", 1, "/borderlands-destructor.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(93, "Le mal aimé", "Avec Gortys, le plus rigolo des robots", 1, "/borderlands-gortys.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(94, "La meilleure Warframe", "Eternel incompris, 100% objectif", 3, "/warframe-limbo.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(95, "Farm du Prime Access", "Le rendez vous trimestriel", 1, "/warframe-prime-access.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(96, "We all lift together", "And we're all adrift together, togetheeeeer", 2, "/warframe-fortuna.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(97, "Mordax", "L'incarnation féline du simili de Dramo", 2, "/warframe-mordax.jpg", true);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(98, "On ne les compte plus", "Ca va, c'est pas tant que ça", 1, "/warframe-time.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(99, "GuideFR", "Le caméraman des Progress", 1, "/warframe-guidefr.jpg", false);`,
    );
    await queryRunner.query(
      `INSERT INTO card_type(id, name, description, level, imageName, isFusion) VALUES(100, "Le nemesis", "Slowrunner dans l'ame", 1, "/warframe-whiteangel.jpg", false);`,
    );

    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 2);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 3);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 4);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 5);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 6);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 7);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 8);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 9);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 10);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(12, 11);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(63, 2);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(63, 39);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 65);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 66);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 67);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 68);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 69);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 70);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(72, 71);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 73);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 74);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 75);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 76);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 77);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 78);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 79);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 80);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 81);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 82);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 83);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 84);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 85);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 86);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(88, 87);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(97, 21);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(97, 40);`,
    );
    await queryRunner.query(
      `INSERT INTO fusion_dependencies(fusion, dependency) VALUES(97, 68);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM card_type WHERE id >= 1 AND id <= 100',
    );
    await queryRunner.query(
      'DELETE FROM fusion_dependencies WHERE fusion >= 1 AND fusion <= 100',
    );
  }
}
