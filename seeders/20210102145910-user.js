"use strict";
const db = require("../models");
const userModel = db.user;
const contractorModel = db.contractor;
const backendUserModel = db.backend_user;
const propertyOwnerModel = db.property_owner;

const usersData = [{
        user_type: "contractor",
        email: "admin@gmail.com",
        user_data: {
            first_name: null,
            last_name: null
        }
    },
    {
        user_type: "property_owner",
        email: "darjidipal31@gmail.com",
        user_data: {
            first_name: "Dipal",
            last_name: "Vekariya"
        }
    },
    {
        user_type: "backend_user",
        email: "jk.deep@gmail.com",
        user_data: {
            first_name: "Jaydeep",
            last_name: "kathrotiya"
        }
    }
];

async function insertOrUpdate(item) {
    if (item.user_data.first_name != null && item.user_data.last_name != null) {
        item.name = (item.user_data.first_name.concat(' ', item.user_data.last_name)).trim();
    }

    const [userObj] = await userModel.findOrCreate({
        where: {
            email: item.email
        },
        defaults: { user_type: item.user_type, name: item.name }
    });

    if (userObj.user_type === 'contractor') {
        await contractorModel.findOrCreate({
            where: {
                user_id: userObj.id
            },
            defaults: { first_name: item.user_data.first_name, last_name: item.user_data.last_name, mobile: item.user_data.mobile }
        });
    } else if (userObj.user_type === 'backend_user') {
        await backendUserModel.findOrCreate({
            where: {
                user_id: userObj.id
            },
            defaults: { first_name: item.user_data.first_name, last_name: item.user_data.last_name }
        });
    } else if (userObj.user_type === 'property_owner') {
        await propertyOwnerModel.findOrCreate({
            where: {
                user_id: userObj.id
            },
            defaults: { first_name: item.user_data.first_name, last_name: item.user_data.last_name, mobile: item.user_data.mobile }
        });
    }
}
module.exports = {
    up: async(queryInterface, Sequelize) => {
        for (const item of usersData) {
            await insertOrUpdate(item);
        }
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Contractors", null, {});
        await queryInterface.bulkDelete("PropertyOwners", null, {});
        await queryInterface.bulkDelete("Backend_Users", null, {});
        return await queryInterface.bulkDelete("Users", null, {});
    }
};