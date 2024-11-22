-- CreateTable
CREATE TABLE `LandingPageData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `starterSentence` VARCHAR(191) NOT NULL,
    `secondStarterSentence` VARCHAR(191) NOT NULL,
    `plansParagraph` VARCHAR(191) NOT NULL,
    `adsOnImageBoldText` VARCHAR(191) NOT NULL,
    `adsOnImageDescription` VARCHAR(191) NOT NULL,
    `emailContact` VARCHAR(191) NULL,
    `twitterContact` VARCHAR(191) NULL,
    `facebookContact` VARCHAR(191) NULL,
    `instigramContact` VARCHAR(191) NULL,
    `whatsappContact` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
