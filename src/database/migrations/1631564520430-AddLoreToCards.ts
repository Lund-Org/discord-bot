import { MigrationInterface, QueryRunner } from 'typeorm';

const updates: { id: number; lore: string }[] = [
  {
    id: 1,
    lore: `Ces fameuses madeleines étaient le petit encas phare lors de stream. Pour parodier les placements de produits de vos Youtubers favoris, je me suis amusé à lire le dos du paquet, et les fameuses madeleines de Contres dans le 41 sont devenus un running gag.`,
  },
  {
    id: 2,
    lore: `Lors du Let's Play de Fallout 4, après avoir demandé au chat un prénom, c'est le doux nom de Maurice qui est sorti. Plutot que de faire un personnage joli comme la plupart des gens, il a été décidé de faire un personnage moche. Maurice est né.`,
  },
  {
    id: 3,
    lore: `Dark Souls 3 a été le jeu suivant Fallout 4 où il y a eu une création de personnage. Un petit rituel est né, à faire un personnage moche, et qui s'appelle Maurice.`,
  },
  {
    id: 4,
    lore: `A la suite de Dark Souls 3, un nouveau Maurice est né en le créant pour Bloodborne. Après un personnage irradié et un revenant, il est devenu un chasseur de sang.`,
  },
  {
    id: 5,
    lore: `Le marathon Final Fantasy commença par le premier opus où l'on peut nommer 4 personnages. Il fallait donc forcément un personnage appelé Maurice, et c'est le voleur devenu ninja qui a eu cette chance.`,
  },
  {
    id: 6,
    lore: `Final Fantasy II permet de renommer tous les personnages comme le premier opus, mais contrairement au premier jeu, chaque personnage a une vraie personnalité. L'idiot du village (et qui sait parler aux castors) était tout désigné pour s'appeler Maurice.`,
  },
  {
    id: 7,
    lore: `Dans le 3eme Final Fantasy, c'est le personnage tout timide et chétif qui a été nommé Maurice. Il était soigneur et il a été le sauveur de l'équipe lors du combat final.`,
  },
  {
    id: 8,
    lore: `Final Fantasy VI possède un personnage sauvage et qui ne sait pas trop s'exprimer, un peu comme pour Final Fantasy II. Il était forcément parfait pour devenir un Maurice de cette longue lignée.`,
  },
  {
    id: 9,
    lore: `Final Fantasy VIII était un jeu particulier. Là où d'ordinaire c'est Zell qui aurait dû être un Maurice (vu qu'il est un peu débile), il était amusant d'appeler Linoa Mauricette, et de nommer son chien Linoa. Parce qu'on aime l'humour ici.`,
  },
  {
    id: 10,
    lore: `Le dixième opus ne permet pas de renommer ses personnages, cependant il est possible de le faire pour les invocations. A choisir parmi toutes les invocations, un poney était le plus adéquate (même s'il est beau comparé aux Maurices)`,
  },
  {
    id: 11,
    lore: `Nouveau jeu proche des premiers jeux où Maurice apparaissait, Code Vein propose un éditeur de personnage très riche, de quoi faire une immondice digne de ce nom. Avec son style manga, Maurice est devenu un vrai weeb.`,
  },
  {
    id: 12,
    lore: `Fusion de toutes ces légendes, vous aurez surement reconnu la référence à Exodia le maudit.`,
  },
  {
    id: 13,
    lore: `Lors de nos soirées Gartic Phone, on a eu le droit à un dessin de largage de croissant tactique qui nous a fait mourir de rire de par cette réalisation graphique incroyable.`,
  },
  {
    id: 14,
    lore: `Ystaroth, ce dessinateur émérite, nous a valu un éléphant de qualité, ainsi que la petite citation que vous pouvez voir sous la carte.`,
  },
  {
    id: 15,
    lore: `Dessin devenu assez régulier, il y avait une certaine facination pour la Russie et la centrale de Tchernobyl. Ne me demandez pas pourquoi.`,
  },
  {
    id: 16,
    lore: `Comme vous pouvez le voir avec les cartes sur Gartic Phone, nous avons beaucoup de talent au dessin, mais Sasha est tout particulièrement un artiste de renom. Le nouveau Monet.`,
  },
  {
    id: 17,
    lore: `C'est moi. Cet avatar est un avatar que j'ai longtemps gardé, c'est Biance de Dragon Quest, en particulier du film dispo sur Netflix (regardez le)`,
  },
  {
    id: 18,
    lore: `Ystaroth, le bro, copilote du stream, le partenaire de jeux coopératifs, une vraie machine de muscle.`,
  },
  {
    id: 19,
    lore: `Avec Vesperia, nous nous connaissons depuis ConsoleFun où nous avions une chronique où il avait dit mal prononcé le nom "The binding of Isaac". On a aussi eu un sombre délire sur Rocket League avec Barthez, comme quoi il était libéro et remontait le terrain pour marquer des buts...`,
  },
  {
    id: 20,
    lore: `Equinoxe est bien connu pour avoir le cul bordé de nouilles, et d'aimer la saga Mass Effect à part le second opus.`,
  },
  {
    id: 21,
    lore: `Dramo a la facheuse tendance à prendre parti, un peu aveuglément de temps en temps. Il est fan de Bioware (Anthem, Mass Effect) et de Xbox, et avait défendu ardemment Cyberpunk (pour aucune raison).`,
  },
  {
    id: 22,
    lore: `Ashara a disparu pendant un peu plus d'un an. Dramo avait pour résolution, la même année, de l'assassiner. On a longtemps cru qu'il était le tueur mais Ashara est revenu parmi nous.`,
  },
  {
    id: 23,
    lore: `Groudon a suivi le marathon en fervant défenseur de Final Fantasy. Il est très fan de Final Fantasy XIII et je pense que l'entiéreté de la planète est au courant.`,
  },
  {
    id: 24,
    lore: `Hirkillion est une personne peu subtile, il est un peu bourrin, et ses personnages sur Borderlands le prouve bien. Mais on l'aime bien quand même.`,
  },
  {
    id: 25,
    lore: `Khara, fut un temps, avait pour pseudo FoxyMG (pour Foxy Mélée générale). On a peut être un peu déformé son pseudo. Mais il est toxique car joueur de LoL, donc on a le droit.`,
  },
  {
    id: 26,
    lore: `A l'origine, la chaine s'appelait xPlayLivex. Une triste erreur de jeunesse. Don't judge me.`,
  },
  {
    id: 27,
    lore: `Grand fan de Badoit Rouge, c'est la boisson sponsor lors des streams. Enfin si j'avais un quelconque partenariat.`,
  },
  {
    id: 28,
    lore: `C'est l'histoire d'un personnage un peu particulier du nom de Yatsuo. Il apprenait à développer, était un peu bizarre, et il voulait devenir modo. Un jour il a demandé si on pouvait l'aider à dev un cheat pour CSGO, pour "s'amuser" et "boost les brebis égarées", ce à quoi on a répondu que non. Il l'a mal pris et s'est en nous traitant de petites putes. Après quelques recherches, il s'avère que c'était un cheater multi récidiviste LUL.`,
  },
  {
    id: 29,
    lore: `Il était une fois un ordinateur, qui a cramé. Dramo, son possesseur, a plusieurs fois parlé d'en racheter un, qu'il ferait tel ou tel jeu quand il aura un nouveau PC........ On l'attend encore`,
  },
  {
    id: 30,
    lore: `Vesperia s'ennuyait, et s'est retrouvé sur un site de conversion d'unité. En premier c'était pour convertir des devises de monnaie, mais le site proposait aussi des conversions de mesure de bois. Il est alors devenu l'expert dans ce domaine, traduisant en un éclair les stères ou les cordes de bois.`,
  },
  {
    id: 31,
    lore: `Avec Vesperia (encore), nous jouions beaucoup à Rocket League, et nous avons créé notre club pour avoir nos couleurs personnalisées. Parce que nous sommes de petits plaisantins, nous nous sommes appelés les Forces de Défense de Poudlard, pour avoir l'acronyme FDP. Dans nos délires nocturnes, on a aussi pas mal parlé de mangouste jusqu'à demander aux autres joueurs ce qu'ils pensaient de cet animal...`,
  },
  {
    id: 32,
    lore: `Jeu fait en coop avec Ysta et Vesperia, Battleborn était très sympathique. Du moins au début, parce qu'au bout d'un moment, quand les missions ne devenaient plus que des défenses de points, le jeu devenait répétitif, et nous avons habilement ironisé sur cette situation.`,
  },
  {
    id: 33,
    lore: `Dramo adore TMTP jusqu'à défendre corps et ame l'émission (comme chaque truc qu'il aime). On l'aime bien quand même malgré ses erreurs de jeunesse.`,
  },
  {
    id: 34,
    lore: `Lorsque j'étais chez ConsoleFun, j'ai eu l'occasion de tester Blackguards 1 et de jouer avec Vesperia à Monaco. Dans les 2 cas, le ragequit a été rapide parce que les jeux étaient pas fous. Mais Dronfax a apprécié Blackguard 2 et a dit que Monaco était pas si mal. Forcément, ses gouts particuliers sont devenus un running gag.`,
  },
  {
    id: 35,
    lore: `Falagar est un personnage du jeu Might And Magic VI : Le mandat Céleste. Ce très vieux jeu nous a marqué Ystaroth et moi pour sa cinématique d'intro où un vieux apparait, un des personnages dit : "Falagar !" et il répond "Suivez moi". J'ai jamais fait plus de 10% du jeu.`,
  },
  {
    id: 36,
    lore: `L'eurovision est un rendez vous annuel que je suis avec Ysta, un moment sacré. Les 2 fois où nous l'avons streamé, les 2 fois nous avons entendu des candidats en disant : "Lui/elle n'a aucune chance". C'est eux qui ont gagné.`,
  },
  {
    id: 37,
    lore: `Des fois, des streams étaient prévus avec Ystaroth. Des fois, il faisait un petit somme avant de venir en stream. Des fois, il ne se réveillait pas.`,
  },
  {
    id: 38,
    lore: `Avant l'été 2016 où j'ai vraiment commencé à streams fréquemment, j'avais déjà fait quelques streams et notamment l'entièreté du jeu Forced avec Ystaroth. Des streams dont personne n'est au courant, que personne n'a vu. Il paraitrait que des rediffs soient en privées sur Youtube...`,
  },
  {
    id: 39,
    lore: `Grand fan de comédie Française, j'adore les Tuches. Cela fait débat, mais après tout, les plus grands génies sont souvent incompris.`,
  },
  {
    id: 40,
    lore: `Running gag quand un stream se déroulait avec Equinoxe, ses chats avaient l'habitude de gratter à la porte pour vouloir sortir ou rentrer. C'est vraiment l'un de ses chats sur la carte.`,
  },
  {
    id: 41,
    lore: `Sasha est un petit blagueur, il a notamment plus d'une fois tenté des jeux de mots ou des blagues audacieuses. Parfois réussies. Parfois.`,
  },
  {
    id: 42,
    lore: `Charlie the unicorn est une série sur Youtube un peu décalée. On peut y retrouver notamment la fameuse Tchou Tchou Shoe, une chaussure train, qui a servi d'écran de chargement notamment lors des aventures dans FFXIII.`,
  },
  {
    id: 43,
    lore: `Le Sergent Pepper est arrivé sur la chaine en même temps que Charlie The Unicorn, à l'époque où on finissait les streams avec des vidéos marrantes. Si vous avez FrankerFaceZ, il est aussi possible de voir une émote à son effigie sur le stream.`,
  },
  {
    id: 44,
    lore: `L'AZZA était un concept simple qui a été réalisé 2 fois avec Equinoxe sur Paladins : Je commence avec le premier personnage dans l'ordre alphabétique, lui le dernier personnage, et nous essayons de gagner avec ce duo. Si on gagne, on avance d'un personnage, jusqu'à les avoir tous faits. C'était pas évident des fois.`,
  },
  {
    id: 45,
    lore: `Warframe Cards était un projet de fangame. Il arrivera un jour, c'est sûr.`,
  },
  {
    id: 46,
    lore: `Une vidéo résumant le lore de Warframe est un projet que j'ai et qui arrivera un jour. Il faut juste avant que je fasse un progress sur chaque quête du jeu. Mais ça arrivera un jour, c'est sûr.`,
  },
  {
    id: 47,
    lore: `Ystaroth avait streamé un peu sur ma chaine, et il avait commencé Breath of Fire 3. On a jamais eu la suite. Mais ça arrivera un jour, n'est ce pas Ysta ?`,
  },
  {
    id: 48,
    lore: `Livedeck était un projet que j'avais pour éviter de payer très cher un streamdeck mais avec les mêmes possibilités. Au final, Touch Portal est une solution qui permet déjà tout ça. Pas besoin de réinventer la roue.`,
  },
  {
    id: 49,
    lore: `L'Exploration de Steam était une émission hebdomadaire où nous testions avec Ysta un jeu Free To Play sur Steam, avec une petite note à la fin de notre part mais aussi du chat.`,
  },
  {
    id: 50,
    lore: `Flashback était un concept où je passais 1h/1h30 sur un jeu de mon enfance pour le faire découvrir et voir si la nostalgie altérait mes souvenirs. Des fois oui, des fois non.`,
  },
  {
    id: 51,
    lore: `Les choix humbles (précédemment appelés "Les mois humbles") étaient une émission où je testais une partie des jeux dispos dans le Humble Choice (précédemment appelés Humble Monthly) et où je donnais mon avis sur les jeux/sur le bundle pour voir s'il valait le coup. L'occasion de découvrir des pépites.`,
  },
  {
    id: 52,
    lore: `Randomframe était une émission où nous jouions tous les missions de Warframe avec un stuff aléatoire et des gages. Ce fut long, parfois compliqué, mais marrant.`,
  },
  {
    id: 53,
    lore: `Lors d'un stream de nouvel an, j'ai joué à Risk of Rain avec Vesperia. Si tout le long du jeu, j'étais nul et je mourrais tout le temps, c'est lors du boss de fin que Vesperia est mort et que j'ai vaincu le boss tout seul. Un grand moment de g@ming.`,
  },
  {
    id: 54,
    lore: `Lors d'un stream de Noel avec Ystaroth, on a fait un live cuisine. Mon coude a failli renverser des papillotes de jambon cru et de foie gras, mais un habile mouvement digne des plus grands gymnastes a permis d'éviter la catastrophe.`,
  },
  {
    id: 55,
    lore: `Realm Royale a été le seul BR où je me suis investi, accompagné majoritairement d'Equinoxe. On a fait de multiples top 1, mais le jeu a disparu aussi vite qu'il est apparu.`,
  },
  {
    id: 56,
    lore: `Allié choisi lors de mon aventure sur Code Vein, Louis est le bro qui m'a ressucité un bon nombre de fois au dépend de sa propre vie. Merci Louis.`,
  },
  {
    id: 57,
    lore: `Le puff puff est une référence graveleuse présente dans la plupart des jeux Dragon Quest, et les waifus que sont Jessica (DQ8) et Jade (DQ11) n'ont pas laissées indifférents certains viewers qui auraient bien aimé un puff puff de leur part.`,
  },
  {
    id: 58,
    lore: `Clustertruck est l'un des rares jeux faits avec l'intégration Twitch, où les viewers pouvaient voter pour un malus. Le plus redoutable était les lasers à l'arrière de chaque camion. Sauf que le problème, c'est que les viewers ont vite compris comment fonctionnait l'algorithme des votes, à mon grand désarroi.`,
  },
  {
    id: 59,
    lore: `Fan de RPG, j'ai un peu la sale manie de faire un maximum de quêtes. FFXV fut notamment le moment où une quête secondaire en suivait une autre, et la quête principale devenait un lointain souvenir.`,
  },
  {
    id: 60,
    lore: `ConsoleFun a été un site sur lequel j'ai oeuvré plusieurs années durant, et même si j'y ai fait de bonnes rencontres, ce n'était pas forcément une expérience très intéressante pour mon expérience de vidéaste.`,
  },
  {
    id: 61,
    lore: `Les Lund & Troyer étaient une série de petits challenges faits sur des jeux choisis chacun notre tour, condensés en petits best of et avec un compte de points d'épisode en épisode. Un contenu qui a vieilli mais qui je pense peut encore se regarder d'ailleurs !`,
  },
  {
    id: 62,
    lore: `Les best of, ces résumés de moment de coopération avec Ysta, remplis de fun et de moments de gameplay incroyables. Surement mon type de contenu préféré sur la chaine.`,
  },
  {
    id: 63,
    lore: `Votre humble serviteur, votre interlocuteur lorsque vous jouez au gacha, et votre partenaire officiel de tennis de table.`,
  },
  {
    id: 64,
    lore: `Meme dans la communauté Kingdom Hearts, cette phrase issu de KH Birth By Sleep a été reprise par Just A Pancake pour montrer la crédulité des héros de JRPG.`,
  },
  {
    id: 65,
    lore: `Ansem est un personnage un peu attiré par les ténèbres. C'est donc l'une des uniques choses qu'il sait dire dans les vidéos de Just A Pancake. Encore un meme.`,
  },
  {
    id: 66,
    lore: `Dans KH Chain of Memories, la réplique de Riku "bug". Notre fameux Just A Pancake a alors sorti cette phrase "Does not compute, does not compute, System shutdown" lorsqu'il tombe. C'était rigolo et je l'ai repris en alerte de sub quand je faisais du KH.`,
  },
  {
    id: 67,
    lore: `Une théorie tordue de la part de certains fans et qu'Equinoxe voudrait réelle est que Demyx serait le maitre des maitres. Hautement improbable, cette théorie est drole car Demyx est un comic relief qui ne sert pas à grand chose.`,
  },
  {
    id: 68,
    lore: `Xion est un de mes personnages préférés, mais qui est oubliée de tous à un moment (je ne vais pas vous spoiler). Vous comprenez mieux le nom de la carte.`,
  },
  {
    id: 69,
    lore: `Une autre de mes waifus, Aqua, qui a une vie un peu merdique mais qui pète la classe. La description de sa carte est une citation du personnage lors d'un moment incroyable qui m'a un peu mis en PLS, mais tranquille.`,
  },
  {
    id: 70,
    lore: `Dans KH 358/2 days, les personnages mangent souvent des glaces à l'eau de mer. Si d'après certains qui ont reproduits la recette c'est ok, je me dis que ça doit être immonde.`,
  },
  {
    id: 71,
    lore: `Dernière carte avec un meme issu des vidéos de Just a Pancake, c'est notre méchant préféré, Xehanort, qui dans ses vidéos dit juste "Keyblade" mais est sous titré avec des vraies phrases. Parce que c'est vrai qu'il a un léger problème avec la Keyblade.`,
  },
  {
    id: 72,
    lore: `Testuya Nomura est un créateur avec beaucoup d'imagination, peut être trop. Il est cependant l'auteur d'une licence atypique à succès qu'on m'a longtemps vendu et dans laquelle je suis tombée.`,
  },
  {
    id: 73,
    lore: `Premier épisode du Marathon, en plus d'avoir un Maurice dans l'équipe, il y avait un mage blanc. Grace à un trait d'esprit emplie d'un humour décapant, ce personnage a été appelé "Samu".`,
  },
  {
    id: 74,
    lore: `Ultima est soit disant la magie la plus puissante dans l'univers de FFII. Problème, le gameplay et une erreur dans le code du jeu fait qu'une fois acquise, cette magie est une déception de A à Z.`,
  },
  {
    id: 75,
    lore: `Final Fantasy III possède un système de job, mais le boss Garuda oblige a utilisé une certaine classe, ce qui ne me faisait pas plaisir. J'ai longtemps essayé de tuer le boss avec mon équipe originelle, mais rien à faire.`,
  },
  {
    id: 76,
    lore: `Final Fantasy IV possède plusieurs héros charismatique, cependant l'un deux est une victime doublé d'un incapable. Il finit à un moment à l'hopital, ce qui correspond bien au personnage.`,
  },
  {
    id: 77,
    lore: `L'un des ennemis les plus marquant de FFV est Gilgamesh. Tellement marquant qu'il fait des caméos dans d'autres jeux de la série. Ayant pour role de side kick rigolo, il permet d'adoucir des situations pourtant très grave dans le scénario. Ce cinquième opus a aussi été une bonne surprise tellement personne n'en parle alors que le jeu est génial.`,
  },
  {
    id: 78,
    lore: `Final Fantasy VI possède BEAUCOUP de personnages, dont certains très optionnels, si bien que je n'ai jamais récupéré Mog, Umaro et Gogo.`,
  },
  {
    id: 79,
    lore: `Final Fantasy VII Remake possède des petites différences par rapport au jeu principal, et notamment on peut apercevoir plusieurs fois dans le jeu des espèces de fantomes, qui ressemblent à des serpillères volantes.`,
  },
  {
    id: 80,
    lore: `Un boss de FF8 présent vers la fin du jeu m'a tué. Ca arrive. Quelle était la probabilité par contre qu'il me tue avec une attaque nommée Corona alors que nous étions en pleine pandémie de Coronavirus, ça c'est la bonne question.`,
  },
  {
    id: 81,
    lore: `Final Fantasy IX est mon jeu préféré, c'est un fait que j'ai assez répété, et donc tout à fait objectivement, il est le meilleur jeu du monde.`,
  },
  {
    id: 82,
    lore: `On connait dans les RPGs des boss qui reviennent plusieurs fois, ou qui ressucitent. FFX utilise un peu trop ce principe avec le méchant du jeu qui revient à la charge plusieurs fois (mais vous êtes les héros, les élus, donc vous gagnez forcément à la fin).`,
  },
  {
    id: 83,
    lore: `Final Fantasy Type-0 est un spin off sorti sur PSP, beaucoup de gens dont moi sommes passés à coté, mais mon dieu qu'il est cool. Et un des personnages, Cater, est complétement broken.`,
  },
  {
    id: 84,
    lore: `J'avais déjà fait Crisis Core : Final Fantasy VII, j'avais déjà été touché par sa fin, et le refaire n'a pas manqué. Zack est un véritable héros, un personnage incroyable, et surement l'un de mes personnages jouables préférés tout jeu confondu.`,
  },
  {
    id: 85,
    lore: `Final Fantasy XII propose un gameplay particulier qui fait qu'on l'aime ou on le déteste. Ce système automatise les actions du joueur, si bien que théoriquement, pendant les combats, on peut poser la manette.`,
  },
  {
    id: 86,
    lore: `Je ne suis pas un grand fan de la trilogie FFXIII, mais la meilleure fonctionnalité aura été celle de lancer un mog pour aller chercher des objets. C'était très drole. Désolé petit mog.`,
  },
  {
    id: 87,
    lore: `Final Fantasy XV est un jeu cross media et avec des DLCs, si bien que pour vivre l'expérience entière de cette oeuvre, il faut jouer à un jeu + faire des DLCs + regarder un film + regarder un animé. Le jeu est sponsorisé par Ikea.`,
  },
  {
    id: 88,
    lore: `Le projet de faire tous les Final Fantasy aura été une aventure d'un an et demi épuisante, mais c'est le principe d'un marathon, n'est ce pas ?`,
  },
  {
    id: 89,
    lore: `Un des tutos pour Borderlands 2 que j'ai fait, l'une des vidéos de ma chaine la plus vue, permettait de voir sous la jupe de Moxxi. Conscient du potentiel de clickbait, ça n'a pas loupé. Bande de petits vicieux.`,
  },
  {
    id: 90,
    lore: `Borderlands 2 a ajouté un système de clef en or. Au début les gens ne savaient pas où en trouver, si bien que je les partageais sur Twitter. Cela n'a pas manqué et il y a eu un petit stonks de followers.`,
  },
  {
    id: 91,
    lore: `Fan de poney, j'ai beaucoup apprécié étalon du cul, cet animal splendide. Voilà c'est tout.`,
  },
  {
    id: 92,
    lore: `Boss final de Borderlands 1, il est une honte pour ce premier opus et pour la saga. Il ne mérite pas d'exister.`,
  },
  {
    id: 93,
    lore: `Très peu de gens ont joué à Tales from the Borderlands alors que le jeu est canon. Ce jeu introduit pourtant Gortys, un petit robot tout mignon et rigolo. Coeur sur lui.`,
  },
  {
    id: 94,
    lore: `Warframe possède plusieurs dizaines de Warframe jouable, si bien qu'évidemment, chacun a sa petite Warframe préférée. Personnellement, c'est Limbo, mais les gens ne comprennent pas son gameplay et beaucoup de gens ne l'aiment pas. Allez savoir pourquoi, peut être à cause des trolls ?`,
  },
  {
    id: 95,
    lore: `Tous les 3 mois, une nouvelle Warframe Prime sort avec son armement lui aussi Prime, et donc tous les trois mois, le farm de ce contenu est organisé.`,
  },
  {
    id: 96,
    lore: `Musique d'intro de Fortuna, elle est s'y entrainante qu'elle est entrée dans les playlists de plusieurs joueurs. Un banger comme disent les jeunes.`,
  },
  {
    id: 97,
    lore: `Mordax est mon Kavat dans le jeu. Il est l'habile mélange entre Dramo et le concept de Simili de Kingdom Hearts. En effet, les Similis sont "une autre forme" des gens (pour résumer), ils sont nommés via un anagramme du nom de base avec un X à l'intérieur. Mordax, c'est l'anagramme de Dramo avec un X.`,
  },
  {
    id: 98,
    lore: `Depuis 2013, j'ai continué de jouer à Warframe, ce qui fait que j'ai quelques heures de jeux. Photo non contractuelle, les 4000 ont été dépassées.`,
  },
  {
    id: 99,
    lore: `GuideFR est mon reroll qui m'a permis de filmer les différentes quêtes du jeu quand elles n'étaient pas rejouables. Ca m'a aussi permis de revoir le jeu du point de vue d'un nouveau joueur. Si vous regardez un Progress, vous verrez donc ce compte là.`,
  },
  {
    id: 100,
    lore: `VVhiteAngel est un Youtuber/Streamer français sur Warframe. Il est le plus connu en France. Problème : Je n'aime pas son contenu parce qu'il prend 40 minutes à expliquer des choses qu'on peut résumer en 10min. C'est donc devenu un peu un running gag. Sa photo est d'ailleurs un avatar qu'il a sur un forum de création d'entreprise pour femme ou un truc dans le genre. Voilà.`,
  },
];

export class AddLoreToCards1631564520430 implements MigrationInterface {
  name = 'AddLoreToCards1631564520430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `card_type` ADD `lore` text NOT NULL');
    for (const index in updates) {
      await queryRunner.query(
        `UPDATE card_type SET lore="${updates[index].lore.replace(
          /"/g,
          '\\"',
        )}" WHERE id=${updates[index].id}`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `card_type` DROP COLUMN `lore`');
  }
}
