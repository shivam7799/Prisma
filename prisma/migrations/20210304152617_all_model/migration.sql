-- CreateTable
CREATE TABLE `AreaOfWorks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_proposal_id` INTEGER NOT NULL,
    `unit_location_id` INTEGER NOT NULL,
    `new_unit` VARCHAR(255),
    `existing_unit` VARCHAR(255),
    `unit_alias` VARCHAR(255),
    `work_type` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `project_proposal_id`(`project_proposal_id`),
INDEX `unit_location_id`(`unit_location_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER,
    `name` VARCHAR(255),
    `slug` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `Attributes.slug_unique`(`slug`),
INDEX `parent_id`(`parent_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributeUnits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute_parent_id` INTEGER,
    `unit_name` VARCHAR(255),
    `slug` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `AttributeUnits.slug_unique`(`slug`),
INDEX `attribute_parent_id`(`attribute_parent_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Backend_Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `user_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `state_id_name`(`state_id`, `name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contractors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `mobile` VARCHAR(255),
    `company_name` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `user_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_name` VARCHAR(255) NOT NULL,
    `country_code` CHAR(2) NOT NULL,
    `iso3` CHAR(3),
    `phone_code` VARCHAR(5),
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `Countries.country_code_unique`(`country_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAttributeUnits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `product_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,
    `attribute_unit_id` INTEGER NOT NULL,
    `html_element_type` VARCHAR(255),
    `display_order` INTEGER DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `attribute_id`(`attribute_id`),
INDEX `attribute_unit_id`(`attribute_unit_id`),
INDEX `product_id`(`product_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductAttributeUnitValues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(255),
    `slug` VARCHAR(255),
    `product_attribute_unit_id` INTEGER NOT NULL,
    `custom` BOOLEAN NOT NULL DEFAULT false,
    `custom_html_element_type` VARCHAR(255),
    `is_default` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `product_attribute_unit_id_slug`(`product_attribute_unit_id`, `slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `slug` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `ProductCategories.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductPropertyUnits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_unit_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `product_property_unit_slug`(`product_id`, `property_unit_id`),
INDEX `property_unit_id`(`property_unit_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER,
    `name` VARCHAR(255),
    `slug` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `Products.slug_unique`(`slug`),
INDEX `parent_id`(`parent_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectProposals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `project_id` INTEGER NOT NULL,
    `proposal_status` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `project_id`(`project_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `property_address_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
    `start_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
INDEX `property_address_id`(`property_address_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTypeAssociations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `project_type_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `project_id`(`project_id`),
INDEX `project_type_id`(`project_type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `ProjectTypes.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyLevels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `PropertyLevels.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyOwners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `mobile` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `user_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertySubTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_type_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `PropertySubTypes.slug_unique`(`slug`),
INDEX `property_type_id`(`property_type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyUnitAttributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_unit_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,
    `attribute_unit_id` INTEGER NOT NULL,
    `html_element_type` VARCHAR(255),
    `display_order` INTEGER DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `attribute_id`(`attribute_id`),
INDEX `attribute_unit_id`(`attribute_unit_id`),
INDEX `property_unit_id`(`property_unit_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyUnitProductCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_unit_id` INTEGER NOT NULL,
    `product_category_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `product_category_id`(`product_category_id`),
INDEX `property_unit_id`(`property_unit_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyUnitProductCategoryProducts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_unit_product_category_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `display_order` INTEGER DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `product_id`(`product_id`),
INDEX `property_unit_product_category_id`(`property_unit_product_category_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyUnits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `slug` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `PropertyUnits.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property_Addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255),
    `property_owner_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `property_sub_type_id` INTEGER NOT NULL,
    `postal_code` VARCHAR(255),
    `construction_type` VARCHAR(255),
    `withBasement` BOOLEAN NOT NULL DEFAULT false,
    `storyId` INTEGER,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `city_id`(`city_id`),
INDEX `property_owner_id`(`property_owner_id`),
INDEX `property_sub_type_id`(`property_sub_type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property_Types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `Property_Types.slug_unique`(`slug`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScopeOfWorkPropertyUnits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_proposal_id` INTEGER NOT NULL,
    `area_of_work_id` INTEGER NOT NULL,
    `property_unit_attribute_id` INTEGER NOT NULL,
    `value` VARCHAR(255),
    `attribute_custom_name` VARCHAR(255),
    `attribute_custom_value` VARCHAR(255),
    `attribute_custom_unit` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `area_of_work_id`(`area_of_work_id`),
INDEX `project_proposal_id`(`project_proposal_id`),
INDEX `property_unit_attribute_id`(`property_unit_attribute_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScopeOfWorks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_proposal_id` INTEGER NOT NULL,
    `area_of_work_id` INTEGER NOT NULL,
    `product_attribute_unit_id` INTEGER NOT NULL,
    `product_attribute_unit_value_id` INTEGER NOT NULL,
    `attribute_custom_name` VARCHAR(255),
    `attribute_custom_value` VARCHAR(255),
    `attribute_custom_unit` VARCHAR(255),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
INDEX `area_of_work_id`(`area_of_work_id`),
INDEX `product_attribute_unit_id`(`product_attribute_unit_id`),
INDEX `product_attribute_unit_value_id`(`product_attribute_unit_value_id`),
INDEX `project_proposal_id`(`project_proposal_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SequelizeMeta` (
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `States` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `name` VARCHAR(255),
    `state_code` VARCHAR(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `country_id_state_code`(`country_id`, `state_code`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnitLocations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_name` VARCHAR(255),
    `property_sub_type_id` INTEGER NOT NULL,
    `property_level_id` INTEGER NOT NULL,
    `property_unit_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
UNIQUE INDEX `product_property_unit_slug`(`property_level_id`, `property_unit_id`, `property_sub_type_id`),
INDEX `property_sub_type_id`(`property_sub_type_id`),
INDEX `property_unit_id`(`property_unit_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_type` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER DEFAULT 1,
    `updated_by` INTEGER DEFAULT 1,
    `username` VARCHAR(255),
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AreaOfWorks` ADD FOREIGN KEY (`project_proposal_id`) REFERENCES `ProjectProposals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AreaOfWorks` ADD FOREIGN KEY (`unit_location_id`) REFERENCES `UnitLocations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attributes` ADD FOREIGN KEY (`parent_id`) REFERENCES `Attributes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributeUnits` ADD FOREIGN KEY (`attribute_parent_id`) REFERENCES `Attributes`(`parent_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Backend_Users` ADD FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cities` ADD FOREIGN KEY (`state_id`) REFERENCES `States`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contractors` ADD FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeUnits` ADD FOREIGN KEY (`attribute_id`) REFERENCES `Attributes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeUnits` ADD FOREIGN KEY (`attribute_unit_id`) REFERENCES `AttributeUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeUnits` ADD FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeUnitValues` ADD FOREIGN KEY (`product_attribute_unit_id`) REFERENCES `ProductAttributeUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPropertyUnits` ADD FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductPropertyUnits` ADD FOREIGN KEY (`property_unit_id`) REFERENCES `PropertyUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD FOREIGN KEY (`parent_id`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectProposals` ADD FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD FOREIGN KEY (`property_address_id`) REFERENCES `Property_Addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTypeAssociations` ADD FOREIGN KEY (`project_id`) REFERENCES `Projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTypeAssociations` ADD FOREIGN KEY (`project_type_id`) REFERENCES `ProjectTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyOwners` ADD FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertySubTypes` ADD FOREIGN KEY (`property_type_id`) REFERENCES `Property_Types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitAttributes` ADD FOREIGN KEY (`attribute_id`) REFERENCES `Attributes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitAttributes` ADD FOREIGN KEY (`attribute_unit_id`) REFERENCES `AttributeUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitAttributes` ADD FOREIGN KEY (`property_unit_id`) REFERENCES `PropertyUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitProductCategories` ADD FOREIGN KEY (`product_category_id`) REFERENCES `ProductCategories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitProductCategories` ADD FOREIGN KEY (`property_unit_id`) REFERENCES `PropertyUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitProductCategoryProducts` ADD FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertyUnitProductCategoryProducts` ADD FOREIGN KEY (`property_unit_product_category_id`) REFERENCES `PropertyUnitProductCategories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property_Addresses` ADD FOREIGN KEY (`city_id`) REFERENCES `Cities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property_Addresses` ADD FOREIGN KEY (`property_owner_id`) REFERENCES `PropertyOwners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property_Addresses` ADD FOREIGN KEY (`property_sub_type_id`) REFERENCES `PropertySubTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorkPropertyUnits` ADD FOREIGN KEY (`area_of_work_id`) REFERENCES `AreaOfWorks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorkPropertyUnits` ADD FOREIGN KEY (`project_proposal_id`) REFERENCES `ProjectProposals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorkPropertyUnits` ADD FOREIGN KEY (`property_unit_attribute_id`) REFERENCES `PropertyUnitAttributes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorks` ADD FOREIGN KEY (`area_of_work_id`) REFERENCES `AreaOfWorks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorks` ADD FOREIGN KEY (`product_attribute_unit_id`) REFERENCES `ProductAttributeUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorks` ADD FOREIGN KEY (`product_attribute_unit_value_id`) REFERENCES `ProductAttributeUnitValues`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScopeOfWorks` ADD FOREIGN KEY (`project_proposal_id`) REFERENCES `ProjectProposals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `States` ADD FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitLocations` ADD FOREIGN KEY (`property_level_id`) REFERENCES `PropertyLevels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitLocations` ADD FOREIGN KEY (`property_sub_type_id`) REFERENCES `PropertySubTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnitLocations` ADD FOREIGN KEY (`property_unit_id`) REFERENCES `PropertyUnits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
